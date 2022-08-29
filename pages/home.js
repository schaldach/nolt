import React from "react"
import { useEffect } from "react"
import SecondTitle from "../components/SecondTitle"
import { useState } from "react"
import SimpleGroup from "../components/SimpleGroup"
import AnotationHomeDisplay from "../components/AnotationHomeDisplay"

function Home({user, propNotes, propLists, propLinks, propImages, propGroups, changeCurrentPage, changeCurrentNote}) {
    const [configsShown, showConfigs] = useState(false)
    const [showType, changeShow] = useState('anotations')
    const [favorites, setFavorites] = useState(true)
    const [settable, releaseLocalStorage] = useState(false)
    const allNotes = propNotes?propNotes:[]
    const allLists = propLists?propLists:[]
    const allLinks = propLinks?propLinks:[]
    const allImages = propImages?propImages:[]
    const allGroups = propGroups?propGroups:[]

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

    function areThereFavorites(anotations){
        let value = false
        anotations.forEach(anotation => {
            if(anotation.favorite){value = true}
        })
        return value
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
            <div className="secondtext">{user?`Bem vindo ${user.username}!`:''}</div>
            <div className="displaynumbers">
                <AnotationHomeDisplay type='notas' number={allNotes.length} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage}><svg xmlns="http://www.w3.org/2000/svg" className="homeanotationsvg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg></AnotationHomeDisplay>
                <AnotationHomeDisplay type='listas' number={allLists.length} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage}><svg xmlns="http://www.w3.org/2000/svg" className="homeanotationsvg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg></AnotationHomeDisplay>
                <AnotationHomeDisplay type='links' number={allLinks.length} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage}><svg xmlns="http://www.w3.org/2000/svg" className="homeanotationsvg" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" /><path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg></AnotationHomeDisplay>
                <AnotationHomeDisplay type='fotos' number={allImages.length} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage}><svg xmlns="http://www.w3.org/2000/svg" className="homeanotationsvg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg></AnotationHomeDisplay>
                <AnotationHomeDisplay type='grupos' number={allGroups.length} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage}><svg xmlns="http://www.w3.org/2000/svg" className="homeanotationsvg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" /><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" /><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" /></svg></AnotationHomeDisplay>
            </div>
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
            <div className={showType==='anotations'?'displayanotations displaylinks':'displaynone'}>
            <SimpleGroup type='main' title='Notas' favorite={favorites} lists={[]} links={[]} images={[]} notes={favorites?allNotes.filter(note=>note.favorite):allNotes}/>
            <SimpleGroup type='main' title='Listas' favorite={favorites} notes={[]} links={[]} images={[]} lists={favorites?allLists.filter(list=>list.favorite):allLists}/>
            <SimpleGroup type='main' title='Links' favorite={favorites} lists={[]} notes={[]} images={[]} links={favorites?allLinks.filter(link=>link.favorite):allLinks}/>
            <SimpleGroup type='main' title='Fotos' favorite={favorites} lists={[]} links={[]} notes={[]} images={favorites?allImages.filter(image=>image.favorite):allImages}/>
            </div>
            <div className={showType==='groups'?'displayanotations displaylinks':'displaynone'}>
                {allGroups.map(group =>
                group.favorite||!favorites?<SimpleGroup key={Math.random()}
                notes={allNotes.filter(note => group['notes'].indexOf(note.id)!==-1)} 
                lists={allLists.filter(list => group['lists'].indexOf(list.id)!==-1)}
                links={allLinks.filter(link => group['links'].indexOf(link.id)!==-1)}
                images={allImages.filter(image => group['images'].indexOf(image.id)!==-1)}
                title={group.title} favorite={favorites}/>:''
                )}
                <div className={favorites?'empty':'displaynone'}>{areThereFavorites(allGroups)?'':'Não há grupos favoritos.'}</div>
                <div className={!favorites?'empty':'displaynone'}>{allGroups.length?'':'Não há grupos.'}</div>
            </div>
        </div>
    )
}

export default Home;
