import PreviewBox from "./PreviewBox";
import SimpleList from "./SimpleList";

function PreviewLists({addList, lists, allLists, showLists, listsBox, type}) {
    return (
        <PreviewBox type={type} isShown={listsBox} exit={() => showLists(false)}>
            {allLists.map(list => 
                <div key={list.id} onClick={() => addList(list)} className={lists.indexOf(list)!==-1?"previewnote checkpreview":'previewnote'}>
                    <SimpleList small={list.small} content={list.content} title={list.title}></SimpleList>
                    <svg xmlns="http://www.w3.org/2000/svg" className={lists.indexOf(list)!==-1?'previewcheckedsvg':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="var(--color5)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </PreviewBox>
    );
}

export default PreviewLists;