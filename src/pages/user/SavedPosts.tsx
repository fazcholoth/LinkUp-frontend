import { useEffect, useState } from "react";
import apiCalls from "../../services/user/apiCalls";
import Posted from "../../components/User/PostComponents/Posted";

const SavedPosts = () => {
  const [saved, setSavedPost] = useState([]);

  useEffect(() => {
    getSavedPosts();
  },[]); // Remove the 'saved' dependency from the dependency array

  const getSavedPosts = async () => {
    try {
      const { savedPosts } = await apiCalls.GetSavedPost();
      setSavedPost(savedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  if (saved.length <= 0) {
    return (
     <div className="badge badge-info px-3 py-3 h-auto w-full mt-4">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
     <span>You have no saved posts.</span>
     </div>
    );
  }

  return (
    <div>
      <div className="px-3 py-3 h-auto w-full ">
        {saved.map((post, index) => (
          <Posted key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
