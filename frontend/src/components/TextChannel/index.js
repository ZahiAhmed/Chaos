import consumer from "../consumer";
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, fetchMessages, createMessage, destroyMessage } from '../../store/messages';
import { fetchTextChannel } from '../../store/textChannels';
import { receiveUser } from '../store/users';
import Message from './Message';

const TextChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [usersInChannel, setUsersInChannel] = useState({});

  const { channelId } = useParams();
  const messages = useSelector(getMessages(roomId));
  const sessionUser = useSelector(state => state.session.user)
  const channel = useSelector(state => state.textChannels[textChannelId]);

  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevChannel = useRef(null);
  const numMessages = useRef(0);

  const activeMessageId = parseInt(history.location.hash.slice(1));
  const usersInChannelArray = Object.values(usersInChannel);

  // Scroll to message selected from mentions menu
  useEffect (() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  // Scroll to new messages as they come in
  useEffect(() => {
    if (channelId === prevChannel.current && numMessages.current < messages.length) {
      // Remove any hash values from the URL
      if (history.location.hash)
        history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, channelId, history]);

  // Effect to run when entering a room
  useEffect(() => {
    dispatch(fetchTextChannel(channelId)).then(() => {
      if (activeMessageRef.current) {
        scrollToMessage();
      } else {
        scrollToBottom();
      }
      prevChannel.current = channelId;
    });
  }, [channelId, dispatch]);

  const scrollToMessage = () => {
    activeMessageRef.current.focus();
    activeMessageRef.current.scrollIntoView();
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const handleSubmit = e => {
    e.preventDefault();
    createMessage({ body, channelId, senderId: sessionUser.id }).then(({ message }) => {
      dispatch(receiveMessage(message));
      // dispatch(receiveUser(user));
      setBody('');
    });
  };

  const handleDelete = messageId => {
    destroyMessage(messageId).then(() => {
      removeMessage(messageId);
    });
  };

  return (
    <>
      <section className='channel home-section'>
        <h1>{channel?.name}</h1>

        <ul ref={messageUlRef}>
          {messages.map(message => (
            <li
              key={message.id}
              ref={activeMessageId === message.id ? activeMessageRef : null}
              tabIndex={-1}
            >
              <Message {...message} />
              {message.authorId === currentUserId && (
                <button
                  className='btn-delete'
                  onClick={() => handleDelete(message.id)}
                >
                  x
                </button>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={body.split('\n').length}
            onChange={e => setBody(e.target.value)}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={body}
          />
          <div className='message-controls'>
            <div>
            </div>
            <button className='btn-primary' disabled={!body}>
              Send Message
            </button>
          </div>
        </form>
      </section>
      <section className='online-users home-section'>
        <h2>In Room</h2>
        <ul >
          {usersInRoomArray.map(({ id, username, reaction }) => (
            <li key={id} className={currentUserId === id ? 'current' : ''}>
                <span>{username}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );




  // ...
  // Effect to run when entering a room
  useEffect(() => {
    // ...

    // Add the following lines to the end of the `useEffect` to create a
    // subscription:
    const subscription = consumer.subscriptions.create(
      {
        channel: "TextChannels",
        id: textChannelId,
      },
      {
        // received: message => {
        //   console.log('Received message: ', message);
        // }
        received: ({type, message, user }) => {
          switch(type){
            case 'RECEIVE_MESSAGE':
              dispatch(receiveMessage(message));
              dispatch(receiveUser(user));
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(id))
              break;
            default:
              console.log('Unhandled broadcast: ', type);
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [textChannelId, dispatch]); // This line is already present in the file
  // ...
};
  
  export default TextChannel;
  