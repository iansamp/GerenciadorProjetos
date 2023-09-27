import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Project() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/projetos`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => console.error("Erro ao buscar dados", error));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>PROJETOS</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      <Container>
        {project &&
          project.map((project) => (
            <ProjectCard
              id={project.id}
              orcamento={project.orcamento}
              name={project.name}
              categoria={project.categoria}
              key={project.id}
            />
          ))}
      </Container>
    </div>
  );
}
