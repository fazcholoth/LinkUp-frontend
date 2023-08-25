import {VideoCameraIcon} from '@heroicons/react/24/solid'
import  { useState } from 'react';
import ApiCalls from '../../../services/user/apiCalls';
import { useDispatch } from 'react-redux';
import { setPosts } from '../../../state/user';
import { toast } from "react-toastify"
import {useDropzone} from 'react-dropzone';
import Carousel from './sliderComponent';


 const PostComponent = () => {
 
  const dispatch=useDispatch()
 const [image,setImage]=useState<string|any>([])
 const [text,setText]=useState<string>("")
 const [selectedImage,setSelectedImage]=useState<any>()
 


 const { getRootProps, getInputProps} = useDropzone({
    accept: {
    'image/jpeg': ['.jpeg', '.png']
    },
     multiple: true,
   onDrop: (acceptedFiles) => {
    
    if (acceptedFiles && acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles);
        const newImg= acceptedFiles.map(file => (
         URL.createObjectURL(file)
        )
        );
        setImage(newImg)
    }
  },
});

 const handleSubmit = async(event: React.FormEvent) => {
  event.preventDefault();
  const trimmedText = text.trim();

  if (image.length<=0 && trimmedText === '') {
    toast('Please share either an image or text', {
      position: 'bottom-center',
      hideProgressBar: true,
      closeOnClick: true,
      theme: 'dark',
    });
    return;
  }
 
  const formData = new FormData();
  
  if(selectedImage){
    selectedImage.forEach((image:any,) => {
      formData.append('images', image??"",);
    });
  }
  formData.append("text",trimmedText)
  setText('');
  setImage([]);  
  setSelectedImage(null)
  const {post} =await ApiCalls.CreatePost(formData) 
  
  if(post){
    dispatch(setPosts({
      posts:post
    })) 
    return
  }
  
};
 const clearImages=()=>{
  setImage([])
 }

  return (
  <div className='mt-4'>
    
  <form className="bg-white shadow rounded-lg mb-6 p-4 w-full ">
    <textarea
      name="message"
      id='message'
      placeholder="Type something..."
      value={text}
      onChange={({target})=>setText(target.value)}
      className="focus:outline-none w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent placeholder-gray-400"
    ></textarea>
    <div className="flex flex-col">
    {image.length>0 && <Carousel image={image} clearImages={clearImages}/>}
   </div>
    <footer className="flex justify-between mt-2">
      <div className="flex gap-2">
          <label htmlFor="imageUpload">
          <span className="flex items-center hover:bg-black hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-black cursor-pointer" {...getRootProps()}>

          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          </span>
          </label>
          {/* <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={({ target: { files } }) => {
              if (files && files.length > 0) {
                setSelectedImage(files[0]);
                setImage(URL.createObjectURL(files[0]));
              }
            }}
            
          />          */}
        <input {...getInputProps()}  className='hidden' id='imageUpload'/>
        <span className="hidden  items-center hover:bg-blck hover:bg-black hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-black cursor-pointer">
          <VideoCameraIcon
            width="24"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </span>
      </div>
      <button className="flex items-center py-2 px-4 rounded-lg text-sm bg-black text-white shadow-lg" onClick={handleSubmit}>
        Send
        <svg
          className="ml-1"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </footer>
    </form>
    </div>
    
  )
}

export default PostComponent