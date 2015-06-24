'use strict';

var Users = Meteor.users;

Users.allow({
    insert: function(userId, post) {
        console.log('Can we insert? Yes');
        return true; // @todo: Is user able to insert new users?
    },
    remove: function(userId, document) {
        return true; // @todo: Is user able to remove other users?
    },
    update: function(userId, document, fieldNames, modifier) {
        return true; // @todo: Can the fieldNames be upated by the current user?
    }
});

Meteor.methods({

    /**
     * @note Defined here instead of in `allow` as the documentation suggests.
     */
    updateUser: function(userId, attrs) {

        // @todo: Validation
        Users.update(userId, attrs);

    }

});
