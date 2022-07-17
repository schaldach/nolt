import React from "react";

function SimpleListItem({text, complete}) {
    return (
        <div className={complete?'greentext listitem':'listitem'}>{text}
            <span>
            <button className={complete?'functionbutton checksvg':'functionbutton'}>
                <svg xmlns="http://www.w3.org/2000/svg" className={complete?'dropdownsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={!complete?'dropdownsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </span>
        </div>
    )
}

export default SimpleListItem;