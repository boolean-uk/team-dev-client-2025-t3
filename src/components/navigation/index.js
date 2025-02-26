import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import FileIcon from '../../assets/icons/fileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';
import NoteIcon from '../../assets/icons/noteIcon';
import ClipboardIcon from '../../assets/icons/clipboardIcon';

const Navigation = () => {
  const { token } = useAuth();

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
          <NavLink to="/">
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
        <li>
          <NavLink to="/">
            <NoteIcon />
            <p>Notes</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <ClipboardIcon />
            <p>Logs</p>
          </NavLink>
        </li>
        {/* {user?.role === 'TEACHER' && (
          <li>
            <NavLink to="/notes">
              <NoteIcon />
              <p>Notes</p>
            </NavLink>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navigation;
