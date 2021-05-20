import React, { useEffect, useState, useContext } from "react";
import * as dateFns from "date-fns";

import { UserStorage } from "../../../../components/userStorage";

import api from "../../../../services/api";

import "./style.css";

const ModalMinhasAtividades = (props: any) => {
  const [schedules, setSchedules] = useState([]);

  const user = useContext(UserStorage);

  useEffect(() => {
    api
      .post(
        "/schedule/listSchedules",
        {
          date: props.date,
          studentId: user.idUser,
        },
        { headers: user.headers }
      )
      .then((response: any) => {
        setSchedules(response.data.success);
        console.log(response.data.success);
      });
  }, [props.date, user.headers, user.idUser]);

  return (
    <div className="modalMinhasAtividades">
      <span className="headerMinhasAtividades">
        <h4>Atividades cadastradas</h4>
      </span>
      <b>Data</b>: {dateFns.format(props.date, "dd/MM/yyyy")}
      <br />
      <br />
      {schedules.map((schedule: any, i) => (
        <>
          <b>Atividade {i + 1}</b>
          <div>{schedule.description}</div>
					<br /><br />
        </>
      ))}
    </div>
  );
};

export default ModalMinhasAtividades;
