import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import './style.css';
import StepThree from './stepThree';
import StepFour from './stepFour';

const Welcome = () => {
  const { onCreateProfile } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    githubUsername: '',
    bio: '',
    email: '',
    mobile: '',
    role: 'Student',
    specialism: 'Software Development',
    cohort: 'Cohort 4',
    startDate: 'January 2025',
    endDate: 'May 2025'
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const onComplete = () => {
    console.log(profile);
    onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.githubUsername,
      profile.bio,
      profile.email,
      profile.mobile,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.startDate,
      profile.endDate
    );
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={profile} setData={onChange} />
        <StepTwo data={profile} setData={onChange} />
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
