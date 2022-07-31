import SimpleAnotation from "./SimpleAnotation";
import SimpleList from "./SimpleList";
import SimpleLink from "./SimpleLink";

function Group({notes, lists, links}) {
    return (
        <div className="group">
            {notes.map(note => {
                <SimpleAnotation/>
            })}
            {lists.map(list => {
                <SimpleList/>
            })}
            {links.map(link => {
                <SimpleLink/>
            })}
        </div>
    );
}

export default Group;