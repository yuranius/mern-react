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
				<span href="#" className="brand-logo">
					Logo
				</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/links">Ссылки</NavLink>
					</li>
					<li>
						<NavLink to="/create">Создать ссылку</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHeandler}>Выход</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
