module.exports = {
  CREATE_PUBLISHER_SCHEMA: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
    },
    required: ['name'],
  },
};
