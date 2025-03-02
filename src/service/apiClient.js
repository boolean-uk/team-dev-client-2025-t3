import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('users', { email, password }, false);
  return await login(email, password);
}

async function createProfile(
  userId,
  firstName,
  lastName,
  githubUrl,
  bio,
  email,
  mobile,
  role,
  specialism,
  cohort,
  startDate,
  endDate
) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    githubUrl,
    bio,
    email,
    mobile,
    role,
    specialism,
    cohort,
    startDate,
    endDate
  });
}

async function getUserDetails(userId) {
  const res = await get(`users/${userId}`);
  return res.data;
}

async function getPosts() {
  const res = await get('posts');
  console.log('Posts:', res.data.posts);
  return res.data.posts;
}

async function getCohorts() {
  const res = await get('cohorts');
  return res.data.cohorts;
}

async function getCohort(cohortId) {
  const res = await get(`cohorts/${cohortId}`);
  return res.data.cohort;
}

async function createComment(postId, data) {
  return await post(`posts/${postId}/comments`, data);
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export {
  login,
  getPosts,
  register,
  createProfile,
  createComment,
  getUserDetails,
  post,
  patch,
  getCohorts,
  getCohort
};
