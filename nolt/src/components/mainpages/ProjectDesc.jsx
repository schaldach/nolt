import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import SectionDescription from "./smallcomponents/SectionDescription";

function ProjectDesc({visualclass}) {
    function textToWrite(){
        return 'O projeto Nolt baseado em um antigo projeto Lead, que tem como principal objetivo ajudar a organizar notas, listas e links pessoais, trazendo todos estes elementos em um lugar só.'
    }

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Projeto'/>
            <SectionDescription paragraph={textToWrite()}/>
        </div>
    )
}

export default ProjectDesc;