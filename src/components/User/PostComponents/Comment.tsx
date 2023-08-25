import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { setComment } from '../../../state/user';
import { useDispatch ,useSelector} from 'react-redux';
import { RootState } from '../../../state/rooState';

interface props{
  postId:string
}

export const Comment = ({postId}:props) => {
const dispatch=useDispatch()
const length=useSelector((state:RootState)=>state.user.commentLength)
const commentNo=length[postId]??0

  return (
    <div className='flex'>
        <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6 cursor-pointer' onClick={()=>{dispatch(setComment(postId))}}/>
       <div className=" text-xs py-1 pl-1 text-blue-500">{commentNo} comments</div>
    </div>
  );
};
