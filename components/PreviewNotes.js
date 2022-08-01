import PreviewBox from "./PreviewBox";
import SimpleAnotation from "./SimpleAnotation";

function PreviewNotes({allNotes, showNotes, notesBox}) {
    return (
        <PreviewBox isShown={notesBox} exit={() => showNotes(false)}>
            {allNotes.map(note => 
                <SimpleAnotation content={note.content} title={note.title}></SimpleAnotation>
            )}
        </PreviewBox>
    );
}

export default PreviewNotes;