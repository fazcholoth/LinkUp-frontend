import { useNavigate } from "react-router-dom";

interface props{
    profilePic:string|undefined;
     hight:number;
     width:number;
     username:string|undefined;
     isOnline:boolean;
}


const UserAvatar = ({profilePic,username,isOnline,width,hight}:props) => {
  
  const navigate =useNavigate()

  const handleUserClick = () => {
    if(!username) return null
    navigate(`/profile/${username}`);
  };
  return (
    <div className="cursor-pointer">
        <div className="relative flex flex-shrink-0 items-end" onClick={()=>{handleUserClick()}}>
            <img className={`h-${hight} w-${width} rounded-full`} src={profilePic} alt="User Avatar" />
            <span className={` ${isOnline?"absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-slate-900":""}`}></span>
         </div>
    </div>
  )
}

export default UserAvatar