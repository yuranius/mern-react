import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const Navbar = () => {

    const auth = useContext(AuthContext)



    const logoutHeandler = (event) => {
        event.preventDefault()
        auth.logout()
    }


	return (
		<nav>
			<div className="nav-wrapper blue">
				<NavLink to="/profile" className="brand-logo">
					{auth.userLogin ? auth.userLogin : 'Login'}
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
						<a href="/" onClick={logoutHeandler}>Выход</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
