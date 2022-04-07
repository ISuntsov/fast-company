import React from "react";

const Quailitie = (props) => {
    return (
        <span className={`badge bg-${props.color}`}>
            {props.name}
        </span>
    )
}

export default Quailitie