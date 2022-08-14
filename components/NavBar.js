import React, { useState } from "react"
import Link from "next/link"
import DarkModeButton from "./DarkModeButton"

function NavBar({darkMode, setDarkMode}) {
    const [currentNote, changeCurrentNote] = useState('notas')
    const [currentPage, changeCurrentPage] = useState('home')

    function dropLink(type){
        changeCurrentPage(type)
        changeCurrentNote(type)
    }
    
    return (
        <div className='navbar'>
            <div className="titulo">nolt</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="responsiveImg" fill="none" viewBox="0 0 24 24" stroke="var(--color4)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <div className='sections'>
                <Link href='/home'>
                <div onClick={() => changeCurrentPage('home')} className={currentPage==='home'?'navbar-select contentselected':'navbar-select'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="navbarsvg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </div>
                </Link>
                <div className="navbarwrapper">
                <Link href={'/'+currentNote} >
                    <div className='contentselection' onClick={() => changeCurrentPage(currentNote)}>
                        <div className={currentPage==='notas'||currentPage==='listas'||currentPage==='links'?'navbar-select contentselected':'navbar-select'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={currentNote==='notas'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className={currentNote==='listas'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className={currentNote==='links'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolutesvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        </div>
                    </div>
                </Link>
                <div className='dropdowns'>
                    <div className="dropdownswrapper">
                    <Link href='/notas'><button onClick={() => dropLink('notas')} className='dropdownitem droptop'>Notas</button></Link>
                    <Link href='/listas'><button onClick={() => dropLink('listas')} className='dropdownitem'>Listas</button></Link>
                    <Link href='/links'><button onClick={() => dropLink('links')} className='dropdownitem dropbottom'>Links</button></Link>
                    </div>
                </div>
                </div>
                <Link href='/grupos'>
                <div onClick={() => changeCurrentPage('grupos')} className={currentPage==='grupos'?'navbar-select contentselected':'navbar-select'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="navbarsvg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                </div>
                </Link>
                <Link href='/profile'>
                <div onClick={() => changeCurrentPage('profile')} className={currentPage==='profile'?'navbar-select contentselected':'navbar-select'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="navbarsvg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                </Link>
            </div>
            <div className='dark-wrapper'><DarkModeButton setDarkMode={setDarkMode} darkMode={darkMode}/></div>
        </div>
    )
}

export default NavBar;