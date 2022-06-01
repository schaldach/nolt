import React from "react"

function SmallerAnotation({linkcontent, linkname}) {
    return (
        <a href={linkcontent} target='_blank'>
            <div>{linkname}</div>
            <input placeholder='Link'/>
        </a>
    )
}

export default SmallerAnotation;