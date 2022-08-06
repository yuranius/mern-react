import "materialize-css";
import { useRoutes } from "./pages/routes";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { Navbar } from "./components/Navbar";
import {USER_DATA} from "./config";
import {useSelector} from "react-redux";
import {  useMassage } from "./hooks/message.hook"



function App() {

	const massage = useMassage()

	let isAuthenticated = false

	const data = JSON.parse(localStorage.getItem(USER_DATA))

	if (data) {
		isAuthenticated = !!data.token;
	}

	const routes = useRoutes(isAuthenticated);

	// для переренеринга компонента
	let user = useSelector((state) => state.user)
	useEffect(() => {
		 massage(user.massage)
	}, [user])


	return (
			<Router>
				{ isAuthenticated && <Navbar /> }
				<div className="container">{routes}</div>
			</Router>
	);
}

export default App;
