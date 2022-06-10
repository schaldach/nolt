import React from "react";

function DropdownMenu({editMode, startEdit, viewMode, startView, onDelete}) {
    return (
        <div className={viewMode?'functionality menuview':'functionality'}>
            <button className='dropdownbutton functionbutton'></button>
            <button onClick={() => startEdit(!editMode)} className='functionbutton'>
            </button>
            <button onClick={() => startView(!viewMode)} className='functionbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke={viewMode?'':'currentColor'} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
            <button onClick={onDelete} className='deletebutton functionbutton'>x</button>
        </div>
    )
}

export default DropdownMenu;