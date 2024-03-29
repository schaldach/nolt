function PreviewBox({children, exit, isShown, type}) {
    return (
        <div className={isShown?"disabledpage":'displaynone'}>
            <div className="previewbox">
            <div className="previewtitle">{type}&#160;<span className="previewsubtitle">&#40;selecione para adicionar ou remover do grupo&#41;</span></div>
            <button className="exitpreview" onClick={exit}>
                <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="previewflex">
            {children}
            </div>
            </div>
        </div>
    );
}

export default PreviewBox;