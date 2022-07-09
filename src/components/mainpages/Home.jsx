import React from "react"
import { useEffect } from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import { supabase } from "./notetypes/SupaBaseClient"
import { useState } from "react"
import FavoriteNote from "./smallcomponents/FavoriteNote"
import FavoriteList from "./smallcomponents/FavoriteList"
import FavoriteLink from "./smallcomponents/FavoriteLink"

function Home({visualclass, notesNumbers, onPageChange}) {
    const [favoriteNotes, addNotes] = useState([])
    const [favoriteLists, addLists] = useState([])
    const [favoriteLinks, addLinks] = useState([])

    useEffect(()=> {
        syncFavorites()
    }, [])

    async function syncFavorites(){
        const user = supabase.auth.user()
        const { data } = await supabase
            .from('notas')
            .select('*')
            .is('favorite', true)
            .eq('userid', user.id)
        addNotes(data)
    }

    function textToWrite(){
        let text
        if(notesNumbers['notas']+notesNumbers['listas']+notesNumbers['links']){
            text = `Você possui ${notesNumbers['notas']} Notas, ${notesNumbers['listas']} Listas e
            ${notesNumbers['links']} Links. Aproveite como quiser!`
        }
        else{
            text = 'Parece que você ainda não possui anotações. Deseja começar a utilizar o site?'
        }
        return text
    }

    return(
        <div className={visualclass+'home'}>
            <SecondTitle titlecontent='Home'/>
            <div className="secondtext">
                {textToWrite()}
            </div>
            <button onClick={() => onPageChange('notetypes')} className='homebutton'></button>
            <div className='favtitle'>Notas 
            <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteNotes.map(note => 
                <FavoriteNote key={Math.random()} title={note.title} content={note.content}/>
                )}
                <div className='empty'>{!favoriteNotes.length?'Não há notas favoritas.':''}</div>
            </div>
            <div className='favtitle'>Listas 
            <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteLists.map(list => 
                <FavoriteList key={Math.random()} title={list.title} content={list.content}/>
                )}
                <div className='empty'>{!favoriteLists.length?'Não há listas favoritas.':''}</div>
            </div>
            <div className='favtitle'>Links 
            <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteLinks.map(link => 
                <FavoriteLink key={Math.random()} name={link.name} href={link.href}/>
                )}
                <div className='empty'>{!favoriteLinks.length?'Não há links favoritos.':''}</div>
            </div>
        </div>
    )
}

export default Home;