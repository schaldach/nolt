function AnotationDate({calendar, onSchedule, editMode}) {
    return (
        <div className={calendar?'datebox':'displaynone'}>
            <div>{'Tempo'} restantes</div>
            <div className={editMode?'dateinputs':'displaynone'}>
            <div><input type='date'></input></div>
            <div><input type='time'></input></div>
            </div>
        </div>
    );
}

export default AnotationDate;