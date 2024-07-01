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
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications/getNotifications`);
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    if(currentUser.isAdmin){
    fetchNotifications();
    }
  }, [currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setError('Please enter a message');
      return;
    }
    if (editing) {
      await handleUpdate(editing);
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/notifications/create', {
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
     
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/notifications/update/${id}`, {
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
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notifications/delete/${id}`, {
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
          onChange={(e) => {
            setMessage(e.target.value);
            setError(null);  // Clear error on input change
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          {editing ? 'Update Notification' : 'Send Notification'}
        </Button>
      </form>
      {error && <Alert color="failure" className="mt-4">{error}</Alert>}
      {success && <Alert color="success" className="mt-4">{success}</Alert>}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sent Notifications</h2>
        {notifications.map((notification) => (
          <div key={notification._id} className="mb-2 flex justify-between items-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
            <span>{notification.message}</span>
            <div className='flex gap-2'>
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => {
                  setEditing(notification._id);
                  setMessage(notification.message);
                  setError(null);  // Clear error on edit
                }}
              >
                Edit
              </Button>
              <Button
                gradientDuoTone="redToBlue"
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
