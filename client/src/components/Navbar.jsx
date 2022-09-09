import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AsyncLogoutUserAction} from "../store/authReducer";
import {getUsersWhoHaveMassagesAction, setCurrentUserAction} from "../store/messageReducer";

export const Navbar = () => {

	const userLogin = useSelector((state) => state.user.userLogin)

	const dispatch = useDispatch()

	const logoutHandler = (event) => {
		event.preventDefault()
		dispatch(AsyncLogoutUserAction())
		dispatch(setCurrentUserAction(''))
		dispatch(getUsersWhoHaveMassagesAction([]))
	}


	return (
		<nav>
			<div className="nav-wrapper blue">
				{/*<img src={auth.avatarUser != null ? `${API_URL + auth.avatarUser}` : userPhoto} alt="" className="navbar-ava" />*/}
				<NavLink to="/profile" className="brand-logo">
					{userLogin ? userLogin : 'Логин не определен'}
				</NavLink>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
				<li>
						<NavLink to="/foundcollocutors">Поиск собеседников</NavLink>
					</li>
					<li>
						<NavLink to="/collocutors">Собеседники</NavLink>
					</li>
					<li>
						<NavLink to="/messages">Сообщения</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler}>Выход</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
