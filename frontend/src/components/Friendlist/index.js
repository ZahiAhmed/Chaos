import {useEffect, useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { fetchFriends } from "../../store/friendships";
import UserLabel from "../UserLabel";
import './Friendlist.css'


const Friendlist = () => {
    const dispatch = useDispatch()    
    const storeFriends = useSelector(state=> Object.values(state.friendships))
    const [friends, setFriends] = useState(storeFriends)
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
            dispatch(fetchFriends()).then(()=>{
            setIsLoading(false)
        })
        setFriends(storeFriends.filter(friend => friend.username.toLowerCase().includes(searchValue.toLowerCase())))
    },[searchValue, isLoading, dispatch])
    
    return (
        <div className='friendlist'>
            <h1> Friends </h1>
            <input type="search" placeholder='Search' value={searchValue}
                onChange={e => (setSearchValue(e.target.value))}
            />
            <br/>
            <br/>
            {friends.map(friend => <UserLabel key={friend.id} user={friend}/>)}
        </div>
    )
}

export default Friendlist
