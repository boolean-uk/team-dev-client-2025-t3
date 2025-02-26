import { useState, useContext } from 'react';
import useModal from '../../hooks/useModal';
import ProfileCircle from '../profileCircle';
import { UserContext } from '../../context/user';
import { AuthContext } from '../../context/auth';
import { patch } from '../../service/apiClient';
import './style.css';
import Button from '../button';

const EditPostModal = ({ postId }) => {
  const { closeModal } = useModal();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const name = `${user.firstName} ${user.lastName}`;
  const userInitials = name.match(/\b(\w)/g);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    setMessage('Submit button was clicked! Closing modal in 2 seconds...');

    patch(`posts/${postId}`, { text }, true, auth.token).then(() => {
      setText('');
    });

    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 2000);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <ProfileCircle initials={userInitials} />
        </div>
        <div className="post-user-name">
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="Edit your post"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Update Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditPostModal;
