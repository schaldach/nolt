import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"
import SecondTitle from "../components/SecondTitle";
import InfoBox from "../components/InfoBox";
import useInterval from "../components/UseInterval"
import Group from '../components/Group'
import AddButton from "../components/AddButton"

function Groups({user, propNotes, propLists, propLinks, propGroups, setGroups}) {
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(false)
    const allGroups = propGroups?propGroups:[]
    const allNotes = propNotes
    const allLists = propLists
    const allLinks = propLinks

    useInterval(() => {syncGroups(allGroups, true)},2500)

    async function addGroup(){
        conectionMade(2)
        setChange(true)
        let newGroup = { title: '', notes:[], lists:[], links:[], favorite:false, userid:user.id }
        const bla = await supabase
            .from('grupos')
            .insert([newGroup])
            .then(() => syncGroups(allGroups))
    }

    function onEdit(group, title, notes, lists, links){
        setChange(true)
        let newGroups = [...allGroups]
        const index = newGroups.indexOf(group)
        newGroups[index].title = title
        newGroups[index]['notes'] = notes
        newGroups[index]['lists'] = lists
        newGroups[index]['links'] = links
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

    async function onDelete(groupId){
        let lastconection = successAnimation
        conectionMade(2)
        let newGroups = allGroups.filter(group => group.id!==groupId)
        const eba = await supabase
            .from('grupos')
            .delete()
            .match({ id: groupId })
            .then( () => {
                conectionMade(lastconection)
            })
        setGroups(newGroups)
    }

    async function syncGroups(groups, auto){
        if(!user||!changed&&auto){return}
        conectionMade(2)
        const bla = await supabase
            .from('grupos')
            .upsert(groups)
            .then( async () => {
                if(!auto){
                    const { data } = await supabase
                        .from('grupos')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return a.id-b.id})
                    setGroups(formattedData)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Grupos'/>
            <InfoBox successAnimation={successAnimation}/>
            </div>
            <div className="displaygroups">
                <AddButton addAnotation={addGroup}/>
                {allGroups.map(group => 
                    <Group allNotes={allNotes} allLists={allLists} allLinks={allLinks} 
                    notes={allNotes.filter(note => group['notes'].indexOf(note.id)!==-1)} 
                    lists={allLists.filter(list => group['lists'].indexOf(list.id)!==-1)}
                    links={allLinks.filter(link => group['links'].indexOf(link.id)!==-1)}
                    favorite={group.favorite} title={group.title} key={group.id} group={group} 
                    onDelete={() => onDelete(group.id)} onFavorite={() => onFavorite(group)} onEdit={onEdit}/>
                )}
            </div>
        </div>
    )
}

export default Groups;