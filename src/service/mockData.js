const users = [
  {
    token: 'test-token',
    id: 1,
    email: 'test@email.com',
    cohortId: 1,
    role: 'STUDENT',
    firstName: 'Joe',
    lastName: 'Bloggs',
    specialism: 'Full Stack',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  },
  {
    token: 'test-token',
    id: 2,
    email: 'test2@email.com',
    cohortId: 1,
    role: 'STUDENT',
    firstName: 'John',
    lastName: 'Doe',
    specialism: 'Software Development',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  },
  {
    token: 'test-token',
    id: 3,
    email: 'teacher1@test.com',
    cohortId: 1,
    role: 'TEACHER',
    firstName: 'Jane',
    lastName: 'Smith',
    specialism: 'Cloud Computing',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  },
  {
    token: 'test-token',
    id: 4,
    email: 'teacher2@test.com',
    cohortId: 2,
    role: 'TEACHER',
    firstName: 'Rick',
    lastName: 'Sanchez',
    specialism: 'Full Stack',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  },
  {
    token: 'test-token',
    id: 5,
    email: 'test2@email.com',
    cohortId: 1,
    role: 'STUDENT',
    firstName: 'Steven',
    lastName: 'Man',
    specialism: 'Software Development',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  }
];

const posts = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '19 February at 10:32',
    updatedAt: '19 February at 10:32',
    author: {
      id: 1,
      cohortId: 1,
      role: 'STUDENT',
      firstName: 'Sam',
      lastName: 'Fletcher',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    }
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: '19 February at 09:56',
    updatedAt: '19 February at 10:32',
    author: {
      id: 2,
      cohortId: 1,
      role: 'STUDENT',
      firstName: 'Dolor',
      lastName: 'Lobortis',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    },
    comments: [
      {
        id: 2,
        name: 'Dana Sharwarma',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 3,
        name: 'James Doakes',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  }
];

export { users, posts };
