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
    <div className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="text-3xl font-semibold my-7 text-center">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Alert key={notification._id} color="info" className="relative p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <div className="flex flex-col">
              <p>{notification.message}</p>
              <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
}
