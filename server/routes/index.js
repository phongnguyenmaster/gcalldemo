const ApiRouter = require("./Api.router")
let index = (app) => {
    app.use('/api', ApiRouter);
}

module.exports = index;