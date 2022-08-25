import PreviewBox from "./PreviewBox";
import SimpleImage from "./SimpleImage";

function PreviewImages({addImage, images, allImages, showImages, imagesBox, type}) {
    return (
        <PreviewBox type={type} isShown={imagesBox} exit={() => showImages(false)}>
            {allImages.map(image =>
                <div key={image.id} onClick={() => addImage(image)} className='previewnote'>
                    <SimpleImage storageurl={image.storageurl}></SimpleImage>
                    <svg xmlns="http://www.w3.org/2000/svg" className={images.indexOf(image)!==-1?'previewcheckedsvglink':'displaynone'} fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </PreviewBox>
    );
}

export default PreviewImages;