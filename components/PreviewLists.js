import PreviewBox from "./PreviewBox";
import SimpleList from "./SimpleList";

function PreviewLists({allLists, showLists, listsBox}) {
    return (
        <PreviewBox isShown={listsBox} exit={() => showLists(false)}>
            {allLists.map(list => 
                <SimpleList key={list.id} id={list.id} content={list.content} title={list.title}></SimpleList>
            )}
        </PreviewBox>
    );
}

export default PreviewLists;