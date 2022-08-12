import React from "react";

import userPhoto from "./../../../image/user-img.webp";

export const FoundCollocutorsItem = (props) => {
	return (
		<li className={( props.userId === props.id ) ?  "collection-item avatar teal lighten-1" : "collection-item avatar"}>
			<div className="collocutors">
				<img src={props.avatar != null ? props.avatar : userPhoto} alt="" className="circle" />
				<span className={( props.userId === props.id ) ? "title white-text" : "title"}>{( props.userId === props.id ) ? props.login + '(Я)' : props.login}</span>
			</div>
			{( props.userId !== props.id ) ?
			(<div className="collections-buttons">
				{!props.friend ? (
					<button className="waves-effect waves-light btn" onClick={ () => props.addFriend(props.id)}>
						Добавить
					</button>
				) : (
					<button className="waves-effect waves-light btn yellow darken-4" onClick={ () => props.deleteFriend(props.id)}>
						Удалить
					</button>
				)}
				<a href="#!" className="waves-effect waves-light btn">
					Отправить сообщение
				</a>
			</div>) : <div></div>
			}
		</li>
	);
};
