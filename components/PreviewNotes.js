import PreviewBox from "./PreviewBox";
import SimpleAnotation from "./SimpleAnotation";

function PreviewNotes({notes, allNotes, showNotes, notesBox, type}) {
    return (
        <PreviewBox type={type} isShown={notesBox} exit={() => showNotes(false)}>
            {allNotes.map(note => 
                <SimpleAnotation key={note.id} id={note.id} content={note.content} title={note.title}></SimpleAnotation>
            )}
        </PreviewBox>
    );
}

export default PreviewNotes;