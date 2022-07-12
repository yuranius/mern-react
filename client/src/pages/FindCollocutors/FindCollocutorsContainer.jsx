import React, { useState } from "react";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMassage } from "../../hooks/message.hook";
import { FoundCollocutors } from "./FindCollocutors";

const testData = [
	{
		id: 0,
		login: "Bob",
		isFetch: false,
		photos: null,
	},

	{
		id: 1,
		login: "Maik",
		isFetch: true,
		photos: null,
	},
	{
		id: 2,
		login: "Job",
		isFetch: false,
		photos: null,
	},
];

export const FoundCollocutorsContainer = () => {

	const [form, setForm] = useState({ collocuter: "" });

	const { loading, request } = useHttp();

  const [isFetch, setIsFetch] = useState();


	const changeHandler = (event) => {
		setForm({ ...form, [event.target.id]: event.target.value });
	};

	let message = useMassage();

	const collocuterHeandler = async () => {
		console.log('📢 [FindCollocutorsContainer.jsx:45]', form.collocuter);
		try {
			const data = await request(`/api/auth/findcollocuter/${form.collocuter}`, 'GET');
			console.log('📢 [FindCollocutorsContainer.jsx:48]', data);
		} catch (error) {
			console.log("📢 [FoundCollocutors.jsx:24]", error);
			alert("Что-то не получилось");
		}
	};

  let follow = async (id) => {
		try {
      testData[id].isFetch = true
      console.log('📢 [FindCollocutorsContainer.jsx:56]', testData[id]);
      setIsFetch({...testData[id].isFetch})
		} catch (error) {}
	};

	let unfollow = (id) => {
		testData[id].isFetch = false
    console.log('📢 [FindCollocutorsContainer.jsx:61]', testData[id]);
    setIsFetch({...testData[id].isFetch})
	};

  useEffect(() => {
    window.M.updateTextFields()
  }, []) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)




	return <FoundCollocutors 
  testData={testData} 
  follow={follow}
  unfollow={unfollow}
  collocuterHeandler={collocuterHeandler} 
  changeHandler={changeHandler} 
  loading={loading} />;
};
