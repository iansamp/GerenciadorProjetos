import styles from "./Project.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import Axios from "axios";

export default function Project() {
  const [service, setService] = useState([]);
  const [project, setProject] = useState({});
  const [values, setValues] = useState({});
  const { id } = useParams();
  const disponivel = project.disponivel;


  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!values.custo || !values.descricao) {
      return;
    }

  const custo = parseFloat(values.custo)
  if(custo > disponivel){
    alert("O custo não pode ser maior do que o valor disponível.");
    return;
  }else{
    alert("Serviço enviado com sucesso!")
  }
  
    values.id_projeto = id;
  
    Axios.post("http://localhost:3001/sendService", values)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error("Erro ao enviar os dados", err);
      });
  };
  

  useEffect(() => {
    Axios.get(`http://localhost:3001/servicos/${id}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do serviço:", error)
      );

    Axios.get(`http://localhost:3001/projeto/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do projeto:", error)
      );
  }, [id]);

  return (
    <>
      <div className={styles.project_details}>
        <Container customClass="column">
          {project && (
            <div className={styles.details_container}>
              <h1>Projeto: {project.projeto}</h1>
              <p>{project.categoria}</p>
              <p>Orçamento: ${project.orcamento}</p>
              <p>Total utilizado: ${project.total_utilizado}</p>
              <p>Disponível: ${project.disponivel}</p>
            </div>
          )}
          <div className={styles.service_form_container}>
            <h2>Adicione um serviço:</h2>
            <div className={styles.form_control}>
              <label>Custo:</label>
              <input
                name="custo"
                type="number"
                placeholder="Insira o valor do serviço"
                onChange={handleChangeValues}
              />

              <label>Descrição:</label>
              <input
                name="descricao"
                type="text"
                placeholder="Insira a descrição do serviço"
                onChange={handleChangeValues}
              />

              <input
                type="hidden"
                name="id_projeto"
                value={id}

                onChange={handleChangeValues}
              />

              <button className={styles.btn} onClick={() => handleSubmit()}>
                Enviar
              </button>
            </div>
          </div>
          <h2>Serviços:</h2>
          {service &&
            service.map((service) => (
              <div className={styles.service_container}>
                <h3>{service.descricao}</h3>
                <p>Custo: ${service.custo}</p>
              </div>
            ))}
          <Container customClass="start"></Container>
        </Container>
      </div>
    </>
  );
}
