function InfoBox({successAnimation}) {

    return (
        <>
        <button className='infobutton'>
            <svg xmlns="http://www.w3.org/2000/svg" className='infosvg' viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        </button>
        <div className="totalwidth"></div>
        <div className='infobox'>Não saia da página caso as anotações não estejam sincronizadas. Elas são salvas automaticamente a cada 5 segundos, caso hajam alterações.</div>
        <div className="totalwidth"></div>
        <div className={successAnimation===0?'status':'displaynone'}>
            <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Os dados estão sincronizados.
            </div>
            <div className={successAnimation===1?'status':'displaynone'}>
            <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Os dados não estão sincronizados.
            </div>
            <div className={successAnimation===2?'status':'displaynone'}>
            <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizando...
        </div>
        </>
        
    );
}

export default InfoBox;