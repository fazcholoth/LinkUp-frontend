import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import apiCalls from "../../services/user/apiCalls";
import {toast} from "react-toastify"

interface LoginFormValues {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const stepOneValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const stepTwoValidationSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"),''], "Passwords must match"),
});


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email,setEmail]=useState("")

  const initialValues: LoginFormValues = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleForgotPassword = async (values: LoginFormValues) => {
     try{
      const {email}=values
      setEmail(email)
      const {message,error}=await apiCalls.RecoverPassword(values)
      if(message){
        toast(message)
        setStep(2)
      }else if(error){
        toast(error)
      }
     }catch(err){
         toast("internal server error")
     }
  };

  const handlePasswordReset = async (values: LoginFormValues,{ resetForm} : { resetForm: () => void }) => {
    try{
      
      const {message,error}=await apiCalls.VerifyOtp({...values,email})
      if(message){
        toast(message)
      }else if(error){
        toast(error)
      }
     }catch(err){
         toast("internal server error")
     }finally{
      resetForm()
     }
  };

  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white bg-slate-50 ">
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"></div>

          <div className="w-full py-6 z-20">
            {step === 1 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepOneValidationSchema}
                onSubmit={handleForgotPassword}
              >
                <Form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                  <div className="pt-4">
                    <Field
                      type="email"
                      autoComplete="off"
                      name="email"
                      placeholder="Email"
                      className="block w-full p-2 text-base rounded-sm bg-black"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>

                  <div className="px-4 pb-2 pt-4">
                    <button
                      type="submit"
                      className="block w-full p-2 text-md rounded-full bg-black hover:bg-indigo-600 focus:outline-none"
                    >
                      Send OTP
                    </button>
                  </div>
                </Form>
              </Formik>
            )}

            {step === 2 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepTwoValidationSchema}
                onSubmit={handlePasswordReset}
              >
                <Form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                  <div className="pt-4">
                    <Field
                      type="text"
                      autoComplete="off"
                      name="otp"
                      placeholder="Enter OTP"
                      className="block w-full p-2 text-base rounded-sm bg-black"
                    />
                    <ErrorMessage name="otp" component="div" className="text-red-500" />
                  </div>
                  <div className="pt-4">
                    <Field
                      type="password"
                      autoComplete="off"
                      name="newPassword"
                      placeholder="New Password"
                      className="block w-full p-2 text-base rounded-sm bg-black"
                    />
                    <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                  </div>
                  <div className="pt-4">
                    <Field
                      type="password"
                      autoComplete="off"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="block w-full p-2 text-base rounded-sm bg-black"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="px-4 pb-2 pt-4">
                    <button
                      type="submit"
                      className="block w-full p-2 text-md rounded-full bg-black hover:bg-indigo-600 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
            <Link to="/login" className="text-end text-black">
              Back to login
            </Link>
          </div>
        </div>
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">Welcome back to uniVERSE</h1>
            <p className="text-3xl my-4">Connect, Share, and Discover!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
