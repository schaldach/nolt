import PreviewBox from "./PreviewBox";
import SimpleLink from "./SimpleLink";
import EmptyAnotations from "./EmptyAnotations";

function PreviewLinks({addLink, links, allLinks, showLinks, linksBox, type}) {
    return (
        <PreviewBox type={type} isShown={linksBox} exit={() => showLinks(false)}>
            {allLinks.length?
            allLinks.map(link =>
                <div key={link.id} onClick={() => addLink(link)} className='previewnote'>
                    <SimpleLink name={link.name} href={link.href}></SimpleLink>
                    <svg xmlns="http://www.w3.org/2000/svg" className={links.indexOf(link)!==-1?'previewcheckedsvglink':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            ):
            <EmptyAnotations type='link' preview='true'/>
            }
        </PreviewBox>
    );
}

export default PreviewLinks;