module.exports = {
  LOGIN_SCHEMA: {
    id: '/login',
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
      },
      password: {
        type: 'string',
        maxLength: 64,
        minLength: 6,
      },
    },
    required: ['username', 'password'],
  },
  SIGNUP_SCHEMA: {
    id: '/signup',
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
      },
      password: {
        type: 'string',
        maxLength: 64,
        minLength: 6,
      },
      email: {
        type: 'string',
        pattern:
          "^[a-zA-Z0-9.!#$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
        maxLength: 125,
        minLength: 8,
      },
    },
    required: ['username', 'password', 'email'],
  },
  UPDATE_INFO_SCHEMA: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        pattern:
          "^[a-zA-Z0-9.!#$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
        maxLength: 125,
        minLength: 8,
      },
    },
    required: ['email'],
  },
  UPDATE_PASSWORD_SCHEMA: {
    type: 'object',
    properties: {
      oldPassword: {
        type: 'string',
        maxLength: 64,
        minLength: 6,
      },
      newPassword: {
        type: 'string',
        maxLength: 64,
        minLength: 6,
      },
      confirmPassword: {
        type: 'string',
        maxLength: 64,
        minLength: 6,
      },
    },
    required: ['oldPassword', 'newPassword', 'confirmPassword'],
  },
};
