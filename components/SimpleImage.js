import React, { useState } from "react";

function SimpleImage({storageurl}) {
    const [imageOpen, setHover] = useState(false)
    return (
        <>
        <div className="wholeimage favanot" onClick={() => setHover(true)}>
            <img className="imgpicture" alt={storageurl.split('/')[1]} src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
        </div>
        <div className={imageOpen?"disabledpage":'displaynone'} onClick={() => setHover(false)}>
            <img className="imgpicture entireimage" alt={storageurl.split('/')[1]} src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
        </div>
        </>
    );
}

export default SimpleImage;