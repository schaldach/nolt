import React, { useState } from "react";

function SimpleImage({storageurl}) {
    const [imageOpen, setHover] = useState(false)
    return (
        <>
        <div className="wholeimage favanot" onClick={() => setHover(true)}>
        <div>
            <img className="imgpicture" alt={storageurl.split('/')[1]} src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
            <svg xmlns="http://www.w3.org/2000/svg" className="zoomicon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            </div>
        </div>
        <div className={imageOpen?"disabledpage":'displaynone'} onClick={() => setHover(false)}>
            <div className="imgwrapper">
                <img className="imgpicture entireimage" alt={storageurl.split('/')[1]} src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
                <svg xmlns="http://www.w3.org/2000/svg" className="zoomicon zoomout" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
            </div>
        </div>
        </>
    );
}

export default SimpleImage;