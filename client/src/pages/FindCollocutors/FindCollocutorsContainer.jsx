import React, { useState } from "react";
import { useEffect } from "react";
import { useMassage } from "../../hooks/message.hook";
import { FoundCollocutors } from "./FindCollocutors";
import {useDispatch, useSelector} from "react-redux";
import {
	AsyncAddFriendAction, AsyncDeleteFriendAction,
	AsyncGetAllCollocutersAction,
	AsyncGetCollocutorsAction
} from "../../store/collocutorsReducer";
import {AsyncSetShowMassageAction} from "../../store/overReducer";



export const FoundCollocutorsContainer = () => {

	const [form, setForm] = useState({ collocuter: "" });

	let setMessage = useMassage();
	const dispatch = useDispatch()

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.id]: event.target.value });
	};



	const pressEnter = (event) => {
		if (event.key === 'Enter') {
			collocuterHandler()
		}
	}


	const collocuterHandler = () => {
		//проверка на пробелы
		const checkingSpaces = !/\s/.test(form.collocuter)

		if (checkingSpaces && !!form.collocuter) {
			dispatch(AsyncGetCollocutorsAction(form.collocuter))
		} else {
			dispatch(AsyncSetShowMassageAction('Не корректный ввод'))
		}
	}

	let {collocuters, pageNumber, pageSize, totalUsers, totalPages} = useSelector((state) => state.collocuters)
	let {userId} = useSelector((state) => state.user)
	let {loading, massage} = useSelector((state) => state.over)

	useEffect(()=> {
		setMessage(massage)
	},[collocuters,massage])


	useEffect(() => {
		userId && dispatch(AsyncGetAllCollocutersAction({pageNumber,pageSize,userId}))
	},[userId])


	const onPageChanged = (page) => {
		dispatch(AsyncGetAllCollocutersAction({pageNumber:page,pageSize,userId}))
	}
	let addFriend = (friendId) => {
		dispatch(AsyncAddFriendAction({userId, friendId}))
	};
	let deleteFriend = (friendId) => {
		dispatch(AsyncDeleteFriendAction({userId, friendId}))

};

  useEffect(() => {
    window.M.updateTextFields()
  }, []) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)



	return <FoundCollocutors
		collocuters={collocuters}
		addFriend={addFriend}
		deleteFriend={deleteFriend}
		collocuterHandler={collocuterHandler}
		changeHandler={changeHandler} 
		loading={loading}
		pressEnter={pressEnter}
		userId={userId}
		totalUsers={totalUsers}
		totalPages={totalPages}
		pageSize={pageSize}
		pageNumber={pageNumber}
		onPageChanged={onPageChanged}
   />;
};
