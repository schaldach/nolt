function AnotationCard({children, anotation, description}) {
    return (
        <div className="card">
            {children}
            <div>
                <div className="cardanotation">{anotation}</div>
                <div className="carddescription">{description}</div>
            </div>
        </div>
    );
}

export default AnotationCard;