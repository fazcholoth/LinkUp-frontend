import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../state/rooState';
import apiCalls from '../../services/user/apiCalls';
import { setLogin } from '../../state/user';
import { toast } from "react-toastify"
 

const EditProfileForm = () => {
    const dispatch=useDispatch()
 const user =useSelector((state:RootState)=>state.user.user)

  const initialValues = {
    username: user?.username,
    email: user?.email,
    location: '',
    profileImage:user?.profilePic,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
    profileImage: Yup.mixed().test('fileType', 'Only image files are allowed', (value:any) => {
      if (value && value.length) {
        const file = value[0];
        return file;
      }
      return true;
    }),
  });

  
const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (!selectedImage) {
        const { profileImage, ...updatedValues } = values;
        const { user, token } = await apiCalls.EditUser(updatedValues);
        dispatch(setLogin({
          user: user,
          token: token
        }));
        toast("Updated successfully", {
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
  
      } else {
        const {username,email,location } = values;

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append("username", username??"");
        formData.append("email", email??"");
        formData.append("location", location);
        
        
        const { user, token } = await apiCalls.EditUser(formData);
  
        dispatch(setLogin({
          user: user,
          token: token
        }));
  
        toast("Updated successfully", {
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred. Please try again later.", {
        position: 'top-right',
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'light',
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 ">Edit Profile</h2>

          <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-3">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        {/* Current Image */}
                        <div className="mb-4">
                          <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : user?.profilePic }
                            alt="Current Profile"
                            className="w-32 h-32 rounded-full"
                          />
                        </div>

                        {/* Input Field for Changing Image */}
                        <div className="mb-4">
                          <input
                            type="file"
                            name="profileImage"
                            id="profileImage"
                            onChange={handleImageChange}
                            className="file-input file-input-ghost w-full max-w-xs"
                            accept="image/*"
                          />
                          <ErrorMessage name="profileImage" component="div" className="text-red-500" />
                        </div>

                        {/* Username Field */}
                        <div className="mb-4">
                          <label htmlFor="username">Username</label>
                          <Field
                            type="text"
                            name="username"
                            id="username"
                            className="h-10 border mt-1 rounded px-4 w-full bg-black"
                          />
                          <ErrorMessage name="username" component="div" className="text-red-500" />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                          <label htmlFor="email">Email Address</label>
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full  bg-black "
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>

                        {/* Location Field */}
                        <div className="mb-4">
                          <label htmlFor="location">Location</label>
                          <Field
                            type="text"
                            name="location"
                            id="location"
                            className="h-10 border mt-1 rounded px-4 w-full  bg-black"
                          />
                          <ErrorMessage name="location" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
