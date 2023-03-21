import { createConsumer } from "@rails/actioncable";

let wsUrl;
if (process.env.NODE_ENV !== "production") 
  wsUrl = "ws://localhost:5000/cable";
else
  wsUrl = "wss://chaoslive.herokuapp.com/cable";

export default createConsumer(wsUrl);