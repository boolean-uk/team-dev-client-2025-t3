import { useContext, useState } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import { UserContext } from '../../context/user';
import { AuthContext } from '../../context/auth';
import './style.css';
import HeartIcon from '../../assets/icons/heartIcon';
import CommentIcon from '../../assets/icons/commentIcon';
import { post } from '../../service/apiClient';

const Post = ({ postId, authorId, name, date, content, comments = [], likes = 0 }) => {
  const { openModal, setModal } = useModal();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const [commentText, setCommentText] = useState('');

  console.log('posts', postId, authorId, name, date, content, comments, likes);

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal postId={postId} />);
    openModal();
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const onSubmit = async () => {
    await post('comments', { content: commentText, postId }, true, auth.token);
  };

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{date}</small>
          </div>

          {user && user.id === authorId && (
            <div className="edit-icon">
              <p onClick={showModal}>...</p>
            </div>
          )}
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}
        >
          <div className="post-interactions">
            <div className="post-item">
              <HeartIcon />
              <div>Like</div>
            </div>
            <div className="post-item">
              <CommentIcon />
              <div>Comment</div>
            </div>
          </div>

          <p>{!likes && 'Be the first to like this'}</p>
        </section>

        <section>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.author.profile.firstName}
              content={comment.content}
            />
          ))}
        </section>

        <section>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={handleCommentChange}
            />
            <button type="submit">Post</button>
          </form>
        </section>
      </article>
    </Card>
  );
};

export default Post;
