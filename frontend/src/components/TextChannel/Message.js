import { useDispatch } from "react-redux";
import { updateMessage, deleteMessage } from "../../store/messages";
import "./Message.css";

const Message = ({message}) => {
  const dispatch = useDispatch();
  return (
    <li className="message">
      <p>
        {message.sender} <span>{message.createdAt}</span>
      </p>
      <p>
        {message.body}{" "}
        <span>
          {" "}
          {message.createdAt !== message.updatedAt ? "(edited)" : null}
        </span>
      </p>
    </li>
  );
};

export default Message;
