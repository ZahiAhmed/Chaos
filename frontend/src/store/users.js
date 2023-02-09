const RECEIVE_USERS = 'users/RECEIVE_USERS'

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUsers = () => async dispatch => {
    const response = await fetch('api/users')
    const users = await response.json()
    dispatch(receiveUsers(users))
}

const usersReducer = (state = {}, action) => {
    // const newState = {...state}
    switch (action.type) {
        case RECEIVE_USERS:
            return {...state, ...action.users}
        default:
            return state
    }
}

export default usersReducer