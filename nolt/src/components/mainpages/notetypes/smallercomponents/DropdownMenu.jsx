import React from "react";

function DropdownMenu({ editMode, startEdit, viewMode, startView, onDelete }) {
    return (
        <div className={viewMode ? 'functionality menuview' : 'functionality'}>
            <button className='dropdownbutton functionbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <button onClick={() => startEdit(!editMode)} className='functionbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke={editMode ? 'var(--color3)' : 'currentColor'} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button onClick={() => startView(!viewMode)} className='functionbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' fill="none" viewBox="0 0 24 24" stroke={viewMode ? 'var(--color3)' : 'currentColor'} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
            <button onClick={onDelete} className='deletebutton functionbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default DropdownMenu;