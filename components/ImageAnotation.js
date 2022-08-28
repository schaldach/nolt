import React, { useState } from "react";
import SecurityBox from "./SecurityBox";

function ImageAnotation({storageurl, favorite, onDelete, id, onFavorite, image}) {
    const [boxVisible, setBox] = useState(false)
    const [imageOpen, setHover] = useState(false)
    return (
        <>
        <div className="wholeimage">
        <div>
            <img className="imgpicture" onClick={() => setHover(true)} alt={storageurl.split('/')[1]} src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
            <svg xmlns="http://www.w3.org/2000/svg" className="zoomicon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
        </div>
        <div className="outermenu">
            <button onClick={() => setBox(true)} className='deletelinkbutton'>
                <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <button onClick={() => onFavorite(image)} className='favoritelink'>
                <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill={favorite?'currentColor':'none'} viewBox="0 0 24 24" stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            </button>
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
        <SecurityBox onDelete={() => onDelete(id, storageurl)} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </>
    );
}

export default ImageAnotation;