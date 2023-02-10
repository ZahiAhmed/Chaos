import { useDispatch, useSelector } from "react-redux";
import {useState} from "react";
import { addFriend } from "../../store/friendships";
import './AddFriendPage.css'

const AddFriendPage = (props) => {
    const dispatch = useDispatch()
    const [friend, setFriend] = useState('')
    const attemptFriendship = useSelector(state => state.friendship)
    const handleRequest = e => {
        e.preventDefault()
        return (
            dispatch(addFriend({user_id: props.userId, friend_id: friend })))
    }
    return (
        <div className="addfriendpage">
            <h1>ADD FRIEND</h1>
            <p>You can add a friend with their Discord tag</p>
            {/* <p>{errors.map(error => <span key={error}> {error}</span>)}</p> */}
            <form className="addfriendform" onSubmit={handleRequest}>
            <input
            type="text" value={friend} 
            onChange={e=> (setFriend(e.target.value))}
            placeholder="Enter a username#id"
            className="request"
            />
            <span><button type="submit">Send Friend Request</button></span>
            </form>
            </div>
    )
}

export default AddFriendPage;
