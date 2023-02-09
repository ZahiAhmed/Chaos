import {useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { fetchFriends } from "../../store/friendships";
import Friendlabel from "./Friendlabel";
import './Friendlist.css'


const Friendlist = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => Object.values(state.friendships))
    useEffect(() => {
        dispatch(fetchFriends())
    },[])

    return (
        <div className='friendlist'>
            {friends.map(friend => <Friendlabel key={friend.friendId} friend={friend}/>)}
        </div>
    )
}

export default Friendlist