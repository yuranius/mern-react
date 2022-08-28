import { Routes, Route } from "react-router";
import  { Navigate }  from "react-router-dom";
import React from "react";
import { CollocutorsContainer } from "./Collocutors/CollocutorsContainer";
import { ProfilePageContainer } from "./ProfilePage/ProfilePageContainer";
import { FoundCollocutorsContainer } from "./FindCollocutors/FindCollocutorsContainer";
import {AuthPageContainer} from "./AuthPage/AuthPageContainer";
import MassagesContainer from "./MassagePage/MassagesContainer";


export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MassagesContainer/>}/>
				<Route path="/foundcollocutors" element={ <FoundCollocutorsContainer />}/>
				<Route path="/collocutors" exact element={<CollocutorsContainer />} />
				<Route path="/messages" exact element={<MassagesContainer />} />

				<Route path="/profile" element={<ProfilePageContainer />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<>

		<Routes>
			<Route path="*" element={<Navigate to="/" />} />
			<Route path="/" element={<AuthPageContainer />} />
		</Routes>
		</>
	);
};
