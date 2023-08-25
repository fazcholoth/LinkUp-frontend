import { Outlet } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";

const App= () => {
  return (
    <div
    className="h-screen w-full  duration-500 ease-in-out transform"
  >
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="w-full h-full flex ">
        <div className="w-[20%] min-w-fit h-full ">
          <Navbar />
        </div>
        <div className="w-[80%] overflow-y-auto max-h-[100%] py-10 px-2 hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;
