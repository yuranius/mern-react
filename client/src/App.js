import "materialize-css";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
	const {login, logout, token, userId} = useAuth;

	const isAuthenticated = !!token

	const routes = useRoutes(isAuthenticated);

	console.log('📢 [App.js:15]', isAuthenticated, token, userId);

	return (
		<AuthContext.Provider value={{token, login, logout, userId, isAuthenticated }}>
			<Router>
				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
