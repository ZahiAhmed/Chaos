import {useEffect, useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { fetchFriends } from "../../store/friendships";
import UserLabel from "../UserLabel";
import './Friendlist.css'


const Friendlist = ({hidden}) => {
    const dispatch = useDispatch()    
    const friends = useSelector(state=> Object.values(state.friendships))
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
            dispatch(fetchFriends(searchValue)).then(()=>{
            setIsLoading(false)
        })
    },[searchValue, isLoading, hidden])
    
    return (
        <div className='friendlist'>
            <input id="search-friend" type="search" placeholder='Search' value={searchValue}
                onChange={e => (setSearchValue(e.target.value))}
            />
            <br/>
            <br/>
            {friends.map((friend, i) => <UserLabel key={i} user={friend}/>)}
        </div>
    )
}

export default Friendlist
