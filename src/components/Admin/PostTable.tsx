import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiCalls from "../../services/admin/apiCalls";
import { Post } from "../../state/user";

const PostTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const { post } = await apiCalls.GetPosts();
      setPosts(post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleDelete = async (postId: string, isDeleted: boolean) => {
    try {
      const { message, success } = await apiCalls.DeletePost({ id: postId, set: !isDeleted });

      if (success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              return { ...post, isDeleted: !isDeleted };
            }
            return post;
          })
        );

        toast(message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = posts.filter(
    (post) =>
      post.description.includes(search.toLowerCase()) || post.username.includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col py-4 px-2">
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered input-success w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>User Name</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((post) => (
            <tr key={post._id}>
              <td>
                {post.picturePath.length === 0 ? (
                  <p>No Image</p>
                ) : (
                  <img src={post?.picturePath[0]} alt="Post Image" className="w-12 h-12" />
                )}
              </td>
              <td>{post.username}</td>
              <td>{post.description.slice(0, 50)}</td>
              <td>
                <button
                  className={`btn ${post.isDeleted ? "btn-info" : "btn-error"} btn-xs`}
                  onClick={() => handleDelete(post._id, post.isDeleted)}
                >
                  {post.isDeleted ? "UN BLOCK" : "BLOCK"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
