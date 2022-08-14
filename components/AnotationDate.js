function AnotationDate({calendar, onSchedule, editMode, date, note}) {
    const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
    const currentTime = new Date(date)
    const formattedDate = currentTime.getFullYear()+'-'+String(currentTime.getMonth()+1).padStart(2, '0')+'-'+String(currentTime.getDate()).padStart(2, '0')
    const formattedMonthDay = formattedDate.split('-')[2]+'/'+formattedDate.split('-')[1]
    const weekDay = days[currentTime.getDay()]

    function convertDate(localdate){
        if(!localdate){return ''}
        let newDate = new Date(localdate)
        let utcDate = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(),
            newDate.getUTCDate(), newDate.getUTCHours(),
            newDate.getUTCMinutes(), newDate.getUTCSeconds())
        return utcDate
    }

    return (
        <div className={calendar?'datebox':'displaynone'}>
            <div>{`${weekDay}, ${formattedMonthDay}`}</div>
            <div className={editMode?'':'displaynone'}>
            <input onInput={e => onSchedule(note, convertDate(e.target.value))} value={formattedDate} type='date'></input>
            </div>
        </div>
    );
}

export default AnotationDate;