import { Routes, Route } from "react-router";
import  {Navigate}  from "react-router-dom";
import React, {useEffect} from "react";
import { CollocutorsPage } from "./Collocutors/CollocutorsPage";
import { ProfilePageContainer } from "./ProfilePage/ProfilePageContainer";
import { FoundCollocutorsContainer } from "./FindCollocutors/FindCollocutorsContainer";
import {MessagePage} from "./MassagePage/MessagePage";
import {AuthPageContainer} from "./AuthPage/AuthPageContainer";
import {useSelector} from "react-redux";


export const useRoutes = (isAuthenticated) => {


	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<MessagePage/>}/>
				<Route path="/foundcollocutors" element={ <FoundCollocutorsContainer />}/>
				<Route path="/collocutors" exact element={<CollocutorsPage />} />
				<Route path="/messages" exact element={<MessagePage />} />
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
