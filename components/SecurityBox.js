function SecurityBox() {
    return (
        <div className="securitybox">
            <div>Você quer <span>deletar</span> esta anotação? Essa ação não pode ser desfeita.</div>
            <div><button>Cancelar</button><button>Confirmar</button></div>
            <div><button></button>Não mostrar isso novamente</div>
        </div>
    );
}

export default SecurityBox;