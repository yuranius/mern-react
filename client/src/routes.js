import { Routes, Route } from "react-router";
import React from "react";


import { MessagePage } from "./pages/MessagePage";
import { FoundCollocutors } from "./pages/FindCollocutors";
import { CollocutorsPage } from "./pages/Collocutors/CollocutorsPage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
	isAuthenticated = true;
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MessagePage/>}/>
				<Route path="/foundcollocutors" element={ <FoundCollocutors />}/>
				<Route path="/collocutors" exact element={<CollocutorsPage />} />
				<Route path="/messages" exact element={<MessagePage />} />
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
