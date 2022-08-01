import PreviewBox from "./PreviewBox";
import SimpleAnotation from "./SimpleAnotation";

function PreviewNotes({allNotes, showNotes, notesBox}) {
    return (
        <PreviewBox isShown={notesBox} exit={() => showNotes(false)}>
            {allNotes.map(note => 
                <SimpleAnotation key={note.id} id={note.id} content={note.content} title={note.title}></SimpleAnotation>
            )}
        </PreviewBox>
    );
}

export default PreviewNotes;