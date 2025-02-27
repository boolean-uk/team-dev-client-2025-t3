import { useState, useContext } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import DashboardStudent from '../../components/dashboardStudent';
import useModal from '../../hooks/useModal';
import ProfileCircle from '../../components/profileCircle';
import { UserContext } from '../../context/user';
import './style.css';
import { users } from '../../service/mockData';

const Dashboard = () => {
  const user = useContext(UserContext);
  const [searchVal, setSearchVal] = useState('');
  console.log('Usersindash:', user);

  const { openModal, setModal } = useModal();

  if (!user) {
    return <p>Loading...</p>;
  }

  const name = `${user.firstName} ${user.lastName}`;
  const userInitials = name.match(/\b(\w)/g);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Separate users based on their role and cohortId
  const students = users.filter((user) => user.role === 'STUDENT');
  const teachers = users.filter((user) => user.role === 'TEACHER');
  const myCohortStudents = students.filter((student) => student.cohortId === user.cohortId);

  console.log('Students:', user);
  // Create a function to run on user interaction
  const showModal = () => {
    setModal('Create a post', <CreatePostModal />);
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
              {myCohortStudents.map((student) => (
                <DashboardStudent
                  key={student.id}
                  name={`${student.firstName} ${student.lastName}`}
                  specialism={student.specialism}
                />
              ))}
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
              {students.map((student) => (
                <DashboardStudent
                  key={student.id}
                  name={`${student.firstName} ${student.lastName}`}
                  specialism={student.specialism}
                />
              ))}
            </Card>
            <Card>
              <h4>Teachers</h4>
              {teachers.map((teacher) => (
                <DashboardStudent
                  key={teacher.id}
                  name={`${teacher.firstName} ${teacher.lastName}`}
                  specialism={teacher.specialism}
                />
              ))}
            </Card>
          </>
        )}
      </aside>
    </>
  );
};

export default Dashboard;
