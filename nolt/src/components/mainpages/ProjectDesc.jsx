import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"

function ProjectDesc({visualclass}) {
    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Projeto'/>
        </div>
    )
}

export default ProjectDesc;