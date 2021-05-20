import React, { ReactText, useContext, useState } from "react";
import api from "../../services/api";
import { UserStorage } from "../userStorage";
import { toast } from "react-toastify";

import "./style.css";

const ChangePassword = (props: any) => {
  const toastId = React.useRef<ReactText>();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
	const [loading, setLoading] = useState(false)

  const user = useContext(UserStorage);

  const changePass = () => {
		setLoading(true)
    toast.dismiss(toastId.current || undefined);
    const form = {
      id: user.idUser,
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPassword: confirmPass,
    };
    api.patch("/users/updatePassword", form).then((response: any) => {
      toastId.current = toast.success(response.data.success);
			props.closeModal(false)
    }).catch((error: any) => {
			toastId.current = toast.error(error.response.data.error);
			setLoading(false)
		});
  };

  return (
    <form
      className="changePass"
      name="changePass"
      encType="multipart/form-data"
      method="post"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3>Alterar Senha</h3>
      <label>Senha Atual</label>
      <input
        type="password"
        onChange={(e) => setOldPass(e.target.value)}
      ></input>

      <label>Nova Senha</label>
      <input
        type="password"
        onChange={(e) => setNewPass(e.target.value)}
      ></input>

      <label>Confirmar Senha</label>
      <input
        type="password"
        onChange={(e) => setConfirmPass(e.target.value)}
      ></input>

      <button disabled={loading} className="btn btn-lg btn-blue" onClick={() => changePass()}>
        {loading === true ? 'Aguarde...' : 'Alterar Senha'}
      </button>
    </form>
  );
};

export default ChangePassword;
