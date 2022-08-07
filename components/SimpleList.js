import SimpleListItem from "./SimpleListItem"

function SimpleList({title, content}) {
    return (
        <div className='anot favanot'>
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