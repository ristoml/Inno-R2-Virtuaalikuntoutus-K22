import React from "react";
import { useState } from "react"
import Button2 from "./Button2";

const Popup = props => {
    const [cname, setCname] = useState('')

    return (
        <div className="popup-box">
            <div className="box">
                {props.dataOk ? (
                    <>  <p>Recording successful!<br></br> 
                        Insert client name and click <strong>Ok</strong> to continue or click <strong>Cancel</strong> to discard current recording and return to main screen.</p>
                        <label>Client name: </label>
                        <input type="text" value={cname} onChange={(e) => setCname(e.target.value)} /><br></br>
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
                    <><p>Invalid recording, hit <strong>Ok</strong> to try again!</p>
                        <Button2
                            color='grey'
                            text='Ok'
                            onClick={() => {
                                props.handlePopup(false, '')
                            }} />
                    </>
                )}               
            </div>
        </div>
    );
};

export default Popup;