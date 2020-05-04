import React, { useState, useEffect } from 'react';
import Posts from './post';
import Pagination from './Pagination';
import axios from 'axios';

const Table = () => {
  // default for post
  const [posts, setPosts] = useState([]);
  //above code is the same as
  // state={
  //   posts:[]
  // } so we don't need to call likt this.setState(), we can just call set post
  const [loading, setLoading] = useState(false);
  // start at page one
  const [currentPage, setCurrentPage] = useState(1);
  // how many do we want per page
  const [postsPerPage] = useState(3);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
    //[] mimic component did mount, it only runs when it mounts
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // console.log('the posts are', posts);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
