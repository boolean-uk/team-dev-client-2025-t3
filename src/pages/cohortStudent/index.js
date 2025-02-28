import { useState, useEffect, useContext } from 'react';
import Card from '../../components/card';
import { UserContext } from '../../context/user';
import { getCohort } from '../../service/apiClient';
import './style.css';

const CohortStudent = () => {
  const user = useContext(UserContext);
  const [cohort, setCohort] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(user);
  useEffect(() => {
    if (user && user.cohortId) {
      getCohort(user.cohortId).then((data) => {
        console.log('Cohort:', data);
        setCohort(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const students = cohort.users.filter((user) => user.role === 'STUDENT');
  const teachers = cohort.users.filter((user) => user.role === 'TEACHER');

  const getUserInitials = (firstName, lastName) => {
    const name = `${firstName} ${lastName}`;
    return name.match(/\b(\w)/g).join('');
  };

  return (
    <>
      <main className="main">
        <Card className="card">
          <h1 className="section-title">My Cohort</h1>
          <div key={cohort.id}>
            <h2 className="sub-title">
              {cohort.name ?? 'N/A'}, {cohort.id ?? 'N/A'}
            </h2>
            <h3 className="date">
              {cohort.startDate ?? '04-01-2025'} - {cohort.endDate ?? '28-02-2025'}
            </h3>
            <div className="thin-line"></div>
            <ul>
              {students.map((user) => (
                <li key={user.id}>
                  <div className="profile-icon">
                    <p>{getUserInitials(user.profile.firstName, user.profile.lastName)}</p>
                  </div>
                  {user.profile.firstName} {user.profile.lastName}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </main>

      <aside className="aside">
        <Card className="card">
          <h1 className="section-title">Teachers</h1>
          <ul>
            {teachers.map((user) => (
              <li key={user.id}>
                <div className="profile-icon">
                  <p>{getUserInitials(user.profile.firstName, user.profile.lastName)}</p>
                </div>
                {user.profile.firstName} {user.profile.lastName}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="card">
          <h1 className="section-title">My Exercises</h1>
          <ul>
            <li>Exercise 1</li>
            <li>Exercise 2</li>
          </ul>
        </Card>
      </aside>
    </>
  );
};

export default CohortStudent;
