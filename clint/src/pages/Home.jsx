/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categorizedPosts, setCategorizedPosts] = useState({
    programming: [],
    webDevelopment: [],
    softwareEngineering: []
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
      categorizePosts(data.posts);
    }
    fetchPosts();
  }, []);

  const categorizePosts = (posts) => {
    const categorized = {
      programming: [],
      webDevelopment: [],
      softwareEngineering: []
    };

    posts.forEach(post => {
      if (['cpp', 'javascript', 'java'].includes(post.category)) {
        categorized.programming.push(post);
      }
      if (['reactjs', 'nextjs', 'javascript'].includes(post.category)) {
        categorized.webDevelopment.push(post);
      }
      if (['dsa', 'algo', 'nextjs', 'reactjs', 'javascript', 'cpp', 'java'].includes(post.category)) {
        categorized.softwareEngineering.push(post);
      }
    });

    setCategorizedPosts(categorized);
  };

  return (
    <div>
      <div className="relative h-96 bg-gradient-to-r from-purple-500 to-pink-500">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
          alt="Blog Header" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Welcome to my Blog!</h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl">
            Discover articles and tutorials on web development, software engineering, and programming languages.
          </p>
          <Link to='/search' className='mt-8 px-6 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-opacity-90 transition duration-300'>
            Explore All Posts
          </Link>
        </div>
      </div>

      <div className='flex justify-center py-8 px-4 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-6 flex flex-col gap-12 py-12'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-8'>
            <h2 className='text-3xl font-bold text-center'>Recent Posts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className='text-xl text-teal-500 hover:underline text-center font-semibold'>
              View All Posts
            </Link>
          </div>
        )}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Programming" 
              image="https://images.unsplash.com/photo-1542831371-29b0f74f9713"
              category="programming"
            />
            <CategoryCard 
              title="Web Development" 
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              category="webDevelopment"
            />
            <CategoryCard 
              title="Software Engineering" 
              image="https://images.unsplash.com/photo-1605379399642-870262d3d051"
              category="softwareEngineering"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ title, image, category }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      <img src={image} alt={title} className="w-full h-64 object-cover transition duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white text-center">{category.length} posts</p>
        <Link 
          to={`/search?category=${category}`} 
          className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-bold hover:bg-opacity-90 transition duration-300"
        >
          View Posts
        </Link>
      </div>
    </div>
  );
}
