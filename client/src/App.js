import "materialize-css";
import { useRoutes } from "./routes";
import { BrowserRouter as Router} from "react-router-dom";
import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
	const {login, logout, isLogin, uploadAvatar, token, userId, userLogin, avatarUser} = useAuth();

	const isAuthenticated = !!token

	const routes = useRoutes(isAuthenticated);


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
