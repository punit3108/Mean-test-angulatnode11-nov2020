
module.exports = function (app) {
    app.use('/api', require('./user'));
};
