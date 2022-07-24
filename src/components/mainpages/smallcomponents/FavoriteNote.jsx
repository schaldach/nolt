import React from "react";

function FavoriteNote({title, content}) {
    return (
            <div className='anot favanot'>
                <div className='anottitle'>{title}</div>
                <div className='anotcontent'>{content}</div>
            </div>
    )
}

export default FavoriteNote;