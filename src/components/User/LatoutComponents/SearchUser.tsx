import { User } from "../../../state/user";
import UserAvatar from "../ProfileComponent/UserAvatar";
import AddFriend from "../ProfileComponent/AddFriend";

type SearchUser={
    user:User
}

const SearchUser = ({user}:SearchUser) => {

  return (
    <div className="w-full  h-auto ">
      <div className=" bg-slate-50 mt-2 px-2 py-2 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear"  >
        <div className="w-full flex items-center justify-between">
          <span></span>
            <AddFriend userId={user?._id??""}/>
           </div>
        <div className="flex items-center  rounded-lg py-1 cursor-pointer" >
          <UserAvatar profilePic={user?.profilePic} username={user?.username} isOnline={true} hight={12} width={12}/>
          <div className="ml-3.5 flex-row space-y-2">
            <div className="font-semibold tracking-tight text-xs text-gray-600">{user?.username}</div>
            <div className="text-xs leading-none opacity-50  text-gray-600">{user?.email}</div>
            {/* <p className="text-xs leading-4 pt-2 italic opacity-70">"This is the comment..."</p>
            <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">a few seconds ago</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
