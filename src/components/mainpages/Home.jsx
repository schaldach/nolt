import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"

function Home({visualclass, notesNumbers, onPageChange}) {
    function textToWrite(){
        let text
        if(notesNumbers['notas']+notesNumbers['listas']+notesNumbers['links']){
            text = `Você possui ${notesNumbers['notas']} Notas, ${notesNumbers['listas']} Listas e
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
            <div className="secondtext">
                {textToWrite()}
            </div>
            <button onClick={() => onPageChange('notetypes')} className='homebutton'></button>
        </div>
    )
}

export default Home;