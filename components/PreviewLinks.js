import PreviewBox from "./PreviewBox";
import SimpleLink from "./SimpleLink";

function PreviewLinks({allLinks, showLinks, linksBox}) {
    return (
        <PreviewBox isShown={linksBox} exit={() => showLinks(false)}>
            {allLinks.map(link => 
                <SimpleLink name={link.name} href={link.href}></SimpleLink>
            )}
        </PreviewBox>
    );
}

export default PreviewLinks;