'use strict';

Meteor.publish('users', function() {
    return Meteor.users.find({}, {}); // @todo Where org id ?
});
