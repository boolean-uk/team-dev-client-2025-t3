import { useState, useContext } from 'react';
import useModal from '../../hooks/useModal';
import ProfileCircle from '../profileCircle';
import { UserContext } from '../../context/user';
import { AuthContext } from '../../context/auth';
import { post } from '../../service/apiClient';
import './style.css';
import Button from '../button';

const CreatePostModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
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

    post('posts', { text }, true, auth.token).then(() => {
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
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreatePostModal;
