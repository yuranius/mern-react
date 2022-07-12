import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMassage } from '../hooks/message.hook'
import userPhoto from './../image/user-img.webp'

const testData = [
    {
      id: 0,
      login: 'Bob',
      isFetch: false,
      photos: null,
    },

    {
      id: 1,
      login: 'Maik',
      isFetch: true,
      photos: null,
    },
  ]


export const FoundCollocutors = () => {

  const auth = useContext(AuthContext)


  const [form, setForm] = useState({ collocuter: '' })

  const { loading, request } = useHttp()

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  let message = useMassage()

  const collocuterHeandler = async () => {
    try {
      const data = await request('/api/auth/foundcollocuter', 'POST', {
        ...form,
      })
      message(data.message)
    } catch (error) {
      console.log('📢 [FoundCollocutors.jsx:24]', error)
      alert('Что-то не получилось')
    }
  }

  let follow = async () => {

    try {
      const data = await request(`follow/${testData[0].id}`, 'POST', {...auth.userId} )
    } catch (error) {
      
    }
  }


  let unfollow = () => {
    console.log('📢 [FindCollocutors.jsx:46]', 'отписка');
  }



  let collocuterElements = testData.map((u) => (
    <li className="collection-item avatar" key={u.id}>
      <div className="collocutors">
        <img
          src={u.photos != null ? u.photos : userPhoto}
          alt=""
          className="circle"
        />
        <span className="title">{u.login}</span>
      </div>
      <div className="collections-buttons">
        {!u.isFetch ? (
          <a href="#!" className="waves-effect waves-light btn" onClick={follow}  >
            Добавить
          </a>
        ) : (
          <a href="#!" className="waves-effect waves-light btn yellow darken-4" onClick={unfollow} >
            Удалить
          </a>
        )}
        <a href="#!" className="waves-effect waves-light btn">
          Отправить сообщение
        </a>
      </div>
    </li>
  ))

  return (
    <div className="#">
      <h1>Поиск собеседников</h1>

      <div className="card-content black-text">
        <div className="input-field">
          <input
            type="text"
            className="green-input"
            id="collocuter"
            placeholder="Введите логин пользователя"
            onChange={changeHandler}
          />
          <label htmlFor="collocuter">Поиск пользователя</label>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-4"
            style={{ marginRight: 10 }}
            disabled={loading}
            onClick={collocuterHeandler}
          >
            Поиск
          </button>
        </div>

        <ul className="collection">{collocuterElements}</ul>
      </div>
    </div>
  )
}
