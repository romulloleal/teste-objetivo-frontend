import React, { ReactText, useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStorage } from "../../components/userStorage";
import api from "../../services/api";
import { BsArrowRightShort } from "react-icons/bs";

import "./style.css";

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const toastId = React.useRef<ReactText>();

  const user = useContext(UserStorage);

  useEffect(() => {
    if (localStorage.getItem("@schedule-study/user") != null) {
      toast.dismiss(toastId.current || undefined);
      api
        .post("/sessions/checkSession", {}, { headers: user.headers })
        .then((response: any) => {
          toastId.current = toast.info(response.data.msg + user.name);
          history.push("/dashboard");
        })
        .catch((error: any) => {
          toastId.current = toast.error(error.response.data.error);
          localStorage.removeItem("@schedule-study/user");
        });
    }
  }, [user, history]);

  function logar() {
    toast.dismiss(toastId.current || undefined);
    setLoading(true);
    api
      .post("/sessions", {
        login: login,
        password: password,
      })
      .then((response: any) => {
        setLoading(false);
        localStorage.setItem(
          "@schedule-study/user",
          JSON.stringify(response.data)
        );
        var session = JSON.parse(
          localStorage.getItem("@schedule-study/user") || "{}"
        );
        user.idUser = session.user.id;
        user.name = session.user.name;
				user.type = session.user.type;
        user.token = session.token;
        toastId.current = toast.info(`Bem vindo(a), ${session.user.name}!`);
        history.push("/dashboard");
      })
      .catch((error: any) => {
        setLoading(false);
        toastId.current = toast.error(error.response.data.error);
      });
  }
  return (
    <>
      <div className="welcome">
        <div className="presentation">
          <div className="content">
            <div className="graduationCap"></div>
            <span className="description">
              Sistema acadêmico de horário de estudos
            </span>
          </div>
        </div>

        <div className="login">
          <div className="top">
            <div className="logo"></div>
          </div>
          <form className="formLogin" onSubmit={(e) => e.preventDefault()}>
            <h4 className="welcomeMessage">Bem Vindo!</h4>

            <label>Login</label>
            <input
              type="login"
              name="login"
              autoComplete="off"
              required={true}
              spellCheck={false}
              autoCapitalize="off"
              onChange={(e) => setLogin(e.target.value)}
            />

            <label>Senha</label>
            <input
              type="password"
              name="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-options">
              <button
                className="btn btn-lg btn-blue"
                type="submit"
                disabled={isLoading}
                onClick={!isLoading ? () => logar() : undefined}
              >
                {isLoading ? "Aguarde..." : ["Entrar", <BsArrowRightShort />]}
              </button>

              <Link to="#">Esqueceu sua senha?</Link>
            </div>
          </form>

          <div className="copyright">
            <span>
              Desenvolvido por <a href="https://facebook.com">Romullo Leal</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
