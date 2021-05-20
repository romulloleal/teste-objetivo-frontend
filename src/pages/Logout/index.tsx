import React from "react";
import {useHistory} from 'react-router-dom'

export default function Logout() {
	const history = useHistory();
  localStorage.removeItem("@schedule-study/user")
  history.push('/login')
  return <></>;
}
