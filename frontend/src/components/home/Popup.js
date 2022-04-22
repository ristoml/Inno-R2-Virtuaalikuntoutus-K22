import React from "react";
import { useState } from "react"
import Button2 from "./Button2";

const Popup = props => {
    const [cname, setCname] = useState('')

    return (
        <div className="popup-box">
            <div className="box">
                {props.dataOk ? (
                    <>
                        <label>Client name: </label>
                        <input type="text" value={cname} onChange={(e) => setCname(e.target.value)} />
                        <Button2
                            color='grey'
                            text='Ok'
                            onClick={() => {
                                props.handlePopup(true, cname)
                            }} />
                        <Button2
                            color='grey'
                            text='Cancel'
                            onClick={() => {
                                props.handlePopup(false, cname)
                            }} />
                    </>
                ) : (
                    <><p>Invalid recording, try again!</p>
                        <Button2
                            color='grey'
                            text='Ok'
                            onClick={() => {
                                props.handlePopup(false, '')
                            }} />
                    </>
                )}

                {/* {props.content} */}
            </div>
        </div>
    );
};

export default Popup;