import React from 'react';

const PartnerMassages = (props) => {
    return (
        <div className="popup-body__message-partner">
            <div className="popup-body__message-content-partner">
                {props.message.content}
            </div>
            <div className="popup-body__date-break">
                {props.message.created_at}
            </div>
        </div>
    );
};

export default PartnerMassages;
