import React from "react";

function DropdownMenu({editMode, startEdit, viewMode, startView, onDelete}) {
    return (
        <div className='functionality'>
            <button 
            className='dropdownbutton functionbutton'></button>
            <button onClick={() => startEdit(!editMode)} 
            className={editMode?' greenbutton editimg functionbutton':'editimg functionbutton'}></button>
            <button onClick={() => startView(!viewMode)} 
            className={viewMode?' greenbutton viewimg functionbutton':'viewimg functionbutton'}></button>
            <button onClick={onDelete} className='deletebutton functionbutton'>x</button>
        </div>
    )
}

export default DropdownMenu;