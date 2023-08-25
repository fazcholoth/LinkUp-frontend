import { useState, useEffect, useRef } from "react";
import Conversations from "../../components/User/ChatComponents/Conversations";
import Messages from "../../components/User/ChatComponents/Messages";
import apiCalls from "../../services/user/apiCalls";
import { RootState } from "../../state/rooState";
import { useSelector } from "react-redux";
import {PaperAirplaneIcon,VideoCameraIcon} from '@heroicons/react/24/solid'
import {Socket, connect} from "socket.io-client";
import InputSection from "../../components/User/ChatComponents/InputSection";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../../constants";

export interface Conversation {
  _id: string;
  participants: [
    {
      _id: string;
      username: string;
      profilePic: string;
    },
    {
      _id: string;
      username: string;
      profilePic: string;
    }
  ];
  createdAt: string;
}
export interface Message {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    profilePic: string;
  };
  content: string;
  createdAt: string;
}

const Chat = () => {
  const socket =useRef<Socket|null>()
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [onlineUsers,setOnlineUsers]=useState<string[]|any>([])
  const [reciever,setReceiver]=useState("")
  const [selectedConversation, setSelectedConversation] = useState("");
  const [messages, setMessages] = useState<Message[]>([])??[];
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const Navigate=useNavigate()

  
  useEffect(() => {
    
    socket.current = connect(SOCKET_URL);
    
  }, []);

  const handleReceiveData= (data:any) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  }

  useEffect(() => {
    
    socket?.current?.on("receive:message",handleReceiveData);

  }, [])
  
  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    socket?.current?.emit("add:user", {userId:user?._id});
    socket?.current?.on("get:users", (users) => {      
     setOnlineUsers(users
      .filter((u: { userId: never, socketId: string }) => {
        return user?.following?.includes(u?.userId); 
      })
      .map((u: { userId: string, socketId: string }) => {
        return u.userId;
      }))
    });
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      
    }
  }, [selectedConversation]);

  const getConversations = async () => {
    try {
      const { conversations } = await apiCalls.GetConversation();
      
      setConversations(conversations);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { messages } = await apiCalls.GetMessages(conversationId);
      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
  };

  const invokeChat = async(id:string) => {
    const {members}=await apiCalls.GetRoomMembers(id)
    const receiver = members.filter((id:string) => id != user?._id);
    setReceiver(receiver)
    setSelectedConversation(id);
  };

useEffect(() => {
   const scrollToLatest= () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  scrollToLatest()
}, [messages])

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };


  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return; // Do not send empty messages
    }

    try {
      const data={
        content:newMessage,
        conversationId:selectedConversation
      }  
      const rtData={
        content:newMessage,
        senderId:{
          _id:user?._id,
          profilePic:user?.profilePic,
          username:user?.username,
        },
        receiverId:reciever,
        createdAt:new Date(Date.now()),
        room:selectedConversation
      }
      socket?.current?.emit("send:message",rtData);
      await apiCalls.SendMessage(data);
      fetchMessages(selectedConversation)
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoin=async(selectedConversation:string)=>{
    if(selectedConversation){
      const url="https://uniiverse.online/videoChat/"+selectedConversation
      try {
        const data={
          content:url,
          conversationId:selectedConversation
        }  
        const rtData={
          content:url,
          senderId:{
            _id:user?._id,
            profilePic:user?.profilePic,
            username:user?.username,
          },
          receiverId:reciever,
          createdAt:new Date(Date.now()),
          room:selectedConversation
        }
        socket?.current?.emit("send:message",rtData);
        await apiCalls.SendMessage(data);
        fetchMessages(selectedConversation)
      } catch (error) {
        console.log(error);
      }finally{
        Navigate(`/videoChat/${selectedConversation}`)
      }
    }
    return
  }

 
 
  return (
    <div className="flex bg-gray-200 h-[85%] mt-4 rounded-md">
      <div className="w-1/3 border-r border-black">
        <div className="w-full">
        <InputSection userId={user?._id??""} setConversation={setConversations} />
        </div>
        {conversations.map((conversation: Conversation) => (
          <div key={conversation?._id} onClick={() => invokeChat(conversation?._id)} className="cursor-pointer">
            <Conversations conversation={conversation} userId={user?._id} onlineUser={onlineUsers}/>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-between">
       {selectedConversation && <div className="w-full h-10 flex items-center justify-end pr-2">
          <VideoCameraIcon className="w-6 h-6 text-black  text-end cursor-pointer" onClick={()=>{handleJoin(selectedConversation)}}/>
       </div>}
        <div className="p-4 overflow-y-auto scrollbar-hide scroll-smooth flex-1">
          <>
          {selectedConversation?
            messages.map((message) => (
              <Messages
                key={message?._id}
                message={message}
                chatContainerRef={chatContainerRef}
                userId={user?._id}
              />
            )):(<div className="w-full py-20">
            <h1 className="text-4xl font-bold  tracking-wide text-center">Welcome back to uniVERSE</h1>
            <p className="text-2xl my-4 text-center">Explore the Universe through Chat!</p>
        </div>)
        }
          </>
        </div>
        {
          selectedConversation&&(
            <div className="flex flex-row bg-gray-500 px-1 py-2 shadow">
            <input
              placeholder="Type your message..."
              className="flex-1 textarea textarea-bordered textarea-sm  px-1 py-1"
              value={newMessage}
              onChange={handleNewMessageChange}
            ></input>
            <button className=" text-black" >
          <PaperAirplaneIcon className="w-8 h-8" onClick={handleSendMessage}/>
          </button>
           </div>
          
          )
        }
        
      </div>
    </div>
  );
  
  
}
export default Chat
