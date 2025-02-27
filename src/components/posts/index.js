import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      console.log('Posts:', posts);
    });
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            postId={post.id}
            authorId={post.user.id}
            name={`${post.user.firstName} ${post.user.lastName}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;
