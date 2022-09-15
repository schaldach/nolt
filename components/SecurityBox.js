function SecurityBox({onDelete, onCancel, boxVisible}) {
    function actualDelete(){
        onCancel()
        onDelete()
    }
    
    return (
        <div className={boxVisible?'disabledpage':'displaynone'}>
        <div className="securitybox">
            <svg xmlns="http://www.w3.org/2000/svg" className="securitysvg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#e61e1e">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>Você quer <span className="redtext">deletar</span> esta anotação?</div>
            <div className="minortext">Essa ação não pode ser desfeita.</div>
            <div className="securitybuttons"><button onClick={onCancel} className="confirmbutton">Não, quero manter</button><button onClick={actualDelete} className="cancelbutton">Sim, quero deletar</button></div>
        </div>
        </div>
    );
}

export default SecurityBox;