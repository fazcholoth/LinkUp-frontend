import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiCalls from '../../services/user/apiCalls';
import { toast } from "react-toastify"

const Settings = () => {

  const initialValues = {
    oldPassword: '',
    newPassword: '',
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required').min(8, 'Password must be at least 8 characters long'),
  });

  const handleSubmit = async (values: typeof initialValues,{ resetForm }: { resetForm: () => void }) => {
    try {
      const { oldPassword, newPassword } = values;

      console.log(oldPassword,newPassword);
      const {message}=await apiCalls.ChangePassword({
        oldPassword:oldPassword,
        newPassword:newPassword
      })
      resetForm()
       if(message){
        toast(message, {
          position: 'top-right',
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
       }
      
    } catch (error) {
      toast("An error occurred. Please try again later.", {
        position: 'top-right',
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'light',
      });
    }
  };

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 ">Change Password</h2>

          <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-3">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Password Details</p>
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
                        {/* Old Password Field */}
                        <div className="mb-4">
                          <label htmlFor="oldPassword">Old Password</label>
                          <Field
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            className="h-10 border mt-1 rounded px-4 w-full bg-black"
                          />
                          <ErrorMessage name="oldPassword" component="div" className="text-red-500" />
                        </div>

                        {/* New Password Field */}
                        <div className="mb-4">
                          <label htmlFor="newPassword">New Password</label>
                          <Field
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            className="h-10 border mt-1 rounded px-4 w-full bg-black"
                          />
                          <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Change Password
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

export default Settings;
