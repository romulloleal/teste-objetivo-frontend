import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Calendar from "../../../components/Calendar/index";
import { UserStorage } from "../../../components/userStorage";

const RegistrarAtividade = () => {
  const user = useContext(UserStorage);

  const history = useHistory();
  if (user.type !== 3) {
    history.push("/dashboard");
  }

  return (
    <>
      <h2 className="title">Registrar Atividade</h2>
			<div style={{ fontSize: "1em", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				Selecione uma data abaixo para cadastrar uma atividade
      </div>
      <Calendar />
    </>
  );
};

export default RegistrarAtividade;
