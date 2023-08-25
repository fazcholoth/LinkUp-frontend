import { createSlice } from "@reduxjs/toolkit";

export interface User {
    _id:string
    googleId?: string;
    username: string;
    email: string;
    password?: string;
    profilePic?: string;
    profileView?: number;
    impression?: number;
    online?: boolean;
    blocked?: boolean;
    chatUsers?: [];
    createdAt?: Date;
    followers?: [];
    following?: [];
    notifications?: [];
    accountPrivate?: boolean;
    isEmailVerified?: boolean;
}

export interface Post {
    _id:string
  userId: string;
  username: string;
  description: string;
  picturePath:string[];
  userPicturePath: string;
  likes: { [userId: string]: boolean};
  createdAt:string;
  savedBy:string[];
  isDeleted:boolean;
 
}


export interface AuthState {
  user: User | null;
  token: string | null;
  posts: Post[];
  notifications:[];
  isToggle:Boolean;
  isVisible:string[];
  commentLength:{[key: string]: number;};
  isOnline:string[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  posts: [],
  isToggle:true,
  isVisible:[],
  notifications:[],
  commentLength:{},
  isOnline:[],
};

const userSlice = createSlice({
   name: "user",
   initialState,

  reducers: {
    setLogin: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    },

    setPosts: (state, action) => {
    state.posts = action.payload.posts;
    },
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload;
      }
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user.following = action.payload;
      }
    },
    setNotification:(state,action)=>{
     state.notifications=action.payload
    },
    setPost: (state, action) => {
    const newPosts = state.posts.map((post) => {
    if (post._id === action.payload.post._id) {
    return action.payload.post;
    }
    return post;
    });
    state.posts = newPosts;
    },

    setSideBar:(state)=>{
    state.isToggle=!state.isToggle
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
      state.isToggle = true;
      state.notifications = [];
      state.isVisible=[];
      state.commentLength={};
    },
    setComment: (state, action) => {
      const postId = action.payload;
      const index = state.isVisible.indexOf(postId);

      if (index !== -1) {
        return {
          ...state,
          isVisible: state.isVisible.filter((id) => id !== postId),
        };
      } else {
        return {
          ...state,
          isVisible: [...state.isVisible, postId],
        };
      }
    },
    setCommentLength:(state,action)=>{
     state.commentLength={...state.commentLength,...action.payload}
    },
    setIsOnline:(state,action)=>{
     state.isOnline=action.payload
    },
  },
});


export const { setLogin, setPosts, setPost,setSideBar,setFollowers,setCommentLength,
              setFollowing,setNotification,setLogout,setComment,setIsOnline} = userSlice.actions;
export default userSlice.reducer;
