import { Routes, Route } from "react-router";
import React from "react";


import { MessagePage } from "./pages/MessagePage";
import { CollocutorsPage } from "./pages/Collocutors/CollocutorsPage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { FoundCollocutorsContainer } from "./pages/FindCollocutors/FindCollocutorsContainer";

export const useRoutes = (isAuthenticated) => {
	// isAuthenticated = true;
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MessagePage/>}/>
				<Route path="/foundcollocutors" element={ <FoundCollocutorsContainer />}/>
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
