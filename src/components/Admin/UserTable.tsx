import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { User } from "../../state/user";
import apiCalls from "../../services/admin/apiCalls";
import { setUsers } from "../../state/admin";

const UserTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [users, setUser] = useState<User[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await apiCalls.GetAllUsers();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleUser = async (
    userId: string | undefined,
    value: boolean | undefined,
  ) => {
    const payload = {
      id: userId,
      status: !value,
    };

    try {
      const { data, message } = await apiCalls.EditUser(payload);

      if (data) {
        const updatedUsers:User[] = users?.map((user) =>
          user._id === data._id ? data : user
        );
        setUser(updatedUsers);
        dispatch(setUsers(updatedUsers));
      }

      if (message) {
        setTimeout(() => {
          toast(message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
          });
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = users.filter(
    (user) =>
      user.username.includes(search.toLowerCase()) ||
      user.email.includes(search.toLowerCase())
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
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user: User) => (
            <tr key={user._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.profilePic}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.username}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                {user.blocked ? (
                  <div className="badge badge-info">Blocked</div>
                ) : (
                  <div className="badge badge-success">Active</div>
                )}
              </td>
              <td>
                <button
                  className={`btn ${
                    user.blocked ? "btn-warning" : "btn-error"
                  } btn-xs`}
                  onClick={() =>
                    handleUser(
                      user?._id,
                      user?.blocked,
                    
                    )
                  }
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
