import instance from "./axiosInstance";

export default {
  // User-related API calls
  Register: async (payload: object) => {
    const response = await instance.post("user/register", payload);
    return response.data;
  },
  GoogleRegister: async (payload: object) => {
    const response = await instance.post("auth/google/register", payload);
    return response.data;
  },
  Login: async (payload: object) => {
    const response = await instance.post("user/login", payload);
    return response.data;
  },
  RecoverPassword: async (payload: object) => {
    const response = await instance.post("user/recoverPassword", payload);
    return response.data;
  },
  ChangePassword:async(payload:object)=>{
    const response=await instance.post("user/changePassword",payload)
    return response.data
  },
  VerifyOtp: async (payload: object) => {
    const response = await instance.post("user/verifyOtp", payload);
    return response.data;
  },
  GoogleLogin: async (payload: object | undefined) => {
    const response = await instance.post("auth/google/login", payload);
    return response.data;
  },
  ValidUser: async () => {
    const response = await instance.get("auth/validUser");
    return response.data;
  },
  EditUser: async (payload: object) => {
    const { data } = await instance.post("user/editProfile", payload);
    return data;
  },
  SearchUser: async (payload: object) => {
    const response = await instance.post("user/searchUser", payload);
    return response.data;
  },
  GetUser: async (payload: string | undefined) => {
    const { data } = await instance.get(`user/${payload}`);
    return data;
  },
  GetFollowing: async () => {
    const { data } = await instance.get("user/following/all");
    return data;
  },
  FollowUser:async(payload:object)=>{
    const {data}=await instance.post("user/follow",payload)
    return data
  },
  UnFollowUser:async(payload:object)=>{
    const {data}=await instance.post("user/unfollow",payload)
    return data
  },
  GetFollowers: async () => {
    const { data } = await instance.get("user/followers/all");
    return data;
  },

  // Post-related API calls
  CreatePost: async (payload: object | undefined) => {
    const response = await instance.post("post", payload);
    return response.data;
  },
  GetFeeds: async () => {
    const response = await instance.get("post/timeline");
    return response.data;
  },
  LikePost: async (id: string) => {
    const response = await instance.get(`post/like/${id}`);
    return response.data;
  },
  GetUserPosts: async (id: string | undefined) => {
    const response = await instance.get(`post/${id}`);
    return response.data;
  },
  DeletePost: async (payload: object) => {
    const response = await instance.post("post/delete", payload);
    return response.data;
  },
  SavePost: async (payload: object) => {
    const response = await instance.post("post/save", payload);
    return response.data;
  },
  GetSavedPost: async () => {
    const response = await instance.get("post/saved/all");
    return response.data;
  },
  ReportPost: async (payload: object) => {
    const { data } = await instance.post("post/report", payload);
    return data;
  },

  // Comment-related API calls
  PostComment: async (payload: object) => {
    const { data } = await instance.post("/comments", payload);
    return data;
  },
  GetComment: async (payload: string) => {
    const { data } = await instance.get(`/comments/${payload}`);
    return data;
  },
  DeleteComment: async (payload: object) => {
    const { data } = await instance.post(`comments/delete`, payload);
    return data;
  },
  LikeComment:async(payload:object)=>{
  const {data} =await instance.post('comments/like',payload)
  return data
  },
  ReplyComment:async(payload:object)=>{
    const {data} =await instance.post('comments/reply',payload)
    return data
  },

  // Notification-related API calls
  GetNotifications: async () => {
    const { data } = await instance.get('/notification');
    return data;
  },
  ClearNotifications: async () => {
    const { data } = await instance.get('/notification/delete');
    return data;
  },

  // Messaging-related API calls
  CreateConversation: async (payload:object) => {
    const { data } = await instance.post("/conversations",payload);
    return data;
  },
  GetConversation: async () => {
    const { data } = await instance.get("/conversations");
    return data;
  },
  GetMessages: async (payload: string) => {
    const { data } = await instance.get(`/messages/${payload}`);
    return data;
  },
  SendMessage: async (payload: object) => {
    const { data } = await instance.post(`/messages`, payload);
    return data;
  },
  GetRoomMembers:async (payload: string) => {
    const { data } = await instance.get(`/conversations/${payload}`);
    return data;
  },
};
