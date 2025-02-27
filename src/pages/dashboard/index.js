import { useState, useContext } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import ProfileCircle from '../../components/profileCircle';
import { UserContext } from '../../context/user';
import './style.css';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const user = useContext(UserContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  const name = `${user.firstName} ${user.lastName}`;
  const userInitials = name.match(/\b(\w)/g);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <ProfileCircle initials={userInitials} />
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
        </Card>

        {user.role === 'STUDENT' && (
          <>
            <Card>
              <h4>My Cohort</h4>
            </Card>
          </>
        )}

        {user.role === 'TEACHER' && (
          <>
            <Card>
              <h4>Cohort</h4>
            </Card>
            <Card>
              <h4>Students</h4>
            </Card>
            <Card>
              <h4>Teachers</h4>
            </Card>
          </>
        )}
      </aside>
    </>
  );
};

export default Dashboard;
