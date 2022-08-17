import { connect } from "react-redux";
import {
   addMassageActionCreator,
   updateNewMassageTextActionCreator,
} from "../../store/messageReducer";

import AsidePopup from "./AsidePopup";



let mapStateToProps = (state) => {
   return{
      asideReducer:state.message
   }
};

let mapDispatchToProps = (dispatch) => {
   return{
      massageSend: (text) => {
         dispatch(updateNewMassageTextActionCreator(text))
      },
      addMassage: () => {
         dispatch(addMassageActionCreator());
      }
   }
};

const AsidePopupContainer = connect(mapStateToProps,mapDispatchToProps) (AsidePopup)

export default AsidePopupContainer;
