import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { RootState } from "../../../state/rooState";
import { Post, User } from "../../../state/user";
import { Link, Outlet, useParams } from "react-router-dom";
import Posted from "../PostComponents/Posted";
import AddFriend from "./AddFriend";
import apiCalls from "../../../services/user/apiCalls";

const Profile = () => {
  const { username } = useParams();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.user);
  const allPosts = useSelector((state: RootState) => state.user.posts);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const getUserPosts = async () => {
    const userPosts = allPosts.filter((post: Post) => {
      return post.username === username;
    });
    setPosts(userPosts);
  };

  useEffect(() => {
    getUserPosts();
  }, [allPosts, username]);

  useEffect(() => {
    if (currentUser?.username !== username) {
      const fetchProfileUser = async () => {
        try {
          const {user} = await apiCalls.GetUser(username);
          setProfileUser(user);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfileUser();
    } else {
      setProfileUser(currentUser);
    }
  }, [currentUser, username]);

  const reversedPosts = [...posts].reverse();

  const isCurrentUser = currentUser?.username === username;

  return (
    <div id="yourAppElement" className="w-auto flex flex-wrap justify-center mt-28">
      <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow relative">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          src={profileUser?.profilePic}
          alt="user image"
        />
        {isCurrentUser ?(
          <Link to="/profile/edit">
            <PencilSquareIcon className="w-6 h-6 absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </Link>
        ):(<div className="absolute top-0 right-0 m-4 "><AddFriend userId={profileUser?._id??""}  /></div>)}
        <div className="text-center mt-2 text-3xl font-medium">{profileUser?.username}</div>
        <div className="text-center mt-2 font-light text-sm">{profileUser?.email}</div>
        <div className="px-6 text-center mt-2 font-light text-sm">
          {/* <p>
            Front end Developer, avid reader. Love to take a long walk, swim
          </p> */}
        </div>
        <hr className="mt-8" />
        <div className="flex p-4">
          <div className="w-1/2 text-center">
            <span className="font-bold">Followers: {profileUser?.followers?.length}</span>
          </div>
          <div className="w-0 border border-gray-300"></div>
          <div className="w-1/2 text-center">
            <span className="font-bold">Following: {profileUser?.following?.length}</span>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className="px-3 py-3 h-auto w-full">
        {reversedPosts.map((post, index) => (
          <Posted key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
