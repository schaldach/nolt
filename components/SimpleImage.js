function SimpleImage({storageurl}) {
    return (
        <div className="wholeimage favanot">
        <img className="imgpicture" src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${storageurl}`}></img>
        </div>
    );
}

export default SimpleImage;