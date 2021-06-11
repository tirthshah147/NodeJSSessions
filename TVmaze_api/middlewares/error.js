const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = function(err,req,res,next){
  // Logging error code
  // winston.log('error', err.message);
  logger.log({
    level: 'info',
    message: err.message
  });
  res.status(500).send(err.message);
}


//error
//warn
//info
