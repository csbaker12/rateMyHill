const AccessControl = require('accesscontrol');

let grantsObject = {
  admin: {
    profile: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    resorts: {
      'read:any': ['*'],
    },
    resort: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    reviews: {
      'read:any': ['*'],
    },
    review: {
      'create:any': ['*'],
      'read:any': ['*'],
    },
    // categories: {
    //   'create:any': ['*'],
    //   'read:any': ['*'],
    //   'update:any': ['*'],
    //   'delete:any': ['*'],
    // },
  },
  user: {
    profile: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
    },
    resorts: {
      'read:any': ['*'],
    },
    resort: {
      'read:any': ['*'],
    },
    reviews: {
      'read:any': ['*'],
    },
    review: {
      'create:any': ['*'],
      'read:any': ['*'],
    },
  },
  superAdmin: {
    profile: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    resorts: {
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
      'create:any': ['*'],
    },
    resort: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    reviews: {
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
      'create:any': ['*'],
    },
    review: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
