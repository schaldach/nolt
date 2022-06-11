import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"

function ProjectDesc({visualclass}) {

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Projeto'/>
            <div className="secondtext">
            Este projeto é baseado em um antigo projeto Lead, que tem como principal objetivo ajudar a 
            organizar notas, listas e links pessoais, trazendo todos estes elementos em um lugar só.<br/><br/> 
            Desta forma, nunca foi tão fácil organizar as pequenas e grandes coisas da sua vida pessoal.
            </div>
        </div>
    )
}

export default ProjectDesc;