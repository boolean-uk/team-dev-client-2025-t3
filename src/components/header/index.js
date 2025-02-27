import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { UserContext } from '../../context/user';
import { NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';

const Header = () => {
  const { token, onLogout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const user = useContext(UserContext);

  if (!token) {
    return null;
  }

  const name = user ? `${user.firstName} ${user.lastName}` : 'Guest';
  const userInitials = user ? name.match(/\b(\w)/g) : ['G'];

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
    console.log(user);
  };

  return (
    <header>
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>{userInitials}</p>
      </div>

      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{userInitials}</p>
              </div>

              <div className="post-user-name">
                <p>{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</p>
                <small>
                  {user
                    ? `${user.specialism ?? 'Specialism'}, ${user.cohort?.id ?? 'Cohort Id'}`
                    : 'No details available'}
                </small>
              </div>
            </section>

            {!user && ( // If user is null, show login/register options
              <section className="user-panel-options border-top">
                <ul>
                  <li>
                    <NavLink to="/login">
                      <ProfileIcon /> <p>Login</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">
                      <CogIcon /> <p>Register</p>
                    </NavLink>
                  </li>
                </ul>
              </section>
            )}

            {user && ( // If user exists, show profile/settings/logout options
              <section className="user-panel-options border-top">
                <ul>
                  <li>
                    <NavLink to="/">
                      <ProfileIcon /> <p>Profile</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      <CogIcon /> <p>Settings &amp; Privacy</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={onLogout}>
                      <LogoutIcon /> <p>Log out</p>
                    </NavLink>
                  </li>
                </ul>
              </section>
            )}
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
