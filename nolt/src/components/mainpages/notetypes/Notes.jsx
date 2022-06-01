import React, { useState } from "react"
import Anotation from "./smallercomponents/Anotation"

function Notes({visualnote}) {
    const[allNotes,addNote] = useState([])

    function addAnotation(){
        
    }

    return (
        <div className={visualnote}>
            <button>+</button>
            {allNotes.map(note => 
                <Anotation edit={note.editmode}></Anotation>
            )}
        </div>
    )
}

export default Notes;