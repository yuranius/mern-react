import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import userPhoto from "./../image/user-img.webp";
import {API_URL} from "../config"

export const Navbar = () => {

    const auth = useContext(AuthContext)


    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
    }


	return (
		<nav>
			<div className="nav-wrapper blue">
				<img src={auth.avatarUser != null ? `${API_URL + auth.avatarUser}` : userPhoto} alt="" className="navbar-ava" />
				<NavLink to="/profile" className="brand-logo">
					
					{auth.userLogin ? auth.userLogin : 'Логин'}
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
