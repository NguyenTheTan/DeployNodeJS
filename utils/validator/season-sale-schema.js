module.exports = {
  SEASON_SALE_SCHEMA: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      percent: {
        type: 'string',
        pattern: '^[0-9]{1,2}$',
      },
      endDate: {
        type: 'string',
        format: 'date',
      },
    },
    required: ['name', 'percent', 'endDate'],
  },
};
