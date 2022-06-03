import React from "react";

function ListItem() {
    return (
        <div>
            <div className={!editMode?'anotcontent':'displaynone anotcontent'}>{content}</div>
            <textarea className={editMode?'anotcontent':'displaynone anotcontent'} type='text' 
            value={content} onInput={e => onEdit(note.title, e.target.value, note)} placeholder='Conteúdo'/>
        </div>
    );
}

export default ListItem;