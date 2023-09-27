const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "costs",
});

// Rota para buscar a categoria dos projetos
app.get("/categoria", (req, res) => {
  const sql = `SELECT id, categoria FROM categoria`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar dados no server", err);
    } else {
      const data = result.map((row) => ({
        id: row.id,
        name: row.categoria,
      }));
      res.send(data);
    }
  });
});

// Rota para enviar os dados para a tabela projetos
app.post("/register", (req, res) => {
  const { nome, orcamento, id_categoria } = req.body;
  const sql =
    "INSERT INTO projetos (nome, orcamento, id_categoria) VALUES (?, ?, ?)";
  const values = [nome, orcamento, id_categoria];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao enviar dados no server", err);
      res.status(500).send("Erro ao adicionar pruduto");
    } else {
      res.send("Projeto enivado com sucesso!");
    }
  });
});

// Rota para pegar os dados da tabela projetos
app.get("/projetos", (req, res) => {
  const sql = `SELECT p.*, categoria AS nome_categoria
  FROM projetos p
  JOIN categoria c ON p.id_categoria = c.id
  ORDER BY id ASC;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar dados", err);
      res.status(500).send("Erro ao buscar dados");
    } else {
      const data = result.map((row) => ({
        id: row.id,
        name: row.nome,
        orcamento: row.orcamento,
        categoria: {
          id: row.categoria,
          name: row.nome_categoria,
        },
      }));
      res.send(data);
    }
  });
});

//Rota para pegar os serviços
app.get("/servicos/:id", (req, res) => {
  const id = req.params.id; // Captura o ID da URL

  const sql = `
    SELECT * FROM servicos
    WHERE id_projeto = ?;`; // Adiciona uma cláusula WHERE para filtrar por id_projeto

  db.query(sql, [id], (err, result) => {
    // Passa o ID como parâmetro para a consulta
    if (err) {
      console.error("Erro ao buscar dados", err);
      res.status(500).send("Erro ao buscar dados");
    } else {
      const data = result.map((row) => ({
        id: row.id,
        custo: row.custo,
        descricao: row.descricao,
        id_projeto: row.id_projeto,
      }));
      res.send(data);
    }
  });
});

// Rota para buscar as infos do projeto
app.get("/projeto/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
  SELECT
    p.id,
    p.nome AS projeto,
    p.orcamento,
    c.categoria AS categoria,
    COALESCE(total_utilizado, 0) AS total_utilizado,
    (p.orcamento - COALESCE(total_utilizado, 0)) AS disponivel
    FROM
    projetos p
  INNER JOIN
    categoria c ON p.id_categoria = c.id
  LEFT JOIN
    (
        SELECT id_projeto, SUM(custo) AS total_utilizado
        FROM servicos
        GROUP BY id_projeto
    ) s ON p.id = s.id_projeto
  WHERE
    p.id = ?;`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar dados do projeto", err);
      res.status(500).send("Erro ao buscar dados do projeto");
    } else {
      if (result.length === 0) {
        res.status(404).send("Projeto não encontrado");
      } else {
        res.send(result[0]); // Retorna o primeiro resultado encontrado
      }
    }
  });
});

//Rota para enviar dados para a tabela serviços
app.post("/sendService", (req, res) => {
  const { custo, descricao, id_projeto } = req.body;
  const sql =
    "INSERT INTO servicos (custo, descricao, id_projeto) VALUES (?, ?, ?)";
  const values = [custo, descricao, id_projeto];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao enviar dados no server", err);
      res.status(500).send("Erro ao adicionar pruduto");
    } else {
      res.send("Projeto enivado com sucesso!");
    }
  });
});


// Rota para deletar um projeto
app.delete("/projeto/:id", (req, res) => {
  const id = req.params.id;

  const deleteProjectSQL = "DELETE FROM projetos WHERE id = ?";
  const deleteServicesSQL = "DELETE FROM servicos WHERE id_projeto = ?";

  db.query(deleteServicesSQL, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir serviços:", err);
      res.status(500).send("Erro ao excluir serviços relacionados");
    } else {
      // Agora que os serviços foram excluídos, exclua o projeto
      db.query(deleteProjectSQL, [id], (err, result) => {
        if (err) {
          console.error("Erro ao excluir projeto:", err);
          res.status(500).send("Erro ao excluir projeto");
        } else {
          res.send("Projeto e serviços relacionados excluídos com sucesso");
        }
      });
    }
  });
});


app.listen(port, () => {
});
