import React from "react"
import Link from "next/link"
import DarkModeButton from "./DarkModeButton"

function NavBar({darkMode, setDarkMode, currentNote, changeCurrentNote, currentPage, changeCurrentPage, user}) {
    const profileUser = user?user:''
    
    function dropLink(type){
        changeCurrentPage(type)
        changeCurrentNote(type)
    }
    
    return (
        <div className='navbar'>
            <div className="titulo">nolt</div>
            <div className='sections'>
                <Link href='/home'>
                <div onClick={() => changeCurrentPage('home')} className={currentPage==='home'?'navbar-select selected-item':'navbar-select'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='home'?'navbarsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='home'?'navbarsvg':'displaynone'} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </div>
                </Link>
                <div className="navbarwrapper">
                <Link href={'/'+currentNote}>
                    <div className='contentselection' onClick={() => changeCurrentPage(currentNote)}>
                        <div className={currentPage===currentNote?'navbar-select selected-item':'navbar-select'}>
                        {currentNote==='notas' && 
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='notas'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='notas'?"navbarsvg":"displaynone"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </>
                        }
                        {currentNote==='listas' && 
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='listas'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='listas'?"navbarsvg":"displaynone"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </>
                        }
                        {currentNote==='links' &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='links'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                                <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='links'?"navbarsvg":"displaynone"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                            </svg>
                        </>
                        }
                        {currentNote==='fotos' &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='fotos'?"navbarsvg":"displaynone"} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='fotos'?"navbarsvg":"displaynone"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </>
                        }
                        {currentNote[0].toUpperCase() + currentNote.substring(1)}
                        <svg xmlns="http://www.w3.org/2000/svg" className='absolutesvg' fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        </div>
                    </div>
                </Link>
                <div className='dropdowns'>
                    <div className="dropdownswrapper">
                    <Link href='/notas'><button onClick={() => dropLink('notas')} className={currentNote==='notas'?'dropdownitem droptop selecteddropdownitem':'dropdownitem droptop'}>Notas</button></Link>
                    <Link href='/listas'><button onClick={() => dropLink('listas')} className={currentNote==='listas'?'dropdownitem selecteddropdownitem':'dropdownitem'}>Listas</button></Link>
                    <Link href='/links'><button onClick={() => dropLink('links')} className={currentNote==='links'?'dropdownitem selecteddropdownitem':'dropdownitem'}>Links</button></Link>
                    <Link href='/fotos'><button onClick={() => dropLink('fotos')} className={currentNote==='fotos'?'dropdownitem dropbottom selecteddropdownitem':'dropdownitem dropbottom'}>Fotos</button></Link>
                    </div>
                </div>
                </div>
                <Link href='/grupos'>
                <div onClick={() => changeCurrentPage('grupos')} className={currentPage==='grupos'?'navbar-select selected-item':'navbar-select'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={currentPage==='grupos'?'navbarsvg':'displaynone'} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={currentPage!=='grupos'?'navbarsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    Grupos
                </div>
                </Link>
                <Link href='/profile'>
                <div onClick={() => changeCurrentPage('profile')} className={currentPage==='profile'?'navbar-select selected-item':'navbar-select'}>
                    <div className={currentPage==='profile'?"profilepicwrapper whiteborder":'profilepicwrapper'}>
                    {profileUser.avatar_url?<img className="imgpicture" src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${user.avatar_url}`}/>:<img className="navbarsvg" src={"https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/avatars/user_placeholder.png"}/>}
                    </div>
                    Perfil
                </div>
                </Link>
            </div>
            <div className='dark-wrapper'><DarkModeButton setDarkMode={setDarkMode} darkMode={darkMode}/></div>
        </div>
    )
}

export default NavBar;