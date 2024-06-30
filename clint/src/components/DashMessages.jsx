import { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashMessages() {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/contact/messages?limit=9`);
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages);
          if (data.messages.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchMessages();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = messages.length;
    try {
      const res = await fetch(`/api/contact/messages?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, ...data.messages]);
        if (data.messages.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await fetch(`/api/contact/delete/${messageId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => prev.filter((message) => message._id !== messageId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  if (!currentUser.isAdmin) {
    return <p>You are not authorized to view this page</p>;
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {messages.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Message</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {messages.map((message) => (
                <Table.Row key={message._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{message.name}</Table.Cell>
                  <Table.Cell>{message.email}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleMessageClick(message)}
                      className='text-blue-500 hover:underline'
                    >
                      View Message
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => handleDeleteMessage(message._id)}
                      gradientDuoTone='pinkToOrange'
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no messages yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Message Details</Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div>
              <p><strong>Name:</strong> {selectedMessage.name}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Message:</strong> {selectedMessage.message}</p>
              <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}