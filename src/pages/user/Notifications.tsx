import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../state/user/index';
import apiCalls from '../../services/user/apiCalls';
import { RootState } from '../../state/rooState';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.user.notifications) ?? [];

  useEffect(() => {
    const interval = setInterval(() => {
      getNotifications();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getNotifications = async () => {
    try {
      const response = await apiCalls.GetNotifications();
      const data = response.data;
      dispatch(setNotification(data));
    } catch (error) {
      console.log(error);
    }
  };

  const clearNotifications =async () => {
    await apiCalls.ClearNotifications()
    dispatch(setNotification([]));
  };

  if (notifications.length <= 0) {
    return (
      <div className="badge badge-info px-3 py-3 h-auto w-full mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>You have no recent notifications.</span>
      </div>
    );
  }

  return (
    <div className='bg-gray-100 mt-5 rounded-md'>
    <div className="flex justify-between items-center p-2">
      <h2 className="text-lg font-medium">Notifications</h2>
      <button className="text-sm text-gray-500 hover:text-gray-700" onClick={clearNotifications}>
        Clear All
      </button>
    </div>
    <div className="overflow-y-scroll scrollbar-hide h-[390px]"> {/* Add max height and scroll */}
      {notifications.map((notification, index) => (
        <div className="flex flex-row justify-start md:justify-start items-center mt-6 mx-5 my-2 chat chat-start" key={index}>
          <div className="bg-gray-300 rounded-full px-5 py-5 text-black">{notification}</div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Notifications;
