import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";

import { UserStorage } from "../../../components/userStorage";

import "./style.css";

export default function Home() {
  const user = useContext(UserStorage);

  useEffect(() => {}, []);

  return (
    <>
      {user.type === 3 ? (
        <div className="cards">
          <NavLink to="/dashboard/registrar_atividade" className="options">
            <AiOutlineSchedule />
            <span>Registrar Atividade</span>
          </NavLink>
        </div>
      ) : (
        ""
      )}
			{user.type === 2 ? (
        <div className="cards">
          <NavLink to="/dashboard/minhas_atividades" className="options">
            <AiOutlineSchedule />
            <span>Minhas Atividade</span>
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
