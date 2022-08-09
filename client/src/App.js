import "materialize-css";
import { useRoutes } from "./pages/routes";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { Navbar } from "./components/Navbar";
import {TOKEN_DATA, USER_DATA} from "./config";
import {useDispatch, useSelector} from "react-redux";
import {  useMassage } from "./hooks/message.hook"
import {setAuthUser} from "./store/authReducer";



function App() {

	const massage = useMassage()

	let isAuthenticated = false

	const userData = JSON.parse(localStorage.getItem(USER_DATA))
	const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA))


	const dispatch = useDispatch()



	if (tokenData) {
		isAuthenticated = !!tokenData.token;
	}



	const routes = useRoutes(isAuthenticated);

	// для переренеринга компонента
	let state = useSelector((state) => state)
	useEffect(() => {
		if (userData) {
			dispatch(setAuthUser(userData)) //задиспатчим, то что находится в localStorage
		}
		 massage(state.over.massage)
	}, [isAuthenticated])


	return (
			<Router>
				{ isAuthenticated && <Navbar /> }
				<div className="container">{routes}</div>
			</Router>
	);
}

export default App;
