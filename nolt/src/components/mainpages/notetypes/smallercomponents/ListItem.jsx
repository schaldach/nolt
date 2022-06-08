import React, { useRef } from "react";

function ListItem({index, text, editMode, itemEdit, itemFocus, handleTextFocus, changeFocus}) {
    const searchInput = useRef(null)

    if(itemFocus==index){
        searchInput.current.focus()
    }

    return(
        <div>
            <div className={!editMode?'':'displaynone'}>{text}</div>
            <textarea onFocus={() => changeFocus(index)} onKeyDown={(e) => handleTextFocus(e)} 
            ref={searchInput} className={editMode?'listarea':'displaynone listarea'} type='text'
            value={text} onInput={e => itemEdit(e.target.value, index)}/>
        </div>
    );
}

export default ListItem;