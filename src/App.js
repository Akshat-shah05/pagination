import './App.css';
import axios from 'axios';
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import { useState, useEffect } from 'react';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res  = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false);
    }

    fetchPosts();
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

  // page changing mechanism

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3"> Pagination </h1>
      <Posts posts={currentPost} loading={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
