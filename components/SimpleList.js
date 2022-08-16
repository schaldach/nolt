import SimpleListItem from "./SimpleListItem"

function SimpleList({title, content, small, filtered}) {
    return (
        <div className={small?'anot favanot smallanot':'anot favanot'}>
        <div className='anottitle'>{title}</div>
        <div className='anotcontent listcontent'>
            {content.map(item =>
                !filtered||!item.complete?<SimpleListItem key={Math.random()} text={item.text} complete={item.complete}/>:''
            )}
        </div>
        </div>
    );
}

export default SimpleList;