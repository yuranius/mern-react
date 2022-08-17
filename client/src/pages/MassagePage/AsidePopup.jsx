import React from "react";
import scss from "./AsidePopup.module.css"
import messageReducer from "../../store/messageReducer";

let MyMassage = (props) => {
   return (
      <div className={scss["popup-body__message"]}>
         <div className={scss["popup-body__message-content"]}>
            {props.massage}
         </div>
         <div className={scss["popup-body__date-break"]}>
            {props.date}
         </div>
      </div>
   );
};

let PartnerMassage = (props) => {
   return (
      <div className={scss["popup-body__message-partner"]}>
         <div className={scss["popup-body__message-content-partner"]}>
            {props.massage}
         </div>
         <div className={scss["popup-body__date-break"]}>
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

   return (
      <div className={scss["aside__popup"]}>
         <div className={scss["aside__popup-wrap"]}>
            <div className={scss["aside__popup-header"]}>
               <div className={scss["popup__card"]}>
                  <figure className={scss["popup__avatar"]}>
                     <img
                        src='https://avatars.mds.yandex.net/get-zen_doc/245342/pub_5c9e2620c8055500b310022c_5c9e26bb3097fa00b21dfc0a/scale_1200'
                        alt=''
                     />
                  </figure>
                  <h5 className={scss["popup__text-primary"]}>
                     Дмитрий Медведев
                  </h5>
                  <h4 className={scss["popup__status"]}>
                     <span className={scss["popup__status-indicator"]}></span>
                     Available
                  </h4>
                  <div className={scss["popup__close"]}>
                     <i className='icon-clear'></i>
                  </div>
               </div>
            </div>

{/* сообщения */}

            <div className={scss["aside__popup-body"]}>

               {myMassagesElement}

               {partnerMassagesElement}

               <div className={scss["popup-body__snippet"]}>
                  <div className={scss["popup-body__stage"]}>
                     <div className={scss["popup-body__dot-typing"]}></div>
                  </div>
               </div>

               <div className={scss["clearfix"]}></div>
            </div>



{/* сообщения*/}


            <div className={scss["aside__popup-footer"]}>
               <div className={scss["popup-footer__card"]}>
                  <div className={scss["popup-footer__form-group"]}>
                     <input
                        type='popup-footer__text'
                        placeholder='Start typing..'
                        className={scss["popup-footer__form-control"]}
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
   );
};
export default AsidePopup;
