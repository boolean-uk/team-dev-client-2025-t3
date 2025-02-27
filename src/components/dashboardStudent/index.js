import Card from '../card';

import ProfileCircle from '../profileCircle';

import './style.css';

const dashboardStudent = ({ name, specialism }) => {
  const userInitials = name.match(/\b(\w)/g);

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />
          <div className="post-user-name">
            <p>{name}</p>
            <small>{specialism}</small>
          </div>
        </section>
      </article>
    </Card>
  );
};

export default dashboardStudent;
