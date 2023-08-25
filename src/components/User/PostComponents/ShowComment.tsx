import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiCalls from '../../../services/user/apiCalls';
import UserAvatar from '../ProfileComponent/UserAvatar';
import { HeartIcon ,PaperAirplaneIcon,EllipsisHorizontalIcon} from '@heroicons/react/24/solid';
import {format} from "timeago.js"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/rooState';
import { setCommentLength } from '../../../state/user';

interface Comment {
  _id: string;
  postId: string;
  comment: string;
  userId: {
    _id: string;
    username: string;
    profilePic: string;
  };
  likes: string[];
  replies: Comment[];
  date:Date; 
}

interface Props {
  postId: string;
  newComment: boolean;
  currentUser: string;
  // cb: (value: any) => void;
}

const ShowComment = ({ postId, currentUser,newComment }: Props) => {
  const dispatch=useDispatch()
  const [comments, setComments] = useState<Comment[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [replied, setReplied] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const isVisible =useSelector((state:RootState)=>state.user.isVisible).find((e)=>e===postId)
 

  useEffect(() => {
    getComments();
  }, [postId,newComment]);

  const getComments = async () => {
    try {
      const { comments } = await apiCalls.GetComment(postId);
      const data={
        [postId]:comments.length
      }
      if (comments.length) {
        dispatch(setCommentLength(data))
      }
      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    toast.warning('Are you sure you want to delete this comment?', {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      draggable: true,
      closeButton: (
        <button className="btn btn-warning" onClick={() => confirmDelete(id)}>
          Confirm
        </button>
      ),
      onClose: () => {
      },
    });
  };

  const confirmDelete = async (id: string) => {
    try {
      await apiCalls.DeleteComment({ id: id });
      getComments()
      toast.dismiss();
    } catch (error) {
      toast.error('Failed to delete comment.');
    }
  };

  const handleLike = async (id: string) => {
    try {
     await apiCalls.LikeComment({ commentId: id });
      
      getComments()
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    try {
      if(replyText.trim()=="")return null      
      const value={
        commentId:commentId,
        reply:replyText
      }

      await apiCalls.ReplyComment(value)      
      getComments()
      setReplyText('');
      // Implement your API call or any other actions for submitting the reply
    } catch (error) {
      toast.error('Failed to submit reply.');
    }
  };


  const renderComments = (comments: Comment[]) => {
    
    return comments.map((comment) => (
      <div key={comment._id} className=" my-3 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center">
        <UserAvatar
          profilePic={comment?.userId?.profilePic}
          username={comment?.userId?.username}
          isOnline={false}
          width={6}
          hight={6}
        />
        <div >
        <span className=" text-black font-medium text-sm px-1 py-1">{comment?.userId?.username} </span>
        <span className='font-semibold text-sm text-gray-600'>
        {format(new Date(comment?.date))}
        </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center py-2">
          <div className="text-black text-sm font-medium bg-gray-100 px-1 py-1 rounded-lg">{comment?.comment}</div>
          {currentUser === comment?.userId?._id && (
            <div className="dropdown dropdown-hover">
              <EllipsisHorizontalIcon className="w-6 h-6 text-black cursor-pointer" />
              <ul className="dropdown-content z-10 menu p-2 shadow bg-white opacity-80 rounded-xl cursor-pointer text-black">
                <li onClick={() => handleDelete(comment?._id)}>Delete</li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center mt-2">
          <button className=" hover:underline" onClick={() => handleLike(comment?._id)}>
            <HeartIcon className={`w-5 h-5 ${comment?.likes?.includes(currentUser) ? 'text-red-500' : ''}`} />
          </button>
          <span className="text-xs py-1 pl-2 text-blue-500">{comment?.likes?.length} likes</span>
          <button className="text-blue-500 hover:underline pl-4" onClick={() => setReplied(replied === comment?._id ? null : comment?._id)}>
            {replied === comment?._id ? 'cancel reply' : 'reply'}
          </button>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
          {renderComments(comment.replies)}
        </div>
      )}

      {replied === comment._id && (
        <div className="flex mt-2 items-center">
          <div className="rounded-full h-8 w-8 bg-gray-100"></div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`@ ${comment.userId.username}`}
            className="bg-gray-100 rounded py-1 px-3 ml-2 flex-grow"
          />
          <PaperAirplaneIcon
            className="w-8 h-8 text-blue-500 cursor-pointer"
            onClick={() => handleReplySubmit(comment._id)}
          />
        </div>
      )}
    </div>
    ));
  };

  if (comments.length === 0 ||!isVisible) {
    return null;
  }


  const reversedComments = [...comments].reverse();

    return (
    <div className="flex flex-col justify-start px-6">
      {reversedComments.slice(0, showAllComments ? comments.length : 2).map((comment) => (
        <React.Fragment key={comment._id}>{renderComments([comment])}</React.Fragment>
      ))}

      {comments.length > 2 && (
        <button
          className="px-5 py-2 text-black underline cursor-pointer"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  );
};

export default ShowComment;
