import React from "react";

import userPhoto from "./../../../image/user-img.webp";

export const FoundCollocutorsItem = (props) => {
	let follow = () => {
		props.follow(props.id)
	};

	let unfollow = () => {
		props.unfollow(props.id)
	};

	console.log('📢 [FindCollocutorsItem.jsx:14]', props);
	return (
		<li className={( props.userId === props.id ) ?  "collection-item avatar teal lighten-1" : "collection-item avatar"}>
			<div className="collocutors">
				<img src={props.photos != null ? props.photos : userPhoto} alt="" className="circle" />
				<span className="title">{props.login}</span>
			</div>
			{( props.userId !== props.id ) ?
			(<div className="collections-buttons">
				{!props.isFetch ? (
					<button className="waves-effect waves-light btn" onClick={follow}>
						Добавить
					</button>
				) : (
					<button className="waves-effect waves-light btn yellow darken-4" onClick={unfollow}>
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
