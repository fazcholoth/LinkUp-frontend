import NavBar from './components/User/LatoutComponents/NavBar';
import SideBar from './components/User/LatoutComponents/SideBar';
import { Outlet } from 'react-router-dom';
import RightVerticalComponent from './components/User/PostComponents/RightVerticalComponent';
import MobileNavbar from './components/User/LatoutComponents/MobileNavbar';
import { RootState } from './state/rooState';
import { useSelector } from 'react-redux';


const App = () => {
 const userToken=useSelector((state:RootState)=>state?.user?.token)
  if(!userToken){
    return null
  }
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="w-full h-full flex mt-0">
        <div className={`min-w-fit h-full py-5 sm:py-1 `}>
          <NavBar />
          <div className='mt-16'>
            <MobileNavbar/>
          </div>
          <div className=" hidden sm:block md:block mt-20 ">
            <SideBar />
          </div>
        </div>
        <div className="w-full sm:w-4/5 py-5 px-10  overflow-y-auto mt-12 scrollbar-default">
          <Outlet />
        </div>
        <div className="w-4/12 mt-20  hidden sm:block ">
         < RightVerticalComponent/>
        </div>
      </div>
    </div>
  );
};

export default App;
