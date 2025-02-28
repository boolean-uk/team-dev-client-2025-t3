import Post from '../post';

const Posts = ({ posts }) => {
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
