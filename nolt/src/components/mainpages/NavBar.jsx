import React from "react"

function NavBar({onPageChange, onNoteChange, pagesVisible, currentNote}) {
    function manageShown(pageReference){
        let classes = 'navbar-select'
        classes += pagesVisible[pageReference]?' contentselected':''
        return classes
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
                            <button className='dropdownitem' onClick={() => onNoteChange('notes')} 
                            value='notes'>Notas</button>
                            <button className='dropdownitem' onClick={() => onNoteChange('lists')}
                            value='lists'>Listas</button>
                            <button className='dropdownitem' onClick={() => onNoteChange('links')}
                            value='links'>Links</button>
                        </div>
                    </div>
                </div>
                <div className={manageShown('project')} onClick={() => onPageChange('project')}>Projeto</div>
                <div className={manageShown('contact')} onClick={() => onPageChange('contact')}>Contato</div>
            </div>
            <button className='darkmode'>Claro</button>
        </div>
    )
}

export default NavBar;