const LogsModal = require('../model/Logs.model');
const crypto = require('crypto');

class LogsController {
    getAll(req, res, next) {
        return LogsModal.find({}).sort({createdAt: 'descending'})
            .then((logs) => res.status(200).json(logs))
            .catch((error) => next(error)); // return LogsModal.find();
    }
    addLog = async (req, res, next) => {
        try {
            const _id = crypto.randomUUID();
            let requestBody = await req.body;
            const logs = new LogsModal({
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