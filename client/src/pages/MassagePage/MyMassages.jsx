import React from 'react';

const MyMassages = (props) => {


    return (
        <div className="popup-body__message">
            <div className="popup-body__message-content">
                {props.message.content}
            </div>
            <div className="popup-body__date-break">
                {props.message.created_at}
            </div>
        </div>
    );
};

export default MyMassages;