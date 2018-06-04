import { UPDATE_USER } from './constants';

const updateUser = function updateUser(user) {
  return { type: UPDATE_USER, user: user };
};

export default updateUser;
