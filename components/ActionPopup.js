function ActionPopup({noteType, deleteType}) {
    function LoadBar(){
    }
    return (
        <div className={deleteType?'red popup':'green popup'}>
            <div>{`${noteType} ${deleteType?'deletada':'adicionada'}.`}</div>
            <div className="progressbar"><div className="dynamicbar"></div></div>
        </div>
    );
}

export default ActionPopup;