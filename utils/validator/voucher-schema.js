module.exports = {
  VOUCHER_SCHEMA: {
    type: 'object',
    properties: {
      percent: {
        type: 'string',
        pattern: '^[0-9]{1,2}$',
      },
      expired: {
        type: 'string',
        format: 'date',
      },
      code: {
        type: 'string',
      },
      min_bill: {
        type: 'string',
        pattern: '\\d+',
      },
      id_userType: {
        type: 'string',
        pattern: '\\d+',
      },
      quantity: {
        type: 'string',
        pattern: '\\d+',
      },
    },
    required: [
      'percent',
      'expired',
      'code',
      'min_bill',
      'id_userType',
      'quantity',
    ],
  },
};
