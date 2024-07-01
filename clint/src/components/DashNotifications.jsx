import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';

export default function DashNotifications() {
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editing, setEditing] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchNotifications();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setError('Please enter a message');
      return;
    }
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setSuccess('Notification sent successfully');
      setMessage('');
      fetchNotifications();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!message) {
      setError('Please enter a message');
      return;
    }
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setSuccess('Notification updated successfully');
      setMessage('');
      setEditing(null);
      fetchNotifications();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setSuccess('Notification deleted successfully');
      fetchNotifications();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-3 w-full'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Notifications</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="text"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          {editing ? 'Update Notification' : 'Send Notification'}
        </Button>
      </form>
      {error && <Alert color="failure" className="mt-4">{error}</Alert>}
      {success && <Alert color="success" className="mt-4">{success}</Alert>}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Notifications</h2>
        {notifications.map((notification) => (
          <div key={notification._id} className="mb-2 flex justify-between items-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
            <span>{notification.message}</span>
            <div className='flex'>
              <Button
               type="submit" gradientDuoTone="purpleToPink"
                onClick={() => {
                    handleUpdate
                  setEditing(notification._id);
                  setMessage(notification.message);
                }}
              >
                Edit
              </Button>
              <Button
               type="submit" gradientDuoTone="redToBlue"
                onClick={() => handleDelete(notification._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
