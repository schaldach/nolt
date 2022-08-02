import PreviewBox from "./PreviewBox";
import SimpleAnotation from "./SimpleAnotation";

function PreviewNotes({addNote, notes, allNotes, showNotes, notesBox, type}) {
    return (
        <PreviewBox type={type} isShown={notesBox} exit={() => showNotes(false)}>
            {allNotes.map(note =>
                <div key={note.id} onClick={() => addNote(note)} className={notes.indexOf(note)!==-1?"previewnote checkpreview":'previewnote'}>
                    <SimpleAnotation id={note.id} content={note.content} title={note.title}></SimpleAnotation>
                    <svg xmlns="http://www.w3.org/2000/svg" className={notes.indexOf(note)!==-1?'previewcheckedsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="var(--color5)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </PreviewBox>
    );
}

export default PreviewNotes;