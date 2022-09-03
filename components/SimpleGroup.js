import SimpleAnotation from './SimpleAnotation'
import SimpleLink from './SimpleLink';
import SimpleList from './SimpleList';
import SimpleImage from './SimpleImage';

function FavoriteGroup({notes, lists, links, images, title, favorite, type}) {
    return (
    <div className="group">
    <div className="grouptitle">
        <div>{title}</div>
        <svg xmlns="http://www.w3.org/2000/svg" className={favorite?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    </div>
    <div className={notes.length+lists.length+images.length?"specificgroup":'displaynone'}>
        {notes.map(note => 
            <SimpleAnotation small={note.small} date={note.date} calendar={note.calendar} key={note.id} title={note.title} content={note.content}/>
        )}
        {lists.map(list => 
            <SimpleList filtered={list.filtered} small={list.small} key={list.id} title={list.title} content={list.content}/>
        )}
        {images.map(image => 
            <SimpleImage storageurl={image.storageurl} key={image.id}/>
        )}
        </div>
        <div className={links.length?"specificgroup":'displaynone'}>
        {links.map(link => 
            <SimpleLink key={link.id} href={link.href} name={link.name}/>
        )}
        </div>
        <div className='empty'>{notes.length+lists.length+links.length+images.length?
        '':type==='main'?`Não há ${title.toLowerCase()}${favorite?title==='Links'?' favoritos':' favoritas':''}.`:'O grupo está vazio...'}</div>
    </div>

    );
}

export default FavoriteGroup;