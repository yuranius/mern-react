export const MyMassage = (props) => {
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
