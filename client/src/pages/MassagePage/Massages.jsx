import React, {useEffect, useState} from "react";
import "./Massages.css"
import {useDispatch} from "react-redux";
//import {MyMassage} from "./MyMassages";
//import {PartnerMassage} from "./PartnerMassages";




let Massages = (props) => {



   // let myMassagesElement = props.asideReducer.myMassages.map( m => (
   //     <MyMassage key={m.id} massage={m.massage} date={m.date} />
   // ));
   //
   // let partnerMassagesElement = props.asideReducer.partnerMassages.map ( pm => (
   //     <PartnerMassage key={pm.id} massage={pm.massage} date={pm.date} />
   // ));


   const [ active, setActive ] = useState(28)
   const onClick = (id) => {
      setActive(id)
   }




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
                       // onMouseEnter={() => someHandler(coll.id)}
                       // onMouseLeave={()=> someOtherHandler(coll.id)}
                       className={coll.id === active ? "row__item yellow darken-4 z-depth-4 hoverable" : "row__item z-depth-1 hoverable"}
                       onClick={()=>onClick(coll.id)}
                   >
                     <span>{coll.login}</span>
                      {coll.id === active && <i className="thin material-icons right">border_color</i>}
                   </li>
                })}
             </ul>
          </div>
          <div className="aside__popup">
             <div className="aside__popup-wrap">
                <div className="aside__popup-header">
                   <div className="popup__card">
                      <figure className="popup__avatar">
                         <img
                             src='https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg'
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

                   {/*{myMassagesElement}*/}

                   {/*{partnerMassagesElement}*/}
                   {/*{myMassagesElement}*/}

                   {/*{partnerMassagesElement}*/}
                   {/*{myMassagesElement}*/}

                   {/*{partnerMassagesElement}*/}
                   {/*{myMassagesElement}*/}

                   {/*{partnerMassagesElement}*/}
                   {/*{myMassagesElement}*/}

                   {/*{partnerMassagesElement}*/}

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
                             // value={props.asideReducer.newMassageText}
                             onChange={props.massageSend}
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
