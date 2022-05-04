/* This component is used for querying the client's name after succesful recording. 
   It is also used for informing the user of invalid recording attempt, when it receives dataOk prop as false. */

import React from "react"
import { useState } from "react"
import Button from "./Button"

const Popup = props => {
    const [cname, setCname] = useState('')

    return (
        <div className="popup-box">
            <div className="box">
                {props.dataOk ? (
                    <>  <p><strong>Recording successful!</strong><br /><br />
                        Insert client name and click <strong>Ok</strong> to continue or click <strong>Cancel</strong> to discard current recording and return to main screen.</p>
                        <label>Client name: </label>
                        <input type="text" value={cname} onChange={(e) => setCname(e.target.value)} /><br /><br />
                        <Button
                            className={'btn2'}
                            color='grey'
                            text='Ok'
                            onClick={() => {
                                props.handlePopup(true, cname)
                            }} />
                        <Button
                            className={'btn2'}
                            color='grey'
                            text='Cancel'
                            onClick={() => {
                                props.handlePopup(false, cname)
                            }} />
                    </>
                ) : (
                    <><p>Invalid recording, hit <strong>Ok</strong> to try again!</p><br /><br />
                        <Button
                            className={'btn2'}
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

export default Popup