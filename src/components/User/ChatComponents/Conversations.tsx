import UserAvatar from "../ProfileComponent/UserAvatar";
import { useState } from "react";
import { Conversation } from "../../../pages/user/Chat";


interface Props {
  conversation: Conversation;
  userId: string|undefined;
  onlineUser:string[]
}

const Conversations = ({ conversation, userId ,onlineUser}: Props) => {
  
    const [conver] = useState(
        conversation && conversation.participants.find((p) => p._id !== userId)
      );
    
    
  return (
    <div>
      <div className="p-2">
        <div className="flex items-center p-2 hover:bg-gray-300 ">
          <UserAvatar
            profilePic={conver?.profilePic}
            hight={10}
            width={10}
            isOnline={onlineUser?.includes(conver?._id??"")}
            username={conver?.username}
          />
          <div className="ml-2">
            <h4 className="font-medium">{conver?.username}</h4>
            <p className="text-sm text-gray-500">Last message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
