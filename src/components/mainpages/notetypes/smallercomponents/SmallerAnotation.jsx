import React from "react"

function SmallerAnotation({linkcontent, linkname, onDelete, id}) {
    return (
        <>
            <div className='littlelink'>
                <img className='linkimage' src={`http://www.google.com/s2/favicons?sz=64&domain_url=${linkcontent}`} />
                <a className='linktext' href={linkcontent} target='_blank' rel='noreferrer'>{linkname}</a>
                <button onClick={() => onDelete(id)} className='deletelinkbutton'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
        </>
    )
}

export default SmallerAnotation;