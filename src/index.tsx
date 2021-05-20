import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./components/userStorage";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
		<ToastContainer newestOnTop />
  </React.StrictMode>,
  document.getElementById('root')
);