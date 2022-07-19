import "materialize-css";
import { useRoutes } from "./routes";
import { BrowserRouter as Router} from "react-router-dom";
import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
	const {login, logout, token, userId, userLogin} = useAuth();
	console.log('📢 [App.js:11]', userLogin);

	const isAuthenticated = !!token

	const routes = useRoutes(isAuthenticated);


	return (
		<AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated, userLogin }}>
			<Router>
				{ isAuthenticated && <Navbar /> }

				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
