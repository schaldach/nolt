import React from "react"
import { useEffect } from "react"
import SecondTitle from "../components/SecondTitle"
import Link from 'next/link'
import { supabase } from "../utils/supabaseClient"
import { useState } from "react"
import FavoriteNote from "../components/SimpleAnotation"
import FavoriteList from "../components/SimpleList"
import FavoriteLink from "../components/SimpleLink"
import SimpleGroup from "../components/SimpleGroup"

function Home({user}) {
    const [favoriteNotes, addNotes] = useState([])
    const [favoriteLists, addLists] = useState([])
    const [favoriteLinks, addLinks] = useState([])
    const [favoriteGroups, addGroups] = useState([])
    const [configsShown, showConfigs] = useState(false)
    const [showType, changeShow] = useState('anotations')
    const [favorites, setFavorites] = useState(true)
    const [settable, releaseLocalStorage] = useState(false)
    const [allNumbers, setNumbers] = useState({notas:0,listas:0,links:0, grupos:0})

    useEffect(()=> {
        syncFavorites()
    }, [user])

    useEffect(() => {
        let storedFavorites = JSON.parse(localStorage.getItem('favorites'))
        let storedType = localStorage.getItem('types')
        if(storedFavorites===null||storedFavorites===undefined){storedFavorites=favorites}
        if(storedType===null||storedType===undefined){storedType=showType}
        setFavorites(storedFavorites)
        changeShow(storedType)
        releaseLocalStorage(true)
    }, [])
    
    useEffect(() => {
        if(settable){
            localStorage.setItem('favorites', JSON.stringify(favorites))
            localStorage.setItem('types', showType)
        }
    }, [showType, favorites])

    async function syncNotetype(notetype){
        const { data, count } = await supabase
            .from(notetype)
            .select('*', {count: 'exact'})
            .eq('userid', user.id)
        data.sort((a,b) => {
            if(notetype==='notas'){
                if(!a.calendar&&!b.calendar){return a.id - b.id}
                if(!a.calendar||!b.calendar){return a.calendar?-1:1}
                return new Date(a.date) - new Date(b.date)
            }
            return a.id-b.id
        })
        setNumbers(prevState => {return{...prevState, [notetype]:count}})
        return(data)
    }

    async function syncFavorites(){
        if(!user){return}
        addNotes(await syncNotetype('notas'))
        addLists(await syncNotetype('listas'))
        addLinks(await syncNotetype('links'))
        addGroups(await syncNotetype('grupos'))
    }

    function areThereFavorites(anotations){
        let value = false
        anotations.forEach(anotation => {
            if(anotation.favorite){value = true}
        })
        return value
    }

    function textToWrite(){
        let text
        if(allNumbers.notas+allNumbers.listas+allNumbers.links+allNumbers.grupos){
            text = `Você possui ${allNumbers.notas} Nota${allNumbers.notas!==1?'s':''}, ${allNumbers.listas} Lista${allNumbers.listas!==1?'s':''},
            ${allNumbers.links} Link${allNumbers.links!==1?'s':''} e ${allNumbers.grupos} Grupo${allNumbers.grupos!==1?'s':''}. Aproveite como quiser!`
        }
        else{
            text = 'Parece que você ainda não possui anotações. Deseja começar a utilizar o site?'
        }
        return text
    }

    function buttonClasses(arg, favoriteMode){
        if(!configsShown){
            return 'displaynone'
        }
        if(favoriteMode){
            if(arg){
                if(favorites){
                    return 'chosenstyle'
                }
            }
            else{
                if(!favorites){
                    return 'chosenstyle'
                }
            }
        }
        if(showType===arg){
            return 'chosenstyle'
        }
    }

    return(
        <div className='home'>
            <SecondTitle titlecontent='Home'/>
            <div className="secondtext">{user?`Bem vindo ${user.username}!`:''}<br/><br/>{textToWrite()}</div>
            <Link href={'/notas'}>
            <button className='homebutton'>
            <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            </button>
            </Link>
            <div className="displaychoice">
                <div>
                <button className={buttonClasses('anotations')} onClick={() => changeShow('anotations')}><svg xmlns="http://www.w3.org/2000/svg" className="homesvg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg></button>
                <button className={buttonClasses('groups')} onClick={() => changeShow('groups')}><svg xmlns="http://www.w3.org/2000/svg" className="homesvg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" /><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" /><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" /></svg></button>
                </div>
                <button onClick={() => showConfigs(!configsShown)}><svg xmlns="http://www.w3.org/2000/svg" className={!configsShown?"homesvg":'displaynone'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg><svg xmlns="http://www.w3.org/2000/svg" className={configsShown?"homesvg":'displaynone'} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg></button>
                <div>
                <button className={buttonClasses(false, true)} onClick={() => setFavorites(false)}><svg xmlns="http://www.w3.org/2000/svg" className="homesvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></button>
                <button className={buttonClasses(true, true)} onClick={() => setFavorites(true)}><svg xmlns="http://www.w3.org/2000/svg" className="homesvg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></button>
                </div>
            </div>
            <div className={showType==='anotations'?'':'displaynone'}>
            <div className='grouptitle favtitle'>Notas 
            <svg xmlns="http://www.w3.org/2000/svg" className={favorites?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteNotes.map(note => 
                note.favorite||!favorites?<FavoriteNote small={note.small} calendar={note.calendar} date={note.date} key={Math.random()} title={note.title} content={note.content}/>:''
                )}
                <div className={favorites?'empty':'displaynone'}>{areThereFavorites(favoriteNotes)?'':'Não há notas favoritas.'}</div>
                <div className={!favorites?'empty':'displaynone'}>{favoriteNotes.length?'':'Não há notas.'}</div>
            </div>
            <div className='grouptitle favtitle'>Listas 
            <svg xmlns="http://www.w3.org/2000/svg" className={favorites?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteLists.map(list => 
                list.favorite||!favorites?<FavoriteList small={list.small} key={Math.random()} title={list.title} content={list.content}/>:''
                )}
                <div className={favorites?'empty':'displaynone'}>{areThereFavorites(favoriteLists)?'':'Não há listas favoritas.'}</div>
                <div className={!favorites?'empty':'displaynone'}>{favoriteLists.length?'':'Não há listas.'}</div>
            </div>
            <div className='grouptitle favtitle'>Links 
            <svg xmlns="http://www.w3.org/2000/svg" className={favorites?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
                <div className='displayanotations displayfavorites'>
                {favoriteLinks.map(link => 
                link.favorite||!favorites?<FavoriteLink key={Math.random()} name={link.name} href={link.href}/>:''
                )}
                <div className={favorites?'empty':'displaynone'}>{areThereFavorites(favoriteLinks)?'':'Não há links favoritos.'}</div>
                <div className={!favorites?'empty':'displaynone'}>{favoriteLinks.length?'':'Não há links.'}</div>
            </div>
            </div>
            <div className={showType==='groups'?'':'displaynone'}>
                <div className='displayanotations displayanotationsgroups'>
                {favoriteGroups.map(group =>
                group.favorite||!favorites?<SimpleGroup key={Math.random()}
                notes={favoriteNotes.filter(note => group['notes'].indexOf(note.id)!==-1)} 
                lists={favoriteLists.filter(list => group['lists'].indexOf(list.id)!==-1)}
                links={favoriteLinks.filter(link => group['links'].indexOf(link.id)!==-1)}
                title={group.title} favorite={favorites}/>:''
                )}
                <div className={favorites?'empty':'displaynone'}>{areThereFavorites(favoriteGroups)?'':'Não há grupos favoritos.'}</div>
                <div className={!favorites?'empty':'displaynone'}>{favoriteGroups.length?'':'Não há grupos.'}</div>
            </div>
            </div>
        </div>
    )
}

export default Home;
