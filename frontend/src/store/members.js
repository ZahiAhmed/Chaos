const RECEIVE_MEMBER = 'members/RECEIVE_MEMBER'
const RECEIVE_MEMBERS = 'members/RECEIVE_MEMBERS'
const REMOVE_MEMBER = 'members/REMOVE_MEMBER'

const receiveMember = (member) => ({
    type: RECEIVE_MEMBER,
    member
})

const receiveMembers = (members) => ({
    type: RECEIVE_MEMBERS,
    members
})

const removeMember = (memberId) => ({
    type: REMOVE_MEMBER,
    memberId
})

export const fetchMembers = (serverId) => async dispatch => {
    const response = await fetch(`/api/servers/${serverId}/members`)
    const members = await response.json();
    dispatch(receiveMembers(members))
}

export const createMember = (member) => async dispatch => {
    const response = await fetch('/api/members', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    })
    if(response.ok) {
        const member = await response.json();
        dispatch(receiveMember(member))
    }
}

export const deleteMember = (memberId) => async dispatch => {
    const response = await fetch(`/api/members/${memberId}`, {
        method: "DELETE"
    })
    dispatch(removeMember(memberId))
}

const membersReducer = (state={}, action) => {
    const newState = {...state}
    switch (action.type) {
        case RECEIVE_MEMBER:
            newState[action.member.id] = action.member
            return newState
        case RECEIVE_MEMBERS:
            return {...action.members}
        case REMOVE_MEMBER:
            delete newState[action.memberId]
            return newState
        default:
            return state
    }
}

export default membersReducer;




