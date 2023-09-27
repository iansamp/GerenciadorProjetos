import { useEffect, useState } from "react";
import styles from "./ProjectForm.module.css";
import Axios from "axios";

export default function ProjectForm() {
  const [values, setValues] = useState({});
  const [categories, setCategories] = useState();
  const [estado] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleSubmit = () => {
    if ( !values.orcamento || !values.nome || !values.id_categoria) {
      return;
    }

    Axios.post("http://localhost:3001/register", values)
      .then((res) => {})
      .catch((err) => {
        console.error("Erro ao enviar os dados", err);
      });
  };

  // Buscar categoria do DB
  useEffect(() => {
    if (!categories) {
      Axios.get("http://localhost:3001/categoria")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => console.error("Erro ao buscar dados", error));
    }
  }, [categories]);

  return (
    <form className={styles.form}>
      <div className={styles.form_control}>
        <label>Nome do projeto:</label>
        <input
          name="nome"
          type="text"
          placeholder="Insira o nome do projeto"
          required
          onChange={handleChangeValues}
        />

        <label>Orçamento do projeto:</label>
        <input
          name="orcamento"
          type="number"
          placeholder="Insira o nome do projeto"
          required
          onChange={handleChangeValues}
        />

        <label>Selecione uma categoria:</label>
        <select
          name="id_categoria"
          value={estado}
          onChange={handleChangeValues}
        >
          <option>Selecione uma categoria</option>
          {categories &&
            categories.map((option) => (
              <option value={option.id} key={option.name}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <button className={styles.btn} onClick={() => handleSubmit()}>
        Enviar
      </button>
    </form>
  );
}
