
import PopChat from "./Popchat";
import "./Popchat.css"
import { useEffect, useState } from "react";

function HomeChat() {
  const [messages, setMessages] = useState([
    {
      value: "How may I assist you?",
      type: "aiResponse",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState('')

  const getMessage = (value) => {
    setMessages([...messages, {value, type: 'query'}]);
    setValue(value)
    
  };
 
  
  const getData = async (val) => {
    fetch(`http://127.0.0.1:8000/chatbot/answer/?query="${val}"`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setMessages([...messages, {value: response.answer, type: 'aiResponse'}]);
    });

  }

  useEffect(() => {
    console.log(messages);
    if (messages?.length > 0) {
      setLoading(true);    
    }
    if(value){
      getData(value)
    }
  }, [value]);

  console.log("dssd");
  return loading && <PopChat messages={messages} getMessage={getMessage} />;
}
export default HomeChat;

// import React, { useEffect, useState } from "react";
// import PopChat from "./Popchat";
// import "./PopChat.css";

// function HomeChat() {
//   const [messages, setMessages] = useState([
//     {
//       value: "How may I assist you?",
//       type: "aiResponse",
//     },
//   ]);

//   const [value, setValue] = useState('');

//   const getMessage = (value) => {
//     setMessages([...messages, { value, type: "query" }]);
//     setValue(value);
//   };

//   useEffect(() => {
//     if (value) {
//       // Fetch data from API
//       fetch(`http://127.0.0.1:8000/chatbot/answer/?query=${value}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to fetch response");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           // Update messages state with AI response
//           setMessages([...messages, { value: data.answer, type: "aiResponse" }]);
//         })
//         .catch((error) => {
//           console.error("Error fetching response:", error);
//         });
//     }
//   }, );

//   return <PopChat messages={messages} getMessage={getMessage} />;
// }

// export default HomeChat;

