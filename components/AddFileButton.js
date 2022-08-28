function AddFileButton({setImage}) {
    return (
        <label className="addanotation" onChange={e => setImage(e.target.files[0])} onClick={e => e.target.value=null} htmlFor="formId">
            <input id="formId" type='file' accept='image/*' className="displaynone"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        </label>
    )
}

export default AddFileButton;