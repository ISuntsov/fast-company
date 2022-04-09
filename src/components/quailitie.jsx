import React from "react";

const Quailitie = ({quailitie}) => {
    return (
        <span className={`badge ms-1 bg-${quailitie.color}`}>
            {quailitie.name}
        </span>
    )
}

export default Quailitie

