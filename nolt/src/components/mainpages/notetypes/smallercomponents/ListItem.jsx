import React from "react";

function ListItem({index, text, editMode, onEdit}) {
    let formatedText = JSON.stringify(index)+'. '+text
    return(
        <div>
            <div className={!editMode?'':'displaynone'}>{formatedText}</div>
            <textarea className={editMode?'':'displaynone'} type='text' 
            value={formatedText} onInput={e => onEdit(note.title, e.target.value, note)}/>
        </div>
    );
}

export default ListItem;