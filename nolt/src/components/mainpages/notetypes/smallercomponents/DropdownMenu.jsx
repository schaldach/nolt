function DropdownMenu({editMode, startEdit, viewMode, startView, dropped, startDrop, onDelete}) {
    return (
        <div className='functionality'>
            <button onClick={() => startDrop(!dropped)} 
            className={dropped?'dropdownbutton dropped functionbutton':'dropdownbutton functionbutton'}></button>
            <div className={dropped?'dropmenu':'displaynone'}>
                <button onClick={() => startEdit(!editMode)} 
                className={editMode?' greenbutton editimg functionbutton':'editimg functionbutton'}></button>
                <button onClick={() => startView(!viewMode)} 
                className={viewMode?' greenbutton viewimg functionbutton':'viewimg functionbutton'}></button>
                <button onClick={onDelete} className='deletebutton functionbutton'>x</button>
            </div>
        </div>
    )
}

export default DropdownMenu;