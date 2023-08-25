import React, { useEffect, useState } from 'react';
import apiCalls from '../../../services/user/apiCalls';
import SearchUser from '../LatoutComponents/SearchUser';
import { RootState } from '../../../state/rooState';
import {useSelector} from "react-redux"

const RightVerticalComponent: React.FC = () => {
  const followersNo=useSelector((state:RootState)=>state.user.user?.followers?.length)
  const followingNo=useSelector((state:RootState)=>state.user.user?.following?.length)

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFollowing();
    getFollowers();
  }, [followersNo,followingNo]);

  const getFollowing = async () => {
    try {
      const response = await apiCalls.GetFollowing();
      setFollowing(response);
    } catch (error: any) {
      const { response } = error;
       console.error(response);
             
    }
  };

  const getFollowers = async () => {
    try {
      const response = await apiCalls.GetFollowers();
      setFollowers(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-col bg-inherit mr-4 rounded-lg mt-1">
      <h2 className="text-xl font-medium mb-1">Followers  {followersNo}</h2>
      <div className="overflow-y-scroll scrollbar-default h-44 pl-3 shrink-0  mb-2">
        {followers.map((follower, index) => (
          <SearchUser key={index} user={follower} />
        ))}
      </div>
      <h2 className="text-xl font-medium mb-1">Following  {followingNo}</h2>
      <div className="overflow-y-scroll scrollbar-default h-44 pl-3 ">
        {following.map((followedUser, index) => (
          <SearchUser key={index} user={followedUser} />
        ))}
      </div>
    </div>
  );
};

export default RightVerticalComponent;
