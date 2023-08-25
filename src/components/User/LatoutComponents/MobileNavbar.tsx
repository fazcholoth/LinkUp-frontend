import { RootState } from "../../../state/rooState";
import { useSelector, useDispatch } from "react-redux";
import { UserCircleIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowLeftOnRectangleIcon, BookmarkIcon, HomeIcon,Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { setLogout } from "../../../state/user";

const MobileNavbar = () => {
  const isToggler = useSelector((state: RootState) => state.user.isToggle);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.user.user);

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? "animate-bounce" : "";
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setLogout());
        localStorage.removeItem('userAuth');
      }
      return
    });
  };

  return (
    <div className={`${!isToggler ? "hidden" : "block"} block sm:hidden md:hidden ml-2`}>
      <ul className="menu bg-gray-200 rounded-box">
          <li className={`tooltip tooltip-right cursor-pointer`} data-tip="Details">
            <Link to="/">
              <HomeIcon className="w-6 h-6 text-black" />
            </Link>
          </li>
          <li className={`tooltip tooltip-right cursor-default ${isActive(`/profile/${user?.username}`)}`} data-tip="Profile">
            <Link to={`/profile/${user?.username}`} className="">
              <UserCircleIcon className="w-6 h-6 text-black" />
            </Link>
          </li>
          <li className={`tooltip tooltip-right ${isActive('/chat')}`} data-tip="Chat">
            <Link to="/chat">
              <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-black" />
            </Link>
          </li>
          <li className={`tooltip tooltip-right ${isActive('/saved')}`} data-tip="Saved posts">
            <Link to="/saved">
              <BookmarkIcon className="w-6 h-6 text-black" />
            </Link>
        </li>
        <li className={`tooltip tooltip-right ${isActive('/settings')}`} data-tip="Settings">
            <Link to="/settings">
              <Cog6ToothIcon className="w-6 h-6 text-black" />
            </Link>
        </li>
        <li>
        <a className="tooltip tooltip-right" data-tip="Logout">
            <ArrowLeftOnRectangleIcon className="w-6 h-6 text-red-500" onClick={() => { handleLogout() }} />
        </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
