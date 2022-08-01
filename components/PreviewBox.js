function PreviewBox({children, exit, isShown}) {
    return (
        <div className={isShown?"disabledpage":'displaynone'}>
            <div className="previewbox">
            <button className="exitpreview" onClick={exit}>
                <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {children}
            </div>
        </div>
    );
}

export default PreviewBox;