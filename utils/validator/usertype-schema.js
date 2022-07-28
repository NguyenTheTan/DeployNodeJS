module.exports = {
  USER_TYPE_SCHEMA: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
      },
      total_bill: {
        type: 'number',
      },
    },
    required: ['type', 'total_bill'],
  },
};
