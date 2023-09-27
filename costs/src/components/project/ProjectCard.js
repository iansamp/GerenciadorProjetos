import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import Axios from "axios";

export default function ProjectCard({ id, name, orcamento, categoria }) {
  const handleDeleteProject = () => {
    if (window.confirm("Tem certeza de que deseja excluir este projeto?")) {
      Axios.delete(`http://localhost:3001/projeto/${id}`)
        .then((res) => {
          alert("Projeto e serviços relacionados excluídos com sucesso");
          window.location.reload(); 
        })
        .catch((err) => {
          console.error("Erro ao excluir projeto:", err);
        });
    }
  };
  

  return (
    <div className={styles.project_card}>
      <h2>{name}</h2>
      <p>
        <span>Orçamento:</span> R${orcamento}
      </p>
      <p>
        <span>{categoria.name}</span>
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={handleDeleteProject}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}
