import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Calendar from "../../../components/Calendar/index";
import { UserStorage } from "../../../components/userStorage";

const RegistrarAtividade = () => {
  const user = useContext(UserStorage);

  const history = useHistory();
  if (user.type !== 2) {
    history.push("/dashboard");
  }

  return (
    <>
      <h2 className="title">Minhas Atividade</h2>
      <div style={{ fontSize: "1em", display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        Datas marcadas com
				<span
          style={{
						width: '10px',
						height: '10px',
            backgroundColor: "royalblue",
            borderRadius: "50%",
						marginLeft: '5px',
						marginRight: '5px'
          }}
        ></span>
				possuem atividades nelas
      </div>
			<div>Clique na data marcada para ver as atividades</div>
      <Calendar />
    </>
  );
};

export default RegistrarAtividade;
