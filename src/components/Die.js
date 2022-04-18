import React from "react";

const Die = (props) => {

    return(
        <>
            <div className={`die-square ${props.isHeld ? "held" : "not-held"}`} onClick={props.toggleHeldDice}>
                <span className="die-number">
                    {props.value}
                </span>
            </div>
        </>
    )
}

export default Die;
