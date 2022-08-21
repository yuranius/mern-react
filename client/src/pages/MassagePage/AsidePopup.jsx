import React, {useState} from "react";
import "./AsidePopup.css"
import {AsyncGetUsersWhoHaveMassagesAction} from "../../store/messageReducer";
import {useDispatch} from "react-redux";



let MyMassage = (props) => {



   return (
      <div className="popup-body__message">
         <div className="popup-body__message-content">
            {props.massage}
         </div>
         <div className="popup-body__date-break">
            {props.date}
         </div>
      </div>
   );
};

let PartnerMassage = (props) => {
   return (
      <div className="popup-body__message-partner">
         <div className="popup-body__message-content-partner">
            {props.massage}
         </div>
         <div className="popup-body__date-break">
            {props.date}
         </div>
      </div>
   );
};

let AsidePopup = (props) => {


   let myMassagesElement = props.asideReducer.myMassages.map( m => (
      <MyMassage key={m.id} massage={m.massage} date={m.date} />
   ));

   let partnerMassagesElement = props.asideReducer.partnerMassages.map ( pm => (
      <PartnerMassage key={pm.id} massage={pm.massage} date={pm.date} />
   ));

   let newMassageElement = React.createRef();

   let massageSend = (e) => {
      e.preventDefault();
      let text = e.target.value; //? получаем value из того элемента, который вызвал эту функцию
      // props.dispatch( updateNewMassageTextActionCreator(text) ); //? Вызываем функцию, которая возвращает <<<action>> и передаем в нее значение переменной <<text>>
      props.massageSend(text);
   };

   let addMassage = (e) => {
      e.preventDefault()
      // props.dispatch( addMassageActionCreator() );
      props.addMassage();
   };




   // для появления icon при наведении
   const [ hover, setHover ] = useState(false)
   const someHandler = () => {setHover(true)}
   const someOtherHandler = () => {setHover(false)}

   const dispatch = useDispatch()

   let test = (e) => {
      dispatch(AsyncGetUsersWhoHaveMassagesAction(e))
   }

   let id = 45

   return (
       <>
       <div className="col s12">
          <h2 className="header">Сообщения</h2>
       </div>
       <div className="message-wrap">

          <div className="row">
             <ul className="row__list">
                <li className="row__item yellow darken-4 z-depth-4 hoverable" onClick={()=> test(id)}>User1</li>
                <li onMouseEnter={()=> someHandler()}  onMouseLeave={()=> someOtherHandler()} className="row__item z-depth-1 hoverable">User1 {hover && <i className="thin material-icons right">border_color</i>}</li>
                <li className="row__item z-depth-1 hoverable">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>
                <li className="row__item">User1</li>

             </ul>
          </div>
          <div className="aside__popup">
             <div className="aside__popup-wrap">
                <div className="aside__popup-header">
                   <div className="popup__card">
                      <figure className="popup__avatar">
                         <img
                             src='https://avatars.mds.yandex.net/get-zen_doc/245342/pub_5c9e2620c8055500b310022c_5c9e26bb3097fa00b21dfc0a/scale_1200'
                             alt=''
                         />
                      </figure>
                      <h5 className="popup__text-primary">
                         Дмитрий Медведев
                      </h5>
                      <h4 className="popup__status">
                         <span className="popup__status-indicator"></span>
                         Available
                      </h4>
                      <div className="popup__close">
                         <i className='icon-clear'></i>
                      </div>
                   </div>
                </div>

                {/* сообщения */}

                <div className="aside__popup-body">

                   {myMassagesElement}

                   {partnerMassagesElement}
                   {myMassagesElement}

                   {partnerMassagesElement}
                   {myMassagesElement}

                   {partnerMassagesElement}
                   {myMassagesElement}

                   {partnerMassagesElement}
                   {myMassagesElement}

                   {partnerMassagesElement}

                   <div className="popup-body__snippet">
                      <div className="popup-body__stage">
                         <div className="popup-body__dot-typing"></div>
                      </div>
                   </div>

                   <div className="clearfix"></div>
                </div>



                {/* сообщения*/}


                <div className="aside__popup-footer">
                   <div className="popup-footer__card">
                      <div className="popup-footer__form-group">
                         <input
                             type='popup-footer__text'
                             placeholder='Start typing..'
                             className="popup-footer__form-control"
                             ref={newMassageElement}
                             value={props.asideReducer.newMassageText}
                             onChange={massageSend}
                         />
                         <i
                             className='icon-send'
                             onClick={addMassage}
                         ></i>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       </>
   );
};
export default AsidePopup;
