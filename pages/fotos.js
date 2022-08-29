import React, { useEffect, useState } from "react";
import InfoBox from "../components/InfoBox";
import SecondTitle from "../components/SecondTitle";
import AddFileButton from "../components/AddFileButton";
import { supabase } from "../utils/supabaseClient"
import ImageAnotation from "../components/ImageAnotation";
import useInterval from "../components/UseInterval"
import EmptyAnotations from "../components/EmptyAnotations";

function Images({user, propImages, addImage, propGroups}) {
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(false)
    const [currentImage, setImage] = useState(null)
    const allImages = propImages?propImages:[]
    const allGroups = propGroups

    useInterval(() => {syncImages(allImages, true)}, 2000)

    useEffect(() => {
        if(currentImage){
            addAnotation()
            setImage(null)
        }
    }, [currentImage])

    async function addAnotation(){
        if(!user||!currentImage){return}
        let image_url = ''
        const {data, error} = await supabase.storage
            .from('images')
            .upload(`${Date.now()}_${currentImage.name}`, currentImage)
            if(error){
                console.log(error)
            }
            if(data){
                image_url = data.Key
            }
        let newImage = {'storageurl':image_url, userid:user.id}
        const eba = await supabase
            .from('images')
            .insert([newImage])
            .then(() => syncImages(allImages))
    }

    async function syncImages(images, auto){
        if(!user||!changed&&auto){return}
        conectionMade(2)
        const bla = await supabase
            .from('images')
            .upsert(images)
            .then( async () => {
                if(!auto){
                    const { data } = await supabase
                        .from('images')
                        .select('*')
                        .eq('userid', user.id)
                    data.sort((a,b) => {return a.id-b.id})
                    addImage(data)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    async function onDelete(imageId, imageUrl){
        conectionMade(2)
        let newGroups = [...allGroups]
        let groupChanges = false
        newGroups.forEach(group => {
            const indexFound = group['images'].indexOf(imageId)
            if(indexFound!==-1){
                groupChanges = true
                group['images'].splice(indexFound, 1)
            }
        })
        if(groupChanges){
            const legal = await supabase
                .from('grupos')
                .upsert(newGroups)
        }
        let newImages = allImages.filter(images => images.id!==imageId)
        const oba = await supabase.storage
            .from('images')
            .remove([imageUrl.split('/')[1]])
        const eba = await supabase
            .from('images')
            .delete()
            .match({ id: imageId })
            .then( () => {
                conectionMade(0)
            })
        addImage(newImages)
    }

    function onFavorite(image){
        setChange(true)
        let newImages = [...allImages]
        const index = newImages.indexOf(image)
        newImages[index].favorite = !newImages[index].favorite
        addImage(newImages)
        conectionMade(1)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Fotos'/>
            <InfoBox successAnimation={successAnimation}/>
            </div>
            <AddFileButton setImage={setImage}/>
            {allImages.length?
            <div className='displayanotations displayimgs displaylinks'>
                {allImages.map(image =>
                    <ImageAnotation image={image} key={image.id} id={image.id} storageurl={image.storageurl} 
                    favorite={image.favorite} onDelete={onDelete} onFavorite={onFavorite}/>
                )}
            </div>:
            <EmptyAnotations type='foto'/>
            }
        </div>
    );
}

export default Images;