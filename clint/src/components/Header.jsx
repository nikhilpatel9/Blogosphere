import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun, FaBell } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const notificationRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;
      try {
        const res = await fetch('/api/notifications/getNotifications');
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
          setUnreadNotifications(data.filter(notification => !notification.read).length);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 1000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      try {
        const res = await fetch(`/api/notifications/markAllAsRead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: currentUser._id }),
        });
        
        if (res.ok) {
          // Update local state
          setNotifications(prevNotifications => 
            prevNotifications.map(notification => ({ ...notification, read: true }))
          );
          setUnreadNotifications(0);
        } else {
          console.error('Failed to mark notifications as read');
        }
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    }
  };

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BlogoSphere</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-3 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
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
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
          </Link>
        )}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="relative">
              <FaBell
                className={`text-4xl cursor-pointer ${unreadNotifications > 0 ? 'text-blue-500' : 'text-gray-400'}`}
                onClick={handleNotificationClick}
              />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                  {unreadNotifications}
                </span>
              )}
            </div>
          }
        >
          <Dropdown.Header className="flex justify-between items-center text-lg font-semibold p-4 border-b sticky top-0 bg-opacity-90 backdrop-blur-sm">
            <span>Notifications</span>
            <Link to="/notifications" className="text-blue-500 hover:underline">
              See All
            </Link>
          </Dropdown.Header>
          <Dropdown.Item>
            <div
              className="w-80 dark:bg-gray-800 bg-white rounded-lg shadow-lg overflow-hidden z-20 max-h-[80vh] overflow-y-auto border dark:border-gray-700 border-gray-200"
              style={{ top: 'calc(100% + 10px)' }}
            >
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${notification.read ? 'opacity-100' : ''} transition-all duration-150 ease-in-out`}
                    >
                      <p className="text-sm mb-1 dark:text-gray-100 text-gray-900">{notification.message}</p>
                      <p className="text-xs dark:text-gray-100 text-gray-900">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={`px-4 py-6 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact-us'} as={'div'}>
          <Link to={'/contact-us'}>Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}