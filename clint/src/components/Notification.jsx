import { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      {notifications.map((notification) => (
        <Alert key={notification._id} color="info" className="mb-2">
          {notification.message}
        </Alert>
      ))}
    </div>
  );
}