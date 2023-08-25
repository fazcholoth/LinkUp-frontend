import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import apiCalls from '../../../services/user/apiCalls';
import { setPosts } from '../../../state/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/rooState';
import Swal from 'sweetalert2';

type Props = {
  postId: string;
  savedBy: string[];
  postedUser: string;
  currentUser: string | null;
  isDeleted:boolean;
};

const PostMenu = ({ postId, savedBy, postedUser, currentUser ,isDeleted}: Props) => {
  const status =savedBy.includes(currentUser ?? '')
  
  const [isCurrentUserPostOwner] = useState(postedUser === currentUser);
  const [isSaved, setIsSaved] = useState(status);
  

  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.user.posts);

  const handleDeletePost = async () => {
    
    if (isCurrentUserPostOwner) {
      try {
        const { message, success } = await apiCalls.DeletePost({ id: postId ,set:!isDeleted});

        if (success) {
          const updatedPost = posts.filter((post) => post._id !== postId);
          dispatch(
            setPosts({
              posts: updatedPost,
            })
          );

          toast(message, {
            position: 'top-center',
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'light',
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSavePost = async (current:any) => {
    try {
      const { message } = await apiCalls.SavePost({ postId: postId });

      toast(message, {
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'light',
      });
      setIsSaved(current);

    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = async () => {
    const { value: text } = await Swal.fire<string>({
      title: 'Report Post',
      input: 'textarea',
      inputLabel: 'Reason',
      inputPlaceholder: 'Enter your reason here...',
      showCancelButton: true,
      background: '#000000', 
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value): string | null => {
        if (!value) {
          return 'You need to enter a reason!';
        }
        return null;
      }
    });

    if (text) {
        try{
          const {message}=await apiCalls.ReportPost({postId:postId,reason:text})
          message?toast(message, {
            position: 'top-center',
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'light',
          }): null;
        }catch(err){
          
          toast("An error occurred while submitting the report.", {
            position: 'top-center',
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'light',
          })

      }
   }
  };

  return (
    <div className="dropdown dropdown-end  mr-3">
      <label tabIndex={0} className="text-black">
        <EllipsisHorizontalIcon className="w-6 h-6  font-semibold cursor-pointer" />
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {isCurrentUserPostOwner ? (
          <>
            <li>
              <a>View Post</a>
            </li>
            <li onClick={()=>handleDeletePost()}>
              <a>Delete post</a>
            </li>
          </>
        ) : (
          <>
            {isSaved ? (
              <li onClick={()=>handleSavePost(!isSaved)}>
                <a>Unsave post</a>
              </li>
            ) : (
              <li onClick={()=>handleSavePost(!isSaved)}>
                <a>Save post</a>
              </li>
            )}
            <li>
              <a>View Post</a>
            </li>
            <li onClick={()=>handleReport()}>
              <a>Report post</a>
             </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PostMenu;
