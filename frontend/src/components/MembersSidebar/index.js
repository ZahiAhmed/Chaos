import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {fetchMembers} from "../../store/members"
import MembersLabel from '../MemberLabel'
import './MembersSidebar.css'

const MembersSidebar = () => {
    
    const dispatch = useDispatch()
    const {serverId} = useParams();
    const members = useSelector(state => state.members ? Object.values(state.members) : [])


    useEffect(() => {
        dispatch(fetchMembers(serverId))
    },[serverId])

    return(
        <aside className='server-members'>
            {members.map((member, i) => <MembersLabel key={i} member={member}/>)}
        </aside>

    )
}

export default MembersSidebar;