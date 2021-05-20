import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Modal } from "react-responsive-modal";

import Logo from "../../../assets/logo3.svg";

import "react-responsive-modal/styles.css";

import "./style.css";
import { UserStorage } from "../../../components/userStorage";
import ChangePassword from "../../../components/ChangePassword";

const Header = () => {
  const history = useHistory();

  const user = useContext(UserStorage);

  const [openUserOptions, setUserOptions] = useState(false);
	const [openModal, setOpenModal] = useState(false);

  return (
    <div className="header">
      <div className="left">
        {history.location.pathname !== "/dashboard" ? (
          <div className="goBack" onClick={() => history.goBack()}>
            <IoArrowBackSharp />
          </div>
        ) : (
          ""
        )}
        <img
          src={Logo}
          alt="Study"
          className="logo"
          width={125}
          onClick={() => history.push("/dashboard")}
        />
      </div>
      <div className="right" onClick={() => setUserOptions(!openUserOptions)}>
        <div className="user">
          <FaUserCircle />
          <div className="userName">Olá, {user.name}</div>
          <IoMdArrowDropdown className="arrowDown" />
        </div>
        <div
          className={`userOptions ${openUserOptions === true ? "show" : ""}`}
        >
					<NavLink to="#" onClick={() => setOpenModal(true)}>Alterar Senha</NavLink>
          <NavLink to="/logout">Sair</NavLink>
        </div>
      </div>

			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<ChangePassword closeModal={setOpenModal} />
			</Modal>
    </div>
  );
};

export default Header;
