import {useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { fetchUsers } from '../../store/users';
import UserLabel from '../UserLabel';
import './AllUsers.css' 

const AllUsers = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users))
    useEffect(()=>{
        dispatch(fetchUsers())   
    }, [])

    return (
        <div className='userslist'>
            {/* <h1>Add Friend</h1>
            {users.map(friend => <UserLabel key={friend.id} friend={friend}/>)} */}
        </div>
    )
}

export default AllUsers;