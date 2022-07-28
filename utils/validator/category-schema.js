module.exports = {
  CREATE_CATEGORY_SCHEMA: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['name'],
  },
};
