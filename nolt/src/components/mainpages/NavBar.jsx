import React from "react"

function NavBar({onPageChange, onNoteChange, pagesVisible, currentNote, darkMode, setDarkMode}) {
    function manageShown(pageReference){
        let classes = 'navbar-select'
        classes += pagesVisible[pageReference]?' contentselected':''
        return classes
    }

    function manageDarkMode(){
        let src = darkMode?'moondarktheme':'moonlighttheme'
        src += '.jpg'
        return src
    }

    return (
        <div className='navbar'>
            <div className='titulo'>nolt.</div>
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
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className='darkmode'>
                <img src={manageDarkMode()}/>
            </button>
        </div>
    )
}

export default NavBar;