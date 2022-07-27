import React from 'react'

function SecondTitle({titlecontent, extra}) {
    return(
        <div className='titlesecond'>{titlecontent}<span className='coloredtext'>{extra}</span></div>
    )
}

export default SecondTitle;