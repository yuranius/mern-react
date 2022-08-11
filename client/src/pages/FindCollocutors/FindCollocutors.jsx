import React from "react";
import { FoundCollocutorsItem } from "./FoundCollocutorsItem/FindCollocutorsItem";
import Paginator from "../../components/Paginator/Paginator";


export const FoundCollocutors = (props) => {

	let pages = props.totalPages


	let arr = []

	// pages.toString().split(' ')

	for (let i = 1; i <= pages; i++) {
		arr.push(i)
	}



	console.log( '📌:',arr,'🌴 🏁')
	
	
	
	let collocuterElements = ( props.collocuters && props.collocuters.map((u) =>
		  <FoundCollocutorsItem
		  id={u.id}
		  key={u.id}
		  login={u.login}
		  isFetch={u.isFetch}
		  follow={props.follow}
		  unfollow={props.unfollow}
		  userId={props.userId}
		  />));

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
//totalItemsCount, pageSize, currentPage, onPageChanged