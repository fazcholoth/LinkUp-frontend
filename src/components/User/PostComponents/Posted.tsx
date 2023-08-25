import { useSelector } from "react-redux";
import { Post } from "../../../state/user";
import { RootState } from "../../../state/rooState";
import { Likes } from "./Likes";
import { Comment } from "./Comment";
import PostMenu from "./PostMenu"
import UserAvatar from "../ProfileComponent/UserAvatar";
import PostComment from "./PostComment";
import SharePost from "./SharePost";
import { format } from "timeago.js";

interface PostProps {
    post: Post;
  }
  
 const Posted =({post}:PostProps) => {

 const user =useSelector((state:RootState)=>state.user.user)
 
   

  return (
    <div className="bg-white border-2 h-auto shadow-lg rounded-lg pb-4 mt-2 ">
    <div className="flex flex-row px-2 py-3 justify-between">
  <div className="flex">
     <UserAvatar profilePic={post?.userPicturePath} username={post.username} isOnline={true} hight={12} width={12}/>
    <div className="flex flex-col mb-2 ml-4 mt-1">
      <div className="flex text-gray-600 text-sm font-medium">
        <span className="flex-1 flex-shrink-0">{post?.username}</span>
      </div>
      <div className="flex flex-row-reverse justify-end w-full mt-1">
        <div className="text-gray-400 font-thin text-xs">
          {format(post?.createdAt)}
        </div>
      </div>
    </div>
  </div>
    <PostMenu postId={post?._id} savedBy={post?.savedBy} postedUser={post?.userId} currentUser={user?._id??""} isDeleted={post?.isDeleted} />
  </div>
    <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">{post?.description}</div>
    <div className="text-gray-400 font-medium text-sm cursor-pointer">
    {post?.picturePath && post?.picturePath.length ==1 && post?.picturePath[0].trim() !== "" ? (
   <img className="rounded w-full" src={post?.picturePath[0]} alt="Post Image" />
  ) : (
  <div className="grid grid-cols-2 gap-2">
    {post?.picturePath && post?.picturePath.map((path: string, index: number) => (
      <img key={index} className=" grid grid-flow-row-dense rounded w-full " src={path} alt={`Post Image ${index}`} />
    ))}
  </div>
   )}
 </div>
    <div className="flex justify-start mb-4 border-t border-gray-100">
    <div className="flex w-full border-t border-gray-100">
  <div className="mt-3 mx-5 w-full flex justify-start text-xs">
    <div className="flex text-gray-700 rounded-md mb-2 mr-4 items-center"><Likes id={post?._id} userId={user?._id ??""} likes={post?.likes}/><div className="pl-1 text-ms text-blue-500">{Object.keys(post?.likes).length} likes</div></div>
    <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center"><Comment postId={post?._id}/></div>
    <div className="flex text-gray-700 font-normal rounded-md mb-2 items-center"><SharePost postId={post?._id} picture={post?.picturePath[0]}/></div>
  </div> 
</div>
</div>
  <PostComment profilePic={user?.profilePic} userId={user?._id??""} username={user?.username}  postId={post?._id} />
</div>
  )
}
 export default Posted