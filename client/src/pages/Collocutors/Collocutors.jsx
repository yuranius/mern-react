import React from "react";
import {FoundCollocutorsItem} from "../FindCollocutors/FoundCollocutorsItem/FindCollocutorsItem";


export const Collocutors = (props) => {

	let collocuterElements = ( props.friends && props.friends.map((u) =>
		<FoundCollocutorsItem
			id={u.id}
			key={u.id}
			login={u.login}
			deleteFriend={props.deleteFriend}
			userId={props.userId}
			friend={u.friend}
		/>))

	return (
		<div className="#">
			<h1>Мои собеседники</h1>

			<div className="card-content black-text">
				{props.friends && <ul className="collection">{collocuterElements}</ul>}
				{/*{props.collocuters &&  <Paginator totalItemsCount={props.totalUsers} pageSize={props.pageSize} currentPage={props.pageNumber} onPageChanged={props.onPageChanged}/> }*/}
			</div>
		</div>
	);
};

