import Link from "next/link";

function AnotationHomeDisplay({children, type, number, changeCurrentPage, changeCurrentNote}) {
    function changeBoth(){
        changeCurrentPage(type)
        if(type!=='grupos'){changeCurrentNote(type)}
    }
    return (
        <Link href={'/'+type}>
        <div className="homeanotation" onClick={changeBoth}>
            <div className="homenumber">{number}</div>
            <div className="hometype">{children}{type}</div>
        </div>
        </Link>
    )
}

export default AnotationHomeDisplay;