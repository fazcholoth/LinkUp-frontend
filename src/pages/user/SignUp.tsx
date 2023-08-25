import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiCalls from '../../services/user/apiCalls';
import {Link,useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import { RootState } from "../../state/rooState";



interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim() // Remove leading and trailing whitespace
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username can have a maximum of 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});


const SignUp = () => {
  const Navigate=useNavigate()
  const isAuth =Boolean(useSelector((state:RootState)=>state.user.token))

  useEffect(()=>{
    if(isAuth){
      return Navigate("/")
    }
  },[])
 

  const [initialValues] = useState<SignUpFormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const {message,error} = await ApiCalls.Register(values);
      
        if (message) {
         toast(message, {
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
        });
      } else {
        toast(`❌ ${error}`, {
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleGoogleSignup = async (credentialResponse: { credential?: string | undefined }): Promise<void> => {
    const token: string | undefined = credentialResponse?.credential;
  
    if (token) {
      try {
        const data: any = jwtDecode(token);
        const {message,error} = await ApiCalls.GoogleRegister(data);
        if (message) {
          toast(message, {
           position: 'top-right',
           hideProgressBar: true,
           closeOnClick: true,
           theme: 'dark',
         });
       } else {
         toast(`❌ ${error}`, {
           position: 'top-right',
           hideProgressBar: true,
           closeOnClick: true,
           theme: 'dark',
         });
       }
      } catch (error) {
        console.error('Error during Google signup:', error);
        // Handle the error accordingly
      }
    } else {
      console.log('Token is undefined');
    }
  };
  
  

  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white bg-slate-50">
      <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="w-full px-24 z-10">
                <h1 className="text-5xl font-bold text-left tracking-wide">Unlock the uniVERSE</h1>
                <p className="text-3xl my-4"> Join our Social Community Today!</p>
            </div>
            
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" >
            </div>
          
            <div className="w-full py-6 z-20">
            <div className="flex justify-end">
              <span className="text-black">Have an account?</span>
             <Link to={"/login"} className="ml-2 text-green-400">Sign in!</Link>
             </div>
             <h1 className="my-6 text-black font-mono text-2xl" >
                    Getting Started With uniVERSE</h1>
                    <div className="items-center justify-center inline-flex">
                    <GoogleOAuthProvider 
                      clientId={import.meta.env.VITE_KEY}
                      >

                  <GoogleLogin
                     theme='filled_black'
                     size='medium'
                      shape='circle'
                      text='signup_with'
                      onSuccess={handleGoogleSignup}
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
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pt-4">
                <Field type="text" autoComplete="off"  name="username" placeholder="Username" className="block w-full p-2 text-base rounded-sm bg-black" />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>
              <div className="pt-4">
                <Field type="email" autoComplete="off"   name="email" placeholder="Email" className="block w-full p-2 text-base rounded-sm bg-black" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="pt-4">
                <Field type="password" autoComplete="off" name="password" placeholder="Password" className="block w-full p-2 text-base rounded-sm bg-black" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="pt-4">
                <Field type="password" autoComplete="off" name="confirmPassword" placeholder="Confirm Password" className="block w-full p-2 text-base rounded-sm bg-black" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>
              <div className="px-4 pb-2 pt-4">
                <button type="submit"  className="block w-full p-2 text-md rounded-full bg-black hover:bg-indigo-600 focus:outline-none">
                  Create Account
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
