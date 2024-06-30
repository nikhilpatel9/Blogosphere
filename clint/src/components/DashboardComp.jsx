import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText, HiMail } from 'react-icons/hi';
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthMessages, setLastMonthMessages] = useState(0);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, postRes, commentRes, messageRes] = await Promise.all([
                    fetch('/api/user/getusers?limit=5'),
                    fetch('/api/post/getposts?limit=5'),
                    fetch('/api/comment/getcomments?limit=5'),
                    fetch('/api/contact/messages?limit=5')
                ]);

                const userData = await userRes.json();
                const postData = await postRes.json();
                const commentData = await commentRes.json();
                const messageData = await messageRes.json();

                if (userRes.ok) {
                    setUsers(userData.users);
                    setTotalUsers(userData.totalUsers);
                    setLastMonthUsers(userData.lastMonthUsers);
                }

                if (postRes.ok) {
                    setPosts(postData.posts);
                    setTotalPosts(postData.totalPosts);
                    setLastMonthPosts(postData.lastMonthPosts);
                }

                if (commentRes.ok) {
                    setComments(commentData.comments);
                    setTotalComments(commentData.totalComments);
                    setLastMonthComments(commentData.lastMonthComments);
                }

                if (messageRes.ok) {
                    setMessages(messageData.messages);
                    setTotalMessages(messageData.totalMessages);
                    setLastMonthMessages(messageData.lastMonthMessages);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchData();
        }
    }, [currentUser]);

    return (
        <div className="p-3 md:mx-auto">
            <div className="flex-wrap flex gap-4 justify-center">
                {/* Total Users Card */}
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                            <p className="text-2xl">{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className="text-gray-500"> Last month</div>
                    </div>
                </div>
                {/* Total Comments Card */}
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
                            <p className="text-2xl">{totalComments}</p>
                        </div>
                        <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className="text-gray-500"> Last month</div>
                    </div>
                </div>
                {/* Total Posts Card */}
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                            <p className="text-2xl">{totalPosts}</p>
                        </div>
                        <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className="text-gray-500"> Last month</div>
                    </div>
                </div>
                {/* Total Messages Card */}
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-500 text-md uppercase">Total Messages</h3>
                            <p className="text-2xl">{totalMessages}</p>
                        </div>
                        <HiMail className="bg-blue-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthMessages}
                        </span>
                        <div className="text-gray-500"> Last month</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4 mx-auto justify-center">  
                {/* Recent Users Table */}
            <div className="flex flex-col w-full md:w-auto shadow-md p-2
            rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent Posts</h1>
                <Button outline gradientDuoTone="purpleToPink">
                    <Link to="/dashboard?tab=users">See all</Link>
                </Button>
            </div>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell >User Image</Table.HeadCell>
                    <Table.HeadCell >Username</Table.HeadCell>
                </Table.Head>
                
                    {users && users.map((user) => (
                        <Table.Body key={user.id} className="divide-y">
                            <Table.Row className="bd-white dark:border-gray-700
                                dark:bg-gray-800">
                                <Table.Cell className="flex items-center space-x-4 dark:text-white">
                                <img
                                    src={user.profilePicture}
                                    alt="user"
                                    className="w-10 h-10 rounded-full bg-gray-500"
                                />
                                <span className="text-sm font-medium">{user.email}</span>
                            </Table.Cell>
                            <Table.Cell className="text-sm text-gray-500 dark:text-gray-400">{user.username}</Table.Cell>
                            </Table.Row>
                            
                        </Table.Body>
                    ))}
            </Table>
        </div>

        {/* Recent Comments Table */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2
            rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent Posts</h1>
                <Button outline gradientDuoTone="purpleToPink">
                    <Link to="/dashboard?tab=comments">See all</Link>
                </Button>
            </div>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell >Comment Content</Table.HeadCell>
                    <Table.HeadCell >Likes</Table.HeadCell>
                </Table.Head>
                
                    {comments && comments.map((comment) => (
                        <Table.Body key={comment.id} className="divide-y">
                            <Table.Row className="bd-white dark:border-gray-700
                                dark:bg-gray-800">
                            <Table.Cell className="w-96">
                                <p className="text-sm text-gray-900 dark:text-white line-clamp-2">{comment.content}</p>
                            </Table.Cell>
                            <Table.Cell className="text-sm text-gray-500 dark:text-gray-400">{comment.numberOfLikes}</Table.Cell>
                            </Table.Row>
                            
                        </Table.Body>
                    ))}
                
            </Table>
        </div>
        

            <div className="flex flex-col w-full md:w-auto shadow-md p-2
            rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                    <h1 className="text-center p-2">Recent Posts</h1>
                    <Button outline gradientDuoTone='purpleToPink' >
                        <Link to={'/dashboard?tab=posts'}>
                        See all</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>
                           Post image 
                        </Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                    </Table.Head>
                    {
                        posts && posts.map((post)=>(
                            <Table.Body key={post.id} className="divide-y">
                                <Table.Row className="bd-white dark:border-gray-700
                                dark:bg-gray-800">
                                    <Table.Cell className="">
                                        <img 
                                        src={post.image}
                                        alt='user'
                                        className="w-14 h-10 rounded-md bg-gray-500"/>
                                    </Table.Cell>
                                    <Table.Cell className="w-96">
                                      {post.title}
                                    </Table.Cell>
                                    <Table.Cell className="w-5">
                                      {post.category}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>

                    ))}
                </Table>
            </div>
             {/* Recent Comments Table */}
             <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">Recent Messages</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard?tab=comments'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Messages Content</Table.HeadCell>
                            <Table.HeadCell>User email</Table.HeadCell>
                        </Table.Head>
                        {
                            messages && messages.map((message) => (
                                <Table.Body key={message.id} className="divide-y">
                                    <Table.Row className="bd-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="w-96">
                                            <p className="line-clamp-2">{message.message}</p>
                                        </Table.Cell>
                                        <Table.Cell>{message.email}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))
                        }
                    </Table>
                </div>
        </div>
    </div>
  )
}
