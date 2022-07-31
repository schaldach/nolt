import SimpleAnotation from "./SimpleAnotation";
import SimpleList from "./SimpleList";
import SimpleLink from "./SimpleLink";
import SecurityBox from '../components/SecurityBox'
import { useState } from "react";

function Group({notes, lists, links, title}) {
    const [editMode, setEdit] = useState(false)
    return (
        <div className="group">
            <div className={!editMode?"grouptitle":'displaynone'}>{title}</div>
            <input className={editMode?"grouptitle":'displaynone'} placeholder={Título} value={title}></input>
            <div className="specificgroup">
                {notes.map(note => {
                    <SimpleAnotation title={note.title} content={note.content}/>
                })}
            </div>
            <div className="specificgroup">
                {lists.map(list => {
                    <SimpleList title={list.title} content={list.content}/>
                })}
            </div>
            <div className="specificgroup">
                {links.map(link => {
                    <SimpleLink href={link.href} name={link.name}/>
                })}
            </div>
        </div>
    );
}

export default Group;