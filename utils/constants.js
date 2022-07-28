module.exports = {
  ERROR_STATUS: {
    INVALID_REQUEST: 400,
    UNAUTHORIZED: 401,
    ACCESS_DENIED: 403,
    ACCOUNT_PROBLEM: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },

  ERROR_CODE: {
    INVALID_REQUEST: 'InvalidRequest',
    UNAUTHORIZED: 'Unauthorized',
    ACCESS_DENIED: 'AccessDenied',
    ACCOUNT_PROBLEM: 'AccountProblem',
    NOT_FOUND: 'NotFound',
    INTERNAL_ERROR: 'InternalError',
    SERVICE_UNAVAILABLE: 'ServerMaintainance',
  },

  SUCCESS_STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 200,
    DELETED: 200,
  },
};
