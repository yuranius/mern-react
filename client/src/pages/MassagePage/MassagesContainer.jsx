import React, {useEffect} from 'react';
import Massages from "./Massages";
import {useDispatch, useSelector} from "react-redux";
import {
   addMassageActionCreator,
   AsyncGetUsersWhoHaveMassagesAction,
   updateNewMassageTextActionCreator
} from "../../store/messageReducer";

const MassagesContainer = () => {

   const { userId } = useSelector((state) => state.user)
   const {collocuters} = useSelector((state) => state.message)



   let massageSend = (e) => {
      e.preventDefault();
      let text = e.target.value; //? получаем value из того элемента, который вызвал эту функцию
      dispatch( updateNewMassageTextActionCreator(text) ); //? Вызываем функцию, которая возвращает <<<action>> и передаем в нее значение переменной <<text>>
   };

   let addMassage = (e) => {
      e.preventDefault()
      dispatch( addMassageActionCreator() );
   };



   const dispatch = useDispatch()


   useEffect(()=> {
      dispatch(AsyncGetUsersWhoHaveMassagesAction(userId))

   },[userId])







   return (
      <Massages
          collocuters={collocuters}
          addMassage={addMassage}
          massageSend={massageSend}
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
