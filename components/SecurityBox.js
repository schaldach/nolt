function SecurityBox({onDelete, onCancel, boxVisible}) {
    function actualDelete(){
        onCancel()
        onDelete()
    }
    return (
        <div className={boxVisible?'disabledpage':'displaynone'}>
        <div className="securitybox">
            <svg xmlns="http://www.w3.org/2000/svg" className="securitysvg" fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>Você quer <span className="redtext">deletar</span> esta anotação?</div>
            <div className="minortext">Essa ação não pode ser desfeita.</div>
            <div className="securitybuttons"><button onClick={onCancel} className="cancelbutton">Cancelar</button><button onClick={actualDelete} className="confirmbutton">Confirmar</button></div>
        </div>
        </div>
    );
}

export default SecurityBox;