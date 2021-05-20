import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home/index";
import RegistrarAtividade from '../RegistrarAtividade/index';
import MinhasAtividades from '../MinhasAtividades/index';

import './style.css'

const Content = () => {
  return (
    <div className="content">
      <Switch>
        <Route path="/dashboard" exact component={Home} />
				<Route path="/dashboard/registrar_atividade" component={RegistrarAtividade} />
				<Route path="/dashboard/minhas_atividades" component={MinhasAtividades} />
        <Route path="*" component={Home} />
      </Switch>
    </div>
  );
};

export default Content;
