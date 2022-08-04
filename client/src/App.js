import "materialize-css";
import { useRoutes } from "./pages/routes";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useEffect} from "react";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import {useSelector} from "react-redux";


function App() {
	const {login, logout, isLogin, uploadAvatar,  userId, userLogin, avatarUser} = useAuth();



	let token = useSelector((state) => state.user.token)

	const isAuthenticated = !!token;

	const routes = useRoutes(isAuthenticated);


	console.log('📢---isA---📢',token)

	useEffect(() => {
		console.log('📢------📢',token)
	}, [token])



	return (
		<AuthContext.Provider value={{ token, login, logout, isLogin, uploadAvatar, userId, isAuthenticated, userLogin, avatarUser }}>
			<Router>
				{ isAuthenticated && <Navbar /> }

				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
