import { BellAlertIcon} from '@heroicons/react/24/solid'
import {useSelector} from "react-redux"
import { RootState } from '../../../state/rooState';

const BellIcon = () => {
  const notifications = useSelector((state:RootState )=> state.user.notifications);

  return (
    <div className='relative mt-2'>
    {
     notifications.length>0 &&(
  <div className="indicator absolute top-0 right-0 px-1 py-1">
  <span className="indicator-item  badge badge-accent">{notifications.length > 9 ? '9+' : notifications.length}</span> 
  </div>
     )
    }
      <BellAlertIcon className=" w-6 h-6" />
  </div>
  )
}

export default BellIcon