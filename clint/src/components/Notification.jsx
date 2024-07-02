import { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications/getNotifications`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [currentUser.token]);

  return (
    <div className={`max-w-4xl mx-auto p-4 w-full dark:bg-gray-900 dark:text-gray-100`}>
      <h1 className={`text-4xl font-bold mb-8 text-center dark:text-gray-100`}>
        Notifications
      </h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Alert
              key={notification._id}
              color="info"
              className="relative p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-blue-200 dark:border-gray-700 bg-blue-50 border-blue-200"
            >
              <div className="flex flex-col">
                <p className='text-lg dark:text-gray-900 text-gray-800'>
                  {notification.message}
                </p>
                <div className="absolute bottom-2 right-2 text-xs dark:text-gray-900 text-gray-900">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
            </Alert>
          ))
        ) : (
          <div className="text-center">
            <p className="text-lg dark:text-gray-400 text-gray-500">
              No notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
