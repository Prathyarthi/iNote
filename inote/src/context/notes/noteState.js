import React from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
    const state = {
        "name": "Amogh",
        "class": "5"
    }
    return (
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}
