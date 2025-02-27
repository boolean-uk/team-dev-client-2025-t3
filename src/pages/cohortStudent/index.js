import { useState, useEffect, useContext } from 'react';
import Card from '../../components/card';
import { UserContext } from '../../context/user';
import { getCohorts } from '../../service/apiClient';
import './style.css';

const CohortStudent = () => {
  const user = useContext(UserContext);
  const [cohorts, setCohorts] = useState([
    {
      id: 'N/A',
      specialism: 'N/A',
      startDate: 'no date',
      endDate: 'no date',
      users: [
        {
          id: 'N/A',
          profile: {
            firstName: 'First Name',
            lastName: 'Last Name'
          }
        }
      ]
    }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCohorts().then((data) => {
      setCohorts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <main className="main">
        <Card className="card">
          <h1 className="section-title">My Cohort</h1>
          {cohorts.map((cohort) => (
            <div key={cohort.id}>
              <h2 className="sub-title">
                {cohort.specialism ?? 'N/A'}, {cohort.id ?? 'N/A'}
              </h2>
              <h3 className="date">
                {cohort.startDate ?? 'no date'} - {cohort.endDate ?? 'no date'}
              </h3>
              <div className="thin-line"></div>
              <ul>
                {cohort.users.map((user) => (
                  <li key={user.id}>
                    {user.profile.firstName} {user.profile.lastName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      </main>

      <aside className="aside">
        <Card className="card">
          <h1 className="section-title">Teacher</h1>
          <ul>
            <li>Teacher 1</li>
            <li>Teacher 2</li>
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
