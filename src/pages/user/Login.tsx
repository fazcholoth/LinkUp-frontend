
import {Formik,Field,ErrorMessage ,Form} from "formik"
import * as Yup from "yup"
import {Link} from "react-router-dom"
import ApiCalls from "../../services/user/apiCalls"
import { toast } from "react-toastify"
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';
import {useDispatch,useSelector} from "react-redux"
import { setLogin } from "../../state/user"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../state/rooState";


interface LoginFormValues{
    email:string,
    password:string,
    

}
const validationSchema=Yup.object({
    email:Yup.string().email('Invalid email address')
    .required('Email is required'),
    password: Yup.string().required('Password is required'),
})



const Login = () => {
     
    const dispatch=useDispatch()
    const Navigate=useNavigate()
    const isAuth =Boolean(useSelector((state:RootState)=>state?.user?.token))
    

    const initialValues:LoginFormValues={
        email:"",
        password:""
    }
  

    useEffect(()=>{
        isAuth?Navigate("/"):Navigate('/login')
     
     },[isAuth])  
     
     
    const handleSubmit=async(values:LoginFormValues)=>{
        try{
            const {message,token,user}= await ApiCalls.Login(values) 
            dispatch(setLogin({
                user:user,
                token:token
             }))
             localStorage.setItem("userAuth",token)
            toast(message, {
                position: 'top-right',
                hideProgressBar: true,
                closeOnClick: true,
                theme: 'light',
              });
    
        }catch(err){
            console.log(err);
            
        }
    }
  return (
    <div>
    <section className="min-h-screen flex items-stretch text-white bg-slate-50 ">
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            
            <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" >
            </div>
          
            <div className="w-full py-6 z-20">
            <div className="flex justify-end">
              <span className="text-black ">Don't have an account?</span>
              <Link to={"/register"} className="ml-2 text-green-400">Sign up!</Link>
             </div>
                <h1 className="my-6 text-black font-mono text-2xl" >
                    Welcome Back
                    <p className="text-sm my-4">Login into your account</p>
                </h1>
                <div className="items-center justify-center inline-flex">
                    <GoogleOAuthProvider
                  clientId= {import.meta.env.VITE_KEY}
                >
                  <GoogleLogin
                       theme='filled_black'
                       size='medium'
                        shape='circle'
                      onSuccess={async(credentialResponse) => {
                            const {user,token,message}=await ApiCalls.GoogleLogin({jwt:credentialResponse?.credential})
                             dispatch(setLogin({
                                user:user,
                                token:token
                             }))
                             localStorage.setItem("userAuth",token)
                            toast(message, {
                                position: 'top-right',
                                hideProgressBar: true,
                                closeOnClick: true,
                                theme: 'light',
                              });
                            
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                
                </GoogleOAuthProvider>
                    {/* <button className=" bg-black w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">G+</button> */}
                </div>
                <p className="text-black">
                    or continue with
                </p>
                <Formik   initialValues={initialValues}  validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                    <div className=" pt-4">
                    <Field type="email" autoComplete="off" name="email" placeholder="Email" className="block w-full p-2 text-base rounded-sm bg-black" />
                     <ErrorMessage name="email" component="div" className="text-red-500" />                    </div>
                    <div className=" pt-4">
                    <Field type="password" autoComplete="off" name="password" placeholder="Password" className="block w-full p-2 text-base rounded-sm bg-black" />
                     <ErrorMessage name="password" component="div" className="text-red-500" />
                    <Link to="/recover"><p className="text-end text-black">Recover password</p></Link> 
                    </div>
 
                    
                    <div className="px-4 pb-2 pt-4">
                        <button type="submit" className="block w-full p-2 text-md rounded-full bg-black hover:bg-indigo-600 focus:outline-none">login</button>
                    </div>
                </Form>
                </Formik>
            </div>
        </div>
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="w-full px-24 z-10">
                <h1 className="text-5xl font-bold text-left tracking-wide">Welcome back to LinkUp</h1>
                <p className="text-3xl my-4">Connect, Share, and Discover!</p>
            </div>
            
        </div>
    </section>
    </div>
  )
}

export default Login