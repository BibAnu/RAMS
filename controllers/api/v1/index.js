'use strict';

module.exports = function(app){

    require('./users')(app);
    require('./candidates')(app);
    require('./companies')(app);
    require('./demands')(app);
};