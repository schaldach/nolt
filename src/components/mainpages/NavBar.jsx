import React from "react"
import DarkModeButton from "./smallcomponents/DarkModeButton"

function NavBar({onPageChange, onNoteChange, pagesVisible, currentNote, darkMode, setDarkMode}) {
    function manageShown(pageReference){
        let classes = 'navbar-select'
        classes += pagesVisible[pageReference]?' contentselected':''
        return classes
    }

    return (
        <div className='navbar'>
            <div className='titulo'>nolt.</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="responsiveImg" fill="none" viewBox="0 0 24 24" stroke="var(--color4)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <div className='sections'>
                <div className={manageShown('home')} onClick={() => onPageChange('home')}>Home</div>
                <div className={manageShown('notetypes')} onClick={() => onPageChange('notetypes')}>
                    <div className='contentselection'>
                        <div className='dropbutton'>{currentNote}</div>
                        <div className='dropdowns'>
                            <button className='dropdownitem' onClick={() => onNoteChange('notas')} 
                            value='notes'>Notas</button>
                            <button className='dropdownitem' onClick={() => onNoteChange('listas')}
                            value='lists'>Listas</button>
                            <button className='dropdownitem' onClick={() => onNoteChange('links')}
                            value='links'>Links</button>
                        </div>
                    </div>
                </div>
                <div className={manageShown('project')} onClick={() => onPageChange('project')}>Projeto</div>
                <div className={manageShown('contact')} onClick={() => onPageChange('contact')}>Contato</div>
                <div className='dark-wrapper'><DarkModeButton setDarkMode={setDarkMode} darkMode={darkMode}/></div>
            </div>
        </div>
    )
}

export default NavBar;