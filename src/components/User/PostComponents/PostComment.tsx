import React, { useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserAvatar from '../ProfileComponent/UserAvatar';
import EmojiPicker from 'emoji-picker-react';
import apiCalls from '../../../services/user/apiCalls';
import ShowComment from "./ShowComment";

import {toast} from "react-toastify"

interface Props {
  profilePic: string | undefined;
  username: string | undefined;
  userId:string
  postId:string;
  // cb:(value:any)=>void
}

const PostComment: React.FC<Props> = ({ profilePic, userId,username,postId}) => {
  const [newComment,setComment]=useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const initialValues = {
    comment: '',
  };

  const validationSchema = Yup.object({
    comment: Yup.string()
      .required('Comment is required')
      .max(50, 'Comment must not exceed 50 characters'),
  });

  const onSubmit =async (values: { comment: string }, { resetForm }: { resetForm: () => void }) => {
    try{
      const {message}=await apiCalls.PostComment({ postId:postId, comment:values.comment })
      if(message){
        toast(message)
       }
    }catch(err){
     toast("something went worng")
    }finally{
      setComment(!newComment)
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleEmojiSelect = (emoji: any) => {
    formik.setFieldValue('comment', formik.values.comment + emoji.emoji);
    setShowEmojiPicker(false);
  };
  const handleBlur=()=>{
    setShowEmojiPicker(false)
  }

  return (
    <>
     {showEmojiPicker && (
        <div className="flex  w-full h-full ">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
      <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400" >
        <UserAvatar profilePic={profilePic} username={username} isOnline={true} hight={10} width={10} />
        <form onSubmit={formik.handleSubmit} className="w-full ml-1">
          <input
            type="text"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent rounded-lg"
            placeholder="Post a comment..."
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.comment}</div>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-6" >
            <button
              type="button"
              className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <svg
                className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </span>
        </form>
      </div>
      <div>
      <ShowComment postId={postId} currentUser={userId} newComment={newComment} />
      </div>
       </>
  );
};

export default PostComment;
