import React, { useEffect, useState, useContext, ReactText } from "react";
import { toast } from "react-toastify";
import * as dateFns from "date-fns";

import { UserStorage } from "../../../../components/userStorage";

import api from "../../../../services/api";

import "./style.css";

const ModalRegistrarAtividade = (props: any) => {
  const [descricao, setDescricao] = useState<string>("");
  const [idAluno, setIdAluno] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const user = useContext(UserStorage);

  const toastId = React.useRef<ReactText>();

  useEffect(() => {
    api.post("/users/getUsers", { type: 2 }).then((response: any) => {
      setUsers(response.data.success);
    });
  }, []);

  const cadastrar = () => {
    setLoading(true);
    toast.dismiss(toastId.current || undefined);

    api
      .post(
        "/schedule/newSchedule",
        {
          date: props.date,
          description: descricao,
          studentId: idAluno,
          coordinatorId: user.idUser,
        },
        { headers: user.headers }
      )
      .then((response: any) => {
        toastId.current = toast.success(response.data.success);
        props.setIsOpen(false);
      })
      .catch((error: any) => {
        toastId.current = toast.error(error.response.data.error);
        setLoading(false);
      });
  };

  return (
    <>
      <span className="headerRegistrar">
        <h4>Registrar Atividade</h4>
      </span>
      <form
        name="form"
        className="formRegistrarAtividade"
        method="post"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
      >
        <b>Data da atividade</b>: {dateFns.format(props.date, "dd/MM/yyyy")}
        <br />
        <br />
        <select name="alunos" onChange={(e) => setIdAluno(e.target.value)}>
          <option value="">Selecione um aluno</option>
          {users.map((us: any) => (
            <option value={us.id}>{us.name}</option>
          ))}
        </select>
        <textarea
          rows={7}
          placeholder="Descreva a atividade"
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>
        <button
          disabled={loading}
          onClick={cadastrar}
          className="btn btn-lg btn-blue"
        >
          {loading ? "Aguarde..." : "Cadastrar Atividade"}
        </button>
      </form>
    </>
  );
};

export default ModalRegistrarAtividade;
