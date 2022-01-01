import React from "react";

const Title = ({text, name}) => {
    return(
        <h2 className={name}>{text}</h2>
    )
}

export default Title