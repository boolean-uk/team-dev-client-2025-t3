import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import FileIcon from '../../assets/icons/fileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';
import NoteIcon from '../../assets/icons/noteIcon';
import ClipboardIcon from '../../assets/icons/clipboardIcon';
import { UserContext } from '../../context/user';

const Navigation = () => {
  const { token } = useAuth();
  const user = useContext(UserContext);

  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon colour="#000046" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile`}>
            <ProfileIcon />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cohort">
            <CohortIcon />
            <p>Cohort</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <FileIcon />
            <p>Exercises</p>
          </NavLink>
        </li>
        {user && user.role === 'TEACHER' && (
          <li>
            <NavLink to="/notes">
              <NoteIcon />
              <p>Notes</p>
            </NavLink>
          </li>
        )}
        {user && user.role === 'TEACHER' && (
          <li>
            <NavLink to="/">
              <ClipboardIcon />
              <p>Logs</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
