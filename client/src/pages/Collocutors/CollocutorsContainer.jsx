import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMassage} from '../../hooks/message.hook'
import {Collocutors} from "./Collocutors";
import {AsyncDeleteFriendAction, AsyncDelFriendAction, AsyncGetFriendsAction} from "../../store/friendsReducer";



export const CollocutorsContainer = () => {




	let setMessage = useMassage();
	const dispatch = useDispatch()

	let {userId} = useSelector((state) => state.user)
	let {loading, massage} = useSelector((state) => state.over)
	let {friends} = useSelector(state => state.friends)



	let deleteFriend = (friendId) => {
		dispatch(AsyncDelFriendAction({userId, friendId}))
	};

	useEffect(() => {
		userId && dispatch(AsyncGetFriendsAction(userId))
		console.log( '📌:отрисовка',userId,'🌴 🏁')
		
	},[userId])

	useEffect(()=> {
		setMessage(massage)
	},[friends])
	
	console.log( '📌:','Отрисовка CollocutersContainer','🌴 🏁')
	



	return <Collocutors
		friends={friends}
		deleteFriend={deleteFriend}
		loading={loading}
		userId={userId}
	/>;
};
