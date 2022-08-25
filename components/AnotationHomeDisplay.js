import Link from "next/link";

function AnotationHomeDisplay({children, type, number, changeCurrentPage, changeCurrentNote}) {
    function changeBoth(){
        changeCurrentPage(type)
        if(type!=='grupos'){changeCurrentNote(type)}
    }
    return (
        <Link href={'/'+type}>
        <div className={!number?"homeanotation grayanotation":'homeanotation'} onClick={changeBoth}>
            <div className="homenumber">{number}</div>
            <div className="hometype">{children}{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        </div>
        </Link>
    )
}

export default AnotationHomeDisplay;