import { setAdLogin, setUsers } from "../../state/admin";
import { useDispatch } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { UserCircleIcon,ChatBubbleBottomCenterIcon ,ArrowLeftIcon,HomeIcon,FlagIcon } from "@heroicons/react/24/solid";

const Navbar = () => {

  const dispatch = useDispatch();
  const location =useLocation()

  const isActive=(path:string)=>{
    return location.pathname.includes(path)
  }
  const handleLogout = () => {
    dispatch(setUsers([]))
    dispatch(
      setAdLogin({
        admin: null,
        token: null,
      })
    );
    localStorage.removeItem("adminAuth");
  };

  return (
    <div>
      <div className="bg-black h-screen space-y-10">
      <div className="px-4 py-4 uppercase font-extrabold">Admin panel</div>
        <div className="w-full flex items-center gap-x-1.5 group select-none">
          
          <div className="group-hover:bg-black w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm cursor-pointer">
            <HomeIcon className={`w-6 h-6  ${isActive("/dashboard")?"bg-red-400 rounded":""}`} />
            <Link to="dashboard" >Dash board</Link>
          </div>
        </div>

        <div className="w-full flex items-center gap-x-1.5 group select-none">
          <div className="group-hover:bg-black w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
            <UserCircleIcon className={`w-6 h-6  ${isActive("/users")?"bg-red-400 rounded":""}`} />
            <Link to="users">Users</Link>
          </div>
        </div>

        <div className="w-full flex items-center gap-x-1.5 group select-none">
          <div className="group-hover:bg-black w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
            <ChatBubbleBottomCenterIcon className={`w-6 h-6  ${isActive("/posts")?"bg-red-400 rounded":""}`} />
            <Link to="posts">Posts</Link>
          </div>
        </div>
        <div className="w-full flex items-center gap-x-1.5 group select-none">
          <div className="group-hover:bg-black w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
            <FlagIcon className={`w-6 h-6  ${isActive("/reports")?"bg-red-400 rounded":""}`} />
            <Link to="reports">Reports</Link>
          </div>
        </div>
        <div className="w-full pr-3 flex flex-col space-y-10">
          <div className="w-full flex items-center gap-x-1.5 group select-none">
            <div className="group-hover:bg-black w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm cursor-pointer">
              <ArrowLeftIcon className="w-6 h-6" />
              <span onClick={handleLogout}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
