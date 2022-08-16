import React from "react";
import { FoundCollocutorsItem } from "./FoundCollocutorsItem/FindCollocutorsItem";
import Paginator from "../../components/Paginator/Paginator";


export const FoundCollocutors = (props) => {
	
	let pages = props.totalPages

	pages.toString().split(' ')


	let collocuterElements = ( props.collocuters && props.collocuters.map((u) =>
		<FoundCollocutorsItem
		  id={u.id}
		  key={u.id}
		  login={u.login}
		  addFriend={props.addFriend}
		  deleteFriend={props.deleteFriend}
		  userId={props.userId}
		  friend={u.friend}
		  />))

	return (
		<div className="#">
			<h1>Поиск собеседников</h1>

			<div className="card-content black-text">
				<div className="input-field">
					<input type="text" className="green-input" id="collocuter" placeholder="Введите логин пользователя" onChange={props.changeHandler} onKeyDown={props.pressEnter} />
					<label htmlFor="collocuter">Поиск пользователя</label>
				</div>
				<div className="card-action">
					<button className="btn yellow darken-4"
							style={{ marginRight: 10 }}
							disabled={props.loading}
							onClick={props.collocuterHandler}
					>
						Поиск
					</button>
				</div>
				{props.collocuters && <ul className="collection">{collocuterElements}</ul>}
				{props.collocuters &&  <Paginator totalItemsCount={props.totalUsers} pageSize={props.pageSize} currentPage={props.pageNumber} onPageChanged={props.onPageChanged}/> }
			</div>
		</div>
	);
};
