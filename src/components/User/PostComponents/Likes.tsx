import { HeartIcon } from '@heroicons/react/24/solid';
import ApiCalls from '../../../services/user/apiCalls';
import { useDispatch } from 'react-redux';
import { setPost } from '../../../state/user';

interface RooId{
    id:string
    userId:string
    likes: { [userId: string]: boolean;};
  }

export const Likes = ({id,userId,likes}:RooId) => {

  const dispatch=useDispatch()
   
  const isLiked=likes[userId];
  

  const handleLikeToggle = async() => {
         
    const {post} = await ApiCalls.LikePost(id)
        dispatch(setPost({
          post
        }))
  };

  return (
    <div onDoubleClick={handleLikeToggle}>
    <HeartIcon className={`w-6 h-6  ${isLiked ? 'text-red-600' : 'text-base'}  cursor-pointer`} />
    </div>
  );
};
