import React, { useRef, useEffect } from "react";
import Moment from "react-moment";


const Message = ({ msg, user1}) => {
 const el = useRef(null);

useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            
});
  return (
    <div>
       <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
    > 
      <div className={msg.from === user1 ? "me" : "friend"}>
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
      </div>
             <div id={'el'} ref={el}></div>

      </div>
  );
};

export default Message;
  