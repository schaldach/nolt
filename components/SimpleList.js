import SimpleListItem from "./SimpleListItem"

function SimpleList({title, content, small}) {
    return (
        <div className={small?'anot favanot smallanot':'anot favanot'}>
        <div className='anottitle'>{title}</div>
        <div className='anotcontent listcontent'>
            {content.map(item =>
                <SimpleListItem key={Math.random()} text={item.text} complete={item.complete}></SimpleListItem>
            )}
        </div>
        </div>
    );
}

export default SimpleList;