function ActionPopup({deleteType, initialTime}) {
    function LoadBar(){
    }
    return (
        <div className={deleteType?'red popup':'green popup'}>
            <div>{`Nota ${deleteType?'deletada':'adicionada'}.`}</div>
            <div className="progressbar"><div className="dynamicbar"></div></div>
        </div>
    );
}

export default ActionPopup;