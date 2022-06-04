import React from "react";

function ListItem({index, text, editMode, itemEdit, list}) {
    return(
        <div>
            <div className={!editMode?'':'displaynone'}>{text}</div>
            <textarea className={editMode?'':'displaynone'} type='text'
            value={text} onInput={e => itemEdit(e.target.value, list, index)}/>
        </div>
    );
}

export default ListItem;