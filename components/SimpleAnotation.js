import AnotationDate from "./AnotationDate";

function SimpleAnotation({title, content, date, calendar, small}) {
    return (
        <div className={small?'anot favanot smallanot':'anot favanot'}>
            <div className='anottitle'>{title}</div>
            <div className='anotcontent'>{content}</div>
            <AnotationDate calendar={calendar} date={date}></AnotationDate>
        </div>
    );
}

export default SimpleAnotation;