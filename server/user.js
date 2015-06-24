
Meteor.publish('userData', function() {
    return Users.find(); // @todo Where org id ?
});
