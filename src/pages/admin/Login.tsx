import { Formik, Field, Form, ErrorMessage} from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ApiCalls from "../../services/admin/apiCalls";
import { setAdLogin } from "../../state/admin";
import { useDispatch } from "react-redux";
import {useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/rooState";



interface LoginFormValues{
    email:string,
    password:string,
}


const AdLogin = () => {
  const Navigate=useNavigate()
  const isAuth =Boolean(useSelector((state:RootState)=>state.admin.adminToken))

useEffect(()=>{
   isAuth?Navigate("/admin"):Navigate('/admin/login')
},[isAuth])  

    const dispatch=useDispatch()


    const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues:LoginFormValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleSubmit=async(values:LoginFormValues)=>{
    try{
        const {message,token,admin}= await ApiCalls.AdminLogin(values) 
        dispatch(setAdLogin({
            admin:admin,
            adminToken:token
         }))
         localStorage.setItem("adminAuth",token)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-50">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Admin Login
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs  sm:text-sm tracking-wide text-gray-600"
                >
                  Email Address:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdLogin;
