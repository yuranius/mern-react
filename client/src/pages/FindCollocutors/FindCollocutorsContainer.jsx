import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CollocutersContext } from "../../context/CollocutersContext";
import { useHttp } from "../../hooks/http.hook";
import { useMassage } from "../../hooks/message.hook";
import { FoundCollocutors } from "./FindCollocutors";



export const FoundCollocutorsContainer = () => {

	let collocuters = useContext(CollocutersContext)
	const auth = useContext(AuthContext)

	const [form, setForm] = useState({ collocuter: "" });

	const { loading, request, error, clearError } = useHttp();

	// const [, setIsFetch] = useState();


	let message = useMassage();

	useEffect(() => {
        message(error);       
        clearError()
    }, [error, message, clearError]);
	
	const changeHandler = (event) => {
		setForm({ ...form, [event.target.id]: event.target.value });
	};

	

	const collocuterHeandler = async () => {
		if (form.collocuter && form.collocuter !== " " ) {
		try {
			const data = await request(`/api/auth/findcollocuter/${form.collocuter}`, 'GET');
			// передаем в контекст массив собеседников
			collocuters.users = data.data.map((u) => {return u } )
			message(data.massage)
		} catch (error) {
			collocuters.users = []
		}} else { message( 'Некорректный ввод' ) }
	};

  let follow = async (id) => {
		try {

    //   setIsFetch({...testData[id].isFetch})
		} catch (error) {}
	};

	let unfollow = (id) => {
	// 	testData[id].isFetch = false
    // console.log('📢 [FindCollocutorsContainer.jsx:61]', testData[id]);
    // setIsFetch({...testData[id].isFetch})
	};

  useEffect(() => {
    window.M.updateTextFields()
  }, []) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)



	return <FoundCollocutors 
		testData={collocuters.users} 
		follow={follow}
		unfollow={unfollow}
		collocuterHeandler={collocuterHeandler} 
		changeHandler={changeHandler} 
		loading={loading}
		userId={auth.userId}
   />;
};
