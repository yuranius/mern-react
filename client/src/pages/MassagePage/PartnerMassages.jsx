export const PartnerMassage = (props) => {
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

