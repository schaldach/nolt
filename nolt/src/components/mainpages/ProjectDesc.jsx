import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import SectionDescription from "./smallcomponents/SectionDescription";

function ProjectDesc({visualclass}) {
    function textToWrite(){
        return 'Este projeto é baseado em um antigo projeto Lead, que tem como principal objetivo ajudar a organizar notas, listas e links pessoais, trazendo todos estes elementos em um lugar só. Desta forma, nunca foi tão fácil organizar as pequenas e grandes coisas da sua vida pessoal.'
    }

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Projeto'/>
            <SectionDescription paragraph={textToWrite()}/>
        </div>
    )
}

export default ProjectDesc;