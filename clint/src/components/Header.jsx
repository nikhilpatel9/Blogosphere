import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun ,FaBell } from 'react-icons/fa';
import { useSelector,useDispatch }from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
//import { Button } from "flowbite-react";

export default function Header() {
    const path = useLocation().pathname;
    const location=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {theme} = useSelector((state) => state.theme);
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm]=useState('');
    const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
    useEffect(()=>{
        
        const urlParams= new URLSearchParams(location.search);
        const searchTermFormUrl =urlParams.get('searchTerm');
        if(searchTermFormUrl){
            setSearchTerm(searchTermFormUrl);
            }

},[location.search]);
useEffect(() => {
const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  fetchNotifications();
  const interval = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds

  return () => clearInterval(interval);
}, []);

    const handleSignOut =async ()=>{
        try {
          const res= await fetch('/api/user/signout',{
            method:'POST',
            });
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
              } else {
                dispatch(signoutSuccess());
          }
        }
        catch(error){
          console.log(error);
        }
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams= new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);

      }
  return (
   <Navbar className='border-b-2'>
    <Link to="/" className='self-center whitespace-nowrap text-sm
    sm:text-xl font-semibold dark:text-white'>
       <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BlogoSphere</span>
    </Link>
    <form onSubmit={handleSubmit}>
        <TextInput
         type='text'
         placeholder='Search...'
         rightIcon={AiOutlineSearch}
         className="hidden lg:inline"
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}
         />
    </form>
    <Button className='w-12 h-10 lg:hidden' color='gray' pill>
         <AiOutlineSearch/>
    </Button>
    <div className='flex gap-3 md:order-2'>
        <Button 
        className='w-12 h-10 hidden sm:inline' 
        color="gray" 
        pill 
        onClick={()=>dispatch(toggleTheme())}
        >
        { theme === 'light' ? <FaSun/> : <FaMoon/>} 
        </Button>
        {currentUser ?(
            <Dropdown
            arrowIcon={false}
            inline
            label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
            >
                <Dropdown.Header>
                    <span className="block text-sm">@{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">{currentUser.email} </span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                </Dropdown.Item>
                
            </Dropdown>
        ):(
             <Link to='/sign-in'>
             <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
         </Link>
        )}
       
        <Navbar.Toggle/>
     </div>
        <Navbar.Collapse>
            <Navbar.Link active = {path==='/'} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active = {path === '/about'} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active = {path ==='/projects'} as={'div'}>
                <Link to='/projects'>Projects</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/contact-us'} as={'div'}>
            <Link to={'/contact-us'}>Contact Us</Link></Navbar.Link>
        </Navbar.Collapse>
        {currentUser && (
        <div className="relative">
          <FaBell
            className="text-2xl cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {notifications.length}
            </span>
          )}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification._id} className="px-4 py-2 hover:bg-gray-100">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
   </Navbar>
  )
}
