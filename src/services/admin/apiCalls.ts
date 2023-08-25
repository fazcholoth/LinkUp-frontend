import instance from "./axiosInstance";



export default {

AdminLogin: async (payload:object) => {
  const response = await instance.post("admin/login", payload);
  return response.data;
},
GetCurrentActivites:async()=>{
  const response = await instance.get("admin/activity");
  return response.data;
},
GetAllUsers:async()=>{
  const response = await instance.get("admin/users");
  return response.data;
},

EditUser:async(payaload:object)=>{
  const response=await instance.post("admin/edit-user",payaload)
  return response.data
},
 DeletePost:async(payaload:object)=>{
  const response=await instance.post("post/delete",payaload)
  return response.data
},

GetReportedPost:async()=>{
  const {data}= await instance.get("post/report/all")
  return data
}
,
GetPosts:async()=>{
  const {data}= await instance.get("admin/posts")
  return data
},

DismissReport:async(payaload:object)=>{
  const {data}=await instance.post("post/report/delete",payaload)
  return data
},

};
