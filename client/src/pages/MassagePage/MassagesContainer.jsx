import React, {useEffect, useState} from 'react';
import Massages from "./Massages";
import {useDispatch, useSelector} from "react-redux";
import { useMassage } from "../../hooks/message.hook"
import {
   AsyncAddMassageActionCreator,
   AsyncChangeUsersWhoHaveMassagesAction,
   AsyncGetMassagesUserAction,
   AsyncGetUsersWhoHaveMassagesAction,
   changeUsersWhoHaveMassagesAction,
   setCurrentUserAction,
} from "../../store/messageReducer";
import {currentDate} from "../../Utilits/getData";

const MassagesContainer = () => {
   const { userId, userLogin } = useSelector((state) => state.user)
   const {collocuters, messages, currentUser} = useSelector((state) => state.message)
   const [value , setValue] = useState('')
   const dispatch = useDispatch()
   const setMassage = useMassage()

   const [ collocuterLogin, setCollocuterLogin] = useState('')

   let massageHandler = (e) => {
      if(e.keyCode === 13){
         addMassage()
      } else {
         setValue(e.target.value)
      }
   };

   let addMassage = () => {
      if(!value){
         return setMassage('Поле не может быть пустым...')
      }
      if (value && userId && currentUser) {
         dispatch(AsyncAddMassageActionCreator({message:value, userToId:currentUser, userFromId:userId, login: collocuterLogin, created_at:currentDate}) );
         dispatch(AsyncChangeUsersWhoHaveMassagesAction(currentUser))
         dispatch(changeUsersWhoHaveMassagesAction(currentUser))
         setValue('')
      } else {
         return setMassage('Ошибка!!!')
      }
   };


   console.log( '📌:',currentUser,'🌴 🏁')
   

   useEffect( () => {
      if (!!collocuters[0]) {
         if (!currentUser){
            dispatch(setCurrentUserAction(collocuters[0].id))
            setCollocuterLogin(collocuters[0].login)
         }
      }
   },[collocuters])


   useEffect( ()=> {
      if (userId) {
         dispatch(AsyncGetMassagesUserAction({userId, friendsId: currentUser}))
      }
   },[userId,currentUser])

   useEffect( ()=> {
      if (userId) {
         dispatch(AsyncGetUsersWhoHaveMassagesAction(userId))
      }
   },[userId])

   const userHandler = ({id, login}) => {
      setCollocuterLogin(login)
      dispatch(setCurrentUserAction(id))

      if (userId && currentUser) {
         dispatch(AsyncGetMassagesUserAction({userId, friendsId:currentUser}))
         dispatch(AsyncGetMassagesUserAction(userId))
      }

   }

   

   return (
      <Massages
          collocuterLogin={collocuterLogin}
          userLogin={userLogin}
          userId={userId}
          currentUser={currentUser}
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
