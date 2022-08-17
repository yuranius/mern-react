import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMassage} from '../../hooks/message.hook'
import {Collocutors} from "./Collocutors";
import {AsyncDelFriendAction, AsyncGetFriendsAction} from "../../store/friendsReducer";



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
	},[userId])

	useEffect(()=> {
		setMessage(massage)
	},[friends])


	return <Collocutors
		friends={friends}
		deleteFriend={deleteFriend}
		loading={loading}
		userId={userId}
	/>;
};
