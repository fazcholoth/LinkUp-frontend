import { useState, useEffect ,useRef} from "react";
import { User } from "../../../state/user";
import apiCalls from "../../../services/user/apiCalls";
import UserAvatar from "../ProfileComponent/UserAvatar";


const InputSection = ({ userId,setConversation }: { userId: string,setConversation: (conversation: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestion();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(()=>{
    const handleClick=(event:any)=>{
        if(inputRef?.current&&!inputRef?.current?.contains(event.target)){
         setHideSuggestions(false)
        }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick);
    };
   })
    

  const getSuggestion = async () => {
    try {
      if(searchQuery.trim()!==""){
        const { users } = await apiCalls.SearchUser({ query: searchQuery });
        const filteredSuggestions = users.filter((user: any) => user._id !== userId);

         setSuggestions(filteredSuggestions);
         setHideSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  };

  const handleSuggestionClick = async(suggestion: User) => {
    if(suggestion?._id){
      try {
        const {room}=await apiCalls.CreateConversation({receiverId:suggestion?._id})
        
        setConversation((prevConversations:any) => [...prevConversations, room]); 
      } catch (error) {
        console.log(error);   
      }
      finally{
        setSearchQuery("")

      }
    }
    };

  return (
    <div className="relative px-2 py-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-inherit h-10 rounded border-black border-b-2 outline-none"
        value={searchQuery}
        onChange={({ target }) => { setSearchQuery(target.value); setHideSuggestions(false); }}
        onFocus={()=>{setHideSuggestions(true)}}
        ref={inputRef}
      />
      {hideSuggestions && suggestions?.length > 0 && (
        <ul className="absolute left-0 w-full bg-white rounded-b-lg mt-1 px-3 py-2 text-gray-700 shadow-lg z-10 overflow-y-scroll scrollbar-default max-h-36">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer py-3 hover:bg-gray-200 rounded"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className='flex flex-row px-1'>
                <UserAvatar username={suggestion?.username} profilePic={suggestion?.profilePic} isOnline={false} width={6} hight={6} />
                <div className='px-2'>{suggestion?.username}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSection;
