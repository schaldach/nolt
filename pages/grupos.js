import { useState } from "react";
import SecondTitle from "../components/SecondTitle";
import InfoBox from "../components/InfoBox";
import Group from '../components/Group'

function Groups({user}) {
    const [animation, startAnimation] = useState(false)
    const [allGroups, setGroups] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)
    const [allNotes, addNote] = useState([])
    const [allLists, addList] = useState([])
    const [allLinks, addLink] = useState([])

    function addGroup(){
        setChange(true)
        let newGroup = { title: 'Novo grupo', notes:[], lists:[], links:[], id: Math.floor(Math.random() * 9999999999), isNew:true, favorite:false}
        setGroups([...allGroups, newGroup])
        conectionMade(1)
    }

    function onEdit(group, title){
        setChange(true)
        let newGroups = [...allGroups]
        const index = newGroups.indexOf(group)
        newGroups[index].title = title
        setGroups(newGroups)
        conectionMade(1)
    }

    function onFavorite(group){
        setChange(true)
        let newGroups = [...allGroups]
        const index = newGroups.indexOf(group)
        newGroups[index].favorite = !newGroups[index].favorite
        setGroups(newGroups)
        conectionMade(1)
    }

    async function syncGroups(groups, click, auto){

    }

    function pulseAnimation() {
        startAnimation(true)
        syncGroups(allGroups, true)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Grupos'/>
            <InfoBox/>
            </div>
            <div className='flex'>
                <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                    <button className='savebutton' onClick={pulseAnimation}>Salvar Grupos</button>
                </div>
                <div>
                    <div className={sucessAnimation===0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={sucessAnimation===1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={sucessAnimation===2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizando...
                    </div>
                </div>
            </div>
            <div className="displaygroups">
                <button className="addgroup" onClick={addGroup}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="navbarsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allGroups.map(group => {
                    <Group notes={group.notes} lists={group.lists} links={group.links}
                    title={group.title} key={Math.random()}/>
                })}
            </div>
        </div>
    )
}

export default Groups;