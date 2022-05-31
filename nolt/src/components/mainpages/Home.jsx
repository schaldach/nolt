import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import SectionDescription from "./smallcomponents/SectionDescription";

function Home({visualclass, notesNumbers, onPageChange}) {
    function textToWrite(){
        let text = ''
        if(notesNumbers['notes']+notesNumbers['lists']+notesNumbers['links']){
            text = `Você possui ${notesNumbers['notes']} Notas, ${notesNumbers['lists']} Listas e
            ${notesNumbers['links']} Links. Aproveite como quiser!`
        }
        else{
            text = 'Parece que você ainda não possui anotações. Deseja começar a utilizar o site?'
        }
        return text
    }

    return(
        <div className={visualclass+'home'}>
            <SecondTitle titlecontent='Home'/>
            <SectionDescription paragraph={textToWrite()}/>
            <button onClick={() => onPageChange('notetypes')} className='homebutton'>Leve-me para lá →</button>
        </div>
    )
}

export default Home;