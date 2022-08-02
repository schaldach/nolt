import React, { useEffect, useRef } from "react";

function ListItem({ index, text, editMode, itemEdit, itemFocus, handleTextFocus, changeFocus, complete }) {
    const searchInput = useRef(null)

    useEffect(() => {
        if (itemFocus === index) {
            searchInput.current.focus()
            let v = searchInput.current.value
            searchInput.current.value = ''
            searchInput.current.value = v
        }
    }, [itemFocus])

    function divClass(){
        if(editMode){
            return 'displaynone'
        }
        if(complete){
            return 'greentext listitem'
        }
        else{return 'listitem'}
    }

    return (
        <div>
            <textarea onFocus={() => changeFocus(index)} onKeyDown={(e) => handleTextFocus(e)}
                ref={searchInput} className={editMode ? 'listarea' : 'displaynone listarea'} type='text'
                value={text} onInput={e => itemEdit(e.target.value, index)} />
            <div className={divClass()}>{text}
            <button className={complete?'functionbutton checksvg':'functionbutton removesvg'} onClick={() => itemEdit(text, index, !complete)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={complete?'dropdownsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={!complete?'dropdownsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ListItem;