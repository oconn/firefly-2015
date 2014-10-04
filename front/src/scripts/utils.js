define([
    'underscore',
    'state'
], function(
    _,
    state
) {
    "use strict";
    return {

        // TODO user is hard coded
        safeUser: function() {
            var user = state.user;
            delete user.admin;
            return user;
        },
        fullName: function(user) {
            return user.firstName + ' ' + user.lastName;
        }
    };
});
