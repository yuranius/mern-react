import "materialize-css";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

function App() {
	const routes = useRoutes(true);

	return (
		<Router>
			<div className="container">{routes}</div>
		</Router>
	);
}

export default App;
