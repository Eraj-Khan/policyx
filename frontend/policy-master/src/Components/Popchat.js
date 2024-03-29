import React, { useEffect, useState, useRef } from "react";
import botlogo from "./botlogo.webp";
import sendbutton from "./sendbutton.png";

const PopChat = (props) => {
  const [msg, setMsg] = useState("");
  const [chatopen, setChatopen] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [props.messages]);

  const toggle = () => {
    setChatopen(!chatopen);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const renderMessageWithLineBreaks = (message) => {
    return message.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleSend = () => {
    const get = props.getMessage;
    get(msg);
    setMsg("");
  };

  return (
    <div id="chatCon">
      <div className="pop" onClick={toggle}>
        <img src={botlogo} alt="" />
      </div>
      {chatopen && (
        <div className="chat-box">
          <div className="header" onClick={toggle}>
            Chat with me
          </div>
          <div className="msg-area" ref={messagesRef}>
            {props.messages?.length > 0 &&
              props.messages.map((msg, i) =>
                msg.type === "query" ? (
                  <p className="right" key={i}>
                    <span>{renderMessageWithLineBreaks(msg.value)}</span>
                  </p>
                ) : (
                  <p className="left" key={i}>
                    <span>{renderMessageWithLineBreaks(msg.value)}</span>
                  </p>
                )
              )}
          </div>
          <div className="footer_text">
            <input
              type="text"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              onKeyDown={handleKeyPress}
              style={{ marginBottom: "5px" }}
            />
            <img
              onClick={handleSend}
              src={sendbutton}
              width={30}
              alt=""
              height={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopChat;
