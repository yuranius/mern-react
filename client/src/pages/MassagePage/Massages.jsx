import React, {useEffect, useRef} from "react";
import "./Massages.css"
import MyMassages from "./MyMassages";
import PartnerMassages from "./PartnerMassages";
import defaultAvatar from  "../../image/user-img.webp"
import {API_URL} from "../../config";


let Massages = (props) => {

   {/*Для автоматического скролла вниз*/}
   const divRef = useRef(null);


   useEffect(()=> {
      {/*Для автоматического скролла вниз*/}
      divRef.current.scrollIntoView({ behavior: 'smooth' });
   },[props.messages, props.currentUser])


   return (
       <>
       <div className="col s12">
          <h2 className="header">Сообщения</h2>
       </div>
       <div className="message-wrap">

          <div className="row">
             <ul className="row__list">
                {props.collocuters.map( coll => {
                   return <li
                       key={coll.id}
                       className={coll.id === props.currentUser ? "row__item yellow darken-4 z-depth-4 hoverable" : "row__item z-depth-1 hoverable"}
                       onClick={()=> props.userHandler(coll)}
                   >
                     <span>{coll.login}</span>
                      {coll.id === props.currentUser && <i className="thin material-icons right">border_color</i>}
                   </li>
                })}
             </ul>
          </div>
          <div className="aside__popup">
             <div className="aside__popup-wrap">
                <div className="aside__popup-header">
                   <div className="popup__card">
                      <figure className="popup__avatar">
                         <img src={props.avatar != null ? `${API_URL + props.avatar}` : defaultAvatar} alt=""/>
                      </figure>
                      <h5 className="popup__text-primary">
                         {props.collocuterLogin}
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

                   {props.messages.map( m => {
                      if (m.user_from_id === props.userId) {
                         return <MyMassages key={m.id} message={m}/>
                      } else {
                         return <PartnerMassages key={m.id} message={m}/>
                      }
                      
                   })}
                   {/*Для автоматического скролла вниз*/}
                   <div ref={divRef} />
                   {/*режим печатания*/}
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
                             placeholder='Введите сообщение...'
                             className="popup-footer__form-control"
                             value={props.value}
                             onChange={props.massageHandler}
                             onKeyDown={props.massageHandler}
                         />
                         <i
                             className='icon-send'
                             onClick={props.addMassage}
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
export default Massages;
