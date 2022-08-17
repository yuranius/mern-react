import React from "react"
import "./MessagePage.css"


export const MessagePage = () => {
    return (
        <div className="#">
            <div className="col s12">
                <h2 className="header">Сообщения</h2>
            </div>

            <div className="row block-message">
                <div className="col s6 offset-s6">
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto aspernatur at commodi consequuntur, cum dolorum ea eum illum numquam placeat reiciendis sequi sit temporibus veritatis. Iure possimus quidem voluptate. am a very simple card. I am good at containing small bits of information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ul className="collapsible block-user">
                <li className="collection-item">
                    <div className="collapsible-header">
                        <i className="material-icons">filter_drama</i>
                        First
                        <span className="new badge">4</span></div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                </li>
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">place</i>
                        Second
                        <span className="badge">1</span></div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                </li>
            </ul>
        </div>
    )
}