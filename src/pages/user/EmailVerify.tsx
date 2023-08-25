import { Link ,useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import axios from "axios"
import { BASE_URL } from "../../constants"

 const EmailVerify = () => {
    const [message,setMessage]=useState<string>("")
    const params =useParams()
    useEffect(() => {
      const timer = setTimeout(verifyEmail,0);
  
      return () => {
        clearTimeout(timer);
      };     
    },[])

    const verifyEmail=async()=>{
      try{
          const url =`${BASE_URL}/auth/${params.userId}/verify/${params.token}`
          const {data}=await axios.get(url)
          setMessage(data?.message)
      }catch(err){
          console.log(err);
          
      }
    
  }
    
  return (
    <div>
 <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-widest">
        {message}
      </h1>
      <button className="mt-5">
        <span className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          <Link to="/login">Login to continue..</Link>
        </span>
      </button>
    </main>
    </div>
  )
}
export default EmailVerify