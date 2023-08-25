import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/rooState";
import apiCalls from "../../../services/user/apiCalls";
import { setFollowing } from "../../../state/user";
import {toast}  from "react-toastify"

interface props{
  userId:string
}
const AddFriend = ({ userId }: props) => {
  const dispatch = useDispatch();
  const currentUser =useSelector((state:RootState)=>state.user.user?._id)
  const following = useSelector((state: RootState) => state.user.user?.following) as string[];

  const isFollowing = following?.includes(userId);
  const handleFollow = async () => {
    try {
      const { following, message } = await apiCalls.FollowUser({ userId: userId });
      dispatch(setFollowing(following));
      toast(message,{position:"top-center"})
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { following, message } = await apiCalls.UnFollowUser({ userId: userId });
      dispatch(setFollowing(following));
      toast(message,{position:"top-center"})
    } catch (err) {
      console.error(err);
    }
  };

  if(currentUser===userId){
    return null
  }

  return (
    <>
      {isFollowing ? (
        <UserMinusIcon className="w-6 h-6 cursor-pointer text-black dark:md:hover:text-gray-600 " onClick={handleUnfollow} />
      ) : (
        <UserPlusIcon className="w-6 h-6 cursor-pointer  text-black dark:md:hover:text-gray-600" onClick={handleFollow} />
      )}
    </>
  );
};

export default AddFriend;
