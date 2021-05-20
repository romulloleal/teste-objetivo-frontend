import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "./Header/header";
import Content from "./Content/index";

import "./style.css";

export default function Dashboard() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("@schedule-study/user") == null) {
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="dashboard">
      <Header />
      <Content />
    </div>
  );
}
