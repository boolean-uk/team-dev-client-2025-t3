/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import ProfileIcon from '../../../assets/icons/profileIcon';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'; // run cmd: npm install react-icons
import '../style.css';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const [storedProfile, setStoredProfile] = useState();
  const [profile, setProfile] = useState();
  const [cohort, setCohort] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { id } = useParams();

  const bioPlaceholder =
    'Tell us about yourself, your professional and educational highlights to date...';

  useEffect(() => {
    fetch(`profileUrl/${id}`)
      .then(response => response.json())
      .then(setStoredProfile)
      .then(setProfile)
      .then(profile => {
        return fetch(`cohortUrl/${profile.cohortId}`);  
      })
      .then(response => response.json())
      .then(setCohort)
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setProfile(storedProfile);
  };

  const handleSubmit = (e) => {
    setStoredProfile(profile);
    fetch(`putURL/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
  };

  if (!profile)  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}
    >
      Loading...
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h3>Profile</h3>
      </div>
      <div className="profile-content">
        <div className="profile-content-header">
          <ProfileIcon className="profile-img-big" />
          <div>
            <h2>
              {storedProfile.firstName} {storedProfile.lastName}
            </h2>
            <p>{storedProfile.jobTitle}</p>
          </div>
        </div>
        <div className="profile-content-body">
          <div className="profile-content-left">
            <div className="profile-content-basic">
              <h4 style={{ paddingLeft: "15px" }}>Basic Info</h4>
              <div className="profil-content-row">
                <div className="profile-content-bio-header">
                  <div>
                    <ProfileIcon className="profile-img-small" />
                  </div>
                  <div>Add Headshot</div> {/* Add onClick into this on if you want to add photo function */ }
                </div>
              </div>
              <form>
                <div className="profil-content-row">
                  <label>
                    First Name*
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Last Name*
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Username*
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Github Username*
                    <input
                      type="text"
                      name="githubUsername"
                      value={profile.githubUsername}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </form>
            </div>
            <div className="profile-content-contact">
              <h4 style={{ paddingLeft: "15px" }}>Contact Info</h4>
              <form>
                <label>
                  Email*
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Mobile*
                  <input
                    type="tel"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Password*
                  <div className="password-container">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                    />
                    {passwordVisible ? (
                      <FaEyeSlash className="password-toggle" onClick={() => setPasswordVisible(false)} />
                    ) : (
                      <FaEye className="password-toggle" onClick={() => setPasswordVisible(true)} />
                    )}
                  </div>
                </label>
              </form>
            </div>
            <div className='profile-content-bottom'>
              <p className="profile-bottom-text">* Required</p>
            </div>
          </div>
          <div className="profile-content-right">
            <div className="profile-content-training">
              <h4 style={{ paddingLeft: "15px" }}>Training Info</h4>
              <form>
                <div className="profil-content-row">
                  <label>
                    Role*
                    <div className="locked-input">
                      <input
                        type="text"
                        name="role"
                        value={profile.role}
                        disabled
                      />
                      <FaLock className="lock-icon" />
                    </div>
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Specialism*
                    <div className="locked-input">
                      <input
                        type="text"
                        name="specialism"
                        value={profile.specialism}
                        disabled
                      />
                      <FaLock className="lock-icon" />
                    </div>
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Cohort*
                    <div className="locked-input">
                      <input
                        type="text"
                        name="cohort"
                        value={cohort.name}
                        disabled
                      />
                      <FaLock className="lock-icon" />
                    </div>
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    Start Date*
                    <div className="locked-input">
                      <input
                        type="date"
                        name="startDate"
                        value={profile.startDate}
                        disabled
                      />
                      <FaLock className="lock-icon" />
                    </div>
                  </label>
                </div>
                <div className="profil-content-row">
                  <label>
                    End Date*
                    <div className="locked-input">
                      <input
                        type="date"
                        name="endDate"
                        value={profile.endDate}
                        disabled
                      />
                      <FaLock className="lock-icon" />
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div className="profile-content-bio">
              <h4 style={{ paddingLeft: "15px" }}>Bio</h4>
              <textarea
                className="profile-bio"
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                placeholder={profile.bio ? '' : bioPlaceholder}
                maxLength={300}
              />
              <p className="bio-length-text">
                {' '}
                {profile.bio ? `${profile.bio.length}/300` : `0/300`}{' '}
              </p>
            </div>
            <div className='profile-content-bottom'>
              <button
                className='cancel-button'
                type='button'
                onClick={handleCancel}
              >
                <p className='cancel-button-text'>Cancel</p>
              </button>
              <button
                className='save-button'
                type='button'
                onClick={handleSubmit}
              >
                <p className='save-button-text'>Save</p>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
