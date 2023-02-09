const ADD_FRIEND = 'friendships/ADD_FRIEND'
const REMOVE_FRIEND ='friendships/REMOVE_FRIEND'
const RECEIVE_FRIENDS = 'friendships/RECEIVE_FRIENDS'

const add = (friendship) => ({
    type: ADD_FRIEND,
    friendship
})

const removeFriend = (friendshipId) => ({
    type: REMOVE_FRIEND,
    friendshipId
})

const receiveFriends = (friendships) => ({
    type: RECEIVE_FRIENDS,
    friendships
})

export const unfriend = (friendshipId) => async dispatch => {
    const response = await fetch(`/api/friendships/${friendshipId}`, {
        method: "DELETE"
    })

    dispatch(removeFriend(friendshipId))
}

export const fetchFriends = () => async dispatch => {
    const response = await fetch(`/api/friendships`)
    const friendships = await response.json()
    dispatch(receiveFriends(friendships))
}

export const addFriend = (friendship) => async dispatch => {
    const response = await fetch(`/api/friendships`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendship)
    })

    const data = await response.json()
    dispatch(add(data))
}

const friendshipsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case RECEIVE_FRIENDS:
            return{...state, ...action.friendships}
        case REMOVE_FRIEND:
            delete newState[action.friendshipId]
            return newState
        case ADD_FRIEND:
            newState[action.friendship.id] = action.friendship
            return newState
        default:
            return state
    }
    
}

export default friendshipsReducer;
