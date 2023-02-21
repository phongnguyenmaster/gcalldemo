const LogsModel = require('../model/Logs.model');
const crypto = require('crypto');

class LogsController {

    async getAll(req, res, next) {
        try {
            const logs = await LogsModel.find({}).sort({ createdAt: 'descending' });
            return res.status(200).json(logs);
        } catch (error) {
            return next(error);
        }
    }

    addLog = async (req, res, next) => {
        try {
            const _id = crypto.randomUUID();
            let requestBody = await req.body;
            const logs = new LogsModel({
                _id,
                phoneNumber: requestBody.phoneNumber,
                timeCall: requestBody.timeCall,
                statusCall: requestBody.statusCall
            })
            return logs
                .save()
                .then(() => {
                    res.status(200).json({
                        mess: "successful",
                    })
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new LogsController;