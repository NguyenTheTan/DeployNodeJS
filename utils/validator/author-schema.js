module.exports = {
  CREATE_AUTHOR_SCHEMA: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      about: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
      },
    },
    required: ['name', 'about'],
  },
};
