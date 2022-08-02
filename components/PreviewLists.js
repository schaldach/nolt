import PreviewBox from "./PreviewBox";
import SimpleList from "./SimpleList";

function PreviewLists({lists, allLists, showLists, listsBox, type}) {
    return (
        <PreviewBox type={type} isShown={listsBox} exit={() => showLists(false)}>
            {allLists.map(list => 
                <SimpleList key={list.id} id={list.id} content={list.content} title={list.title}></SimpleList>
            )}
        </PreviewBox>
    );
}

export default PreviewLists;