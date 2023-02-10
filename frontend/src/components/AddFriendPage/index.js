import { useDispatch } from "react-redux";
import {useState} from "react";
import { addFriend } from "../../store/friendships";
import './AddFriendPage.css'

const AddFriendPage = (props) => {
    const dispatch = useDispatch()
    const [friend, setFriend] = useState('')
    const handleRequest = e => {
        e.preventDefault()
        return (
            dispatch(addFriend({user_id: props.userId, friend_id: friend }))
        )
    }
    return (
        <div className="addfriendpage">
            <h1>ADD FRIEND</h1>
            <p>You can add a friend with their Discord username or id</p>
            <form className="addfriendform" onSubmit={handleRequest}>
            <input
            type="text" value={friend} 
            onChange={e=> (setFriend(e.target.value))}
            placeholder="Enter a Username or id"
            className="request"
            />
            <span><button type="submit">Send Friend Request</button></span>
            </form>
        </div>
    )
}

export default AddFriendPage;
