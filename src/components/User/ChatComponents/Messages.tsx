import { Message } from "../../../pages/user/Chat";
import UserAvatar from "../ProfileComponent/UserAvatar";
import { format } from "timeago.js";

interface Props {
  message: Message;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  userId:string|undefined
}

const Messages = ({ message, chatContainerRef ,userId}: Props) => {
  
  const { senderId, content, createdAt } = message;
  const isCurrentUser = senderId._id ===userId ;
  

  if (!message) {
    return (
      <div className="badge badge-info px-3 py-3 h-auto w-full mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>You have no recent chats.</span>
      </div>
    );
  }
  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start" } py-2`} >
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <UserAvatar
            profilePic={senderId.profilePic}
            hight={6}
            width={6}
            isOnline={true}
            username={senderId.username}
          />
        </div>
      </div>
      <div className="chat-header text-black">
        {!isCurrentUser && senderId.username}
        <time className="text-xs opacity-50 text-black ">{format(createdAt)}</time>
      </div>
      <div className="chat-bubble w-30 rounded-full px-5 py-2 bg-gray-500 ">
      <div className="text-start break-words text-black font-normal text-base" ref={chatContainerRef}>{content}</div>
      </div>
    </div>
  );
};

export default Messages;
