module.exports = {
  CREATE_BOOK_SCHEMA: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      pub_date: {
        type: 'string',
        format: 'date',
      },
      import_date: {
        type: 'string',
        format: 'date',
      },
      description: {
        type: 'string',
        maxLength: 1000,
      },
      price: {
        type: 'string',
        minimum: 0,
      },
      remain: {
        type: 'string',
      },
      status: {
        type: 'string',
      },
      publisherName: {
        type: 'string',
      },
      imgPath: {
        type: 'string',
      },
      authorName: {
        type: 'string',
      },
      id_Category: {
        type: 'string',
      },
      id_seasonSale: {
        type: 'string',
      },
    },
    required: [
      'name',
      'pub_date',
      'price',
      'remain',
      'status',
      'publisherName',
      'authorName',
      'id_Category',
    ],
  },
};
