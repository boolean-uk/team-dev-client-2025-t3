import { useContext } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import { UserContext } from '../../context/user';
import './style.css';

const Post = ({ postId, authorId, name, date, content, comments = [], likes = 0 }) => {
  const { openModal, setModal } = useModal();
  const user = useContext(UserContext);

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal postId={postId} />);
    openModal();
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
            <div>Like</div>
            <div>Comment</div>
          </div>

          <p>{!likes && 'Be the first to like this'}</p>
        </section>

        <section>
          {comments.map((comment) => (
            <Comment key={comment.id} name={comment.name} content={comment.content} />
          ))}
        </section>
      </article>
    </Card>
  );
};

export default Post;
