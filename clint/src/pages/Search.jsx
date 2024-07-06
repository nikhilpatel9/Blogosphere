import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const categoryFromUrl = urlParams.get('category') || 'uncategorized';

        setSidebarData({
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl,
        });

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            try {
                const res = await fetch(`/api/post/getposts?${searchQuery}`);
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts);
                    setLoading(false);
                    setShowMore(data.posts.length === 9);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSidebarData((prev) => ({
            ...prev,
            [id]: value || '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams({
            searchTerm: sidebarData.searchTerm,
            sort: sidebarData.sort,
            category: sidebarData.category,
        });
        navigate(`/search?${urlParams.toString()}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', numberOfPosts);
        const searchQuery = urlParams.toString();

        try {
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (res.ok) {
                const data = await res.json();
                setPosts((prevPosts) => [
                    ...prevPosts,
                    ...data.posts,
                ]);
                setShowMore(data.posts.length === 9);
            }
        } catch (error) {
            console.error("Failed to fetch more posts:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <TextInput
                            placeholder="Search..."
                            type="text"
                            id="searchTerm"
                            value={sidebarData.searchTerm || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort || ''} id="sort">
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Category:</label>
                        <Select onChange={handleChange} value={sidebarData.category || ''} id="category">
                            <option value="uncategorized">Uncategorized</option>
                            <option value="javascript">Javascript</option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="dsa">DSA</option>
                            <option value="algo">Algorithms</option>
                            <option value="other">Other</option>
                        </Select>
                    </div>
                    <Button type="submit" outline gradientDuoTone="purpleToPink">Apply Filters</Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length === 0 && (
                        <p className="text-xl text-gray-500">No Posts found!</p>
                    )}
                    {loading && (
                        <p className="text-xl text-gray-500">Loading...</p>
                    )}
                    {!loading && posts.length > 0 && posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                    {showMore && (
                        <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
