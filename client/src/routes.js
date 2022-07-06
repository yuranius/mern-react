import { Routes, Route } from "react-router";
import React from "react";


import { CreatePage } from "./pages/CreatePage";
import { LinksPage } from "./pages/LinksPage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<CreatePage/>}/>
				<Route path="/links" exact element={<LinksPage />} />
				<Route path="/create" exact element={<CreatePage />} />
				<Route path="/detail/:id" element={<DetailPage />} />
			</Routes>
		)
	}

	return (
		<>

		<Routes>
		
			<Route path="/" element={<AuthPage />} />
		</Routes>
		</>
	);
};
