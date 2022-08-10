import AnotationDate from "./AnotationDate";

function SimpleAnotation({title, content, date, calendar}) {
    return (
        <div className='anot favanot'>
            <div className='anottitle'>{title}</div>
            <div className='anotcontent'>{content}</div>
            <AnotationDate calendar={calendar} date={date}></AnotationDate>
        </div>
    );
}

export default SimpleAnotation;