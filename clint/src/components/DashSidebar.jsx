import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie, HiMail, HiBell } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  const [newCounts, setNewCounts] = useState({
    posts: 0,
    users: 0,
    comments: 0,
    messages: 0,
    notifications: 0
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
      resetCount(tabFromUrl);
    }

    // Fetch initial counts
    fetchCounts();

    // Set up SSE connection
    const eventSource = new EventSource('/api/admin/count-updates');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNewCounts(prevCounts => ({
        ...prevCounts,
        [data.type]: prevCounts[data.type] + 1
      }));
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [location.search]);

  const fetchCounts = async () => {
    try {
      const response = await fetch('/api/admin/new-counts');
      if (!response.ok) {
        throw new Error('Failed to fetch counts');
      }
      const data = await response.json();
      setNewCounts(data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const resetCount = async (type) => {
    try {
      await fetch(`/api/admin/reset-count/${type}`, { method: 'POST' });
      setNewCounts(prevCounts => ({
        ...prevCounts,
        [type]: 0
      }));
    } catch (error) {
      console.error(`Error resetting count for ${type}:`, error);
    }
  };

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

  const renderSidebarItem = (to, icon, label, countKey) => (
    <Link to={to} onClick={() => resetCount(countKey)}>
      <Sidebar.Item
        active={tab === countKey}
        icon={icon}
        as='div'
        label={newCounts[countKey]>0?newCounts[countKey]:""}
        labelColor='dark'
      >{label}
      </Sidebar.Item>
    </Link>
  );

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                icon={HiChartPie}
                active={tab === 'dash' || !tab}
                as='div'
                
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
      
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              {renderSidebarItem('/dashboard?tab=posts', HiDocumentText, 'Posts', 'posts')}
              {renderSidebarItem('/dashboard?tab=users', HiOutlineUserGroup, 'Users', 'users')}
              {renderSidebarItem('/dashboard?tab=comments', HiAnnotation, 'Comments', 'comments')}
              {renderSidebarItem('/dashboard?tab=messages', HiMail, 'Messages', 'messages')}
              {renderSidebarItem('/dashboard?tab=notifications', HiBell, 'Notifications', 'notifications')}
            </>
          )}
          <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className="cursor-pointer flex justify-between items-center space-x-2">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
