import {useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { fetchFriends } from "../../store/friendships";
import UserLabel from "../UserLabel";
import './Friendlist.css'


const Friendlist = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => Object.values(state.friendships))
    useEffect(() => {
        dispatch(fetchFriends())
    },[])

    return (
        <div className='friendlist'>
            <h1> Friends </h1>
            {friends.map(friend => <UserLabel key={friend.friendId} friend={friend}/>)}
        </div>
    )
}

export default Friendlist