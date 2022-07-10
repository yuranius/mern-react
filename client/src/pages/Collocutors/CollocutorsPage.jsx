import React from "react";
import { useHttp } from "../../hooks/http.hook";

export const CollocutorsPage = () => {
    const {loading } = useHttp()
	return (
		<div className="#">
			<h1>Собеседники</h1>

			<div className="card-content black-text">
				<div className="input-field">
					<input type="text" className="green-input" id="login" placeholder="Введите логин пользователя" />
					<label htmlFor="login">Поиск пользователя</label>
				</div>
                <div className="card-action">
                        <button 
                        className="btn yellow darken-4" 
                        style={{marginRight:10}}
                        disabled={loading} 
                        >Поиск</button>
                    </div>
			</div>
		</div>
	);
};
