import React, {useEffect, useState} from 'react';
import Massages from "./Massages";
import {useDispatch, useSelector} from "react-redux";
import { useMassage } from "../../hooks/message.hook"
import {
   AsyncAddMassageActionCreator, AsyncGetMassagesUserAction,
   AsyncGetUsersWhoHaveMassagesAction
} from "../../store/messageReducer";
import {todayDate} from "../../Utilits/getData";

const MassagesContainer = () => {
   const currentDate = `${todayDate().dayName} | ${todayDate().time} | ${todayDate().date}`
   const { userId, userLogin } = useSelector((state) => state.user)
   const {collocuters, messages} = useSelector((state) => state.message)
   const [value , setValue] = useState('')
   const dispatch = useDispatch()
   const setMassage = useMassage()
   const [ active, setActive ] = useState('')
   const [ collocuterLogin, setCollocuterLogin] = useState('')

   let massageHandler = (e) => {
      setValue(e.target.value)
   };

   let addMassage = () => {
      if (value && userId && active) {
         dispatch( AsyncAddMassageActionCreator({message:value, userToId:active, userFromId:userId, login: collocuterLogin, created_at:currentDate}) );
         setValue('')
      } else {
         setMassage('Ошибка!!!')
      }
   };






   // TODO рассмотреть вариант сохрания active в state, что-бы при преключении вкладок, активный пользователь не менялся
   useEffect( () => {
      if (collocuters[0]) {
         setActive(collocuters[0].id)
         setCollocuterLogin(collocuters[0].login)
      }
   },[collocuters])

   //TODO надо запрос переписать, что бы сообщения выгружать только активного юзера
   useEffect( ()=> {
      if (userId && active) {
         dispatch(AsyncGetMassagesUserAction({userId, friendsId: active}))
      }
   },[userId,active])

   useEffect( ()=> {
      if (userId) {
         dispatch(AsyncGetUsersWhoHaveMassagesAction(userId))
      }
   },[userId])

   const userHandler = ({id, login}) => {
      setCollocuterLogin(login)
      setActive(id)
      // if (userId && active) {
      //    dispatch(AsyncGetMassagesUserAction({userId, friendsId:active}))
      //    dispatch(AsyncGetMassagesUserAction(userId))
      // }

   }

   


   return (
      <Massages
          collocuterLogin={collocuterLogin}
          userLogin={userLogin}
          userId={userId}
          active={active}
          userHandler={userHandler}
          collocuters={collocuters}
          addMassage={addMassage}
          massageHandler={massageHandler}
          messages={messages}
          value={value}
      />
   );
};

export default MassagesContainer;




// import { connect } from "react-redux";
// import {
//    addMassageActionCreator,
//    updateNewMassageTextActionCreator,
// } from "../../store/messageReducer";
//
// import Massages from "./Massages";
//
//
//
// let mapStateToProps = (state) => {
//    return{
//       asideReducer:state.message
//    }
// };
//
// let mapDispatchToProps = (dispatch) => {
//    return{
//       massageSend: (text) => {
//          dispatch(updateNewMassageTextActionCreator(text))
//       },
//       addMassage: () => {
//          dispatch(addMassageActionCreator());
//       }
//    }
// };
//
// const MassagesContainer = connect(mapStateToProps,mapDispatchToProps) (Massages)
//
// export default MassagesContainer;
