var winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = winston.format.printf(function(info) {
var today = new Date();
var date = today.getDate() + '-' + (today.getMonth()+1) + '-' +  today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
var dateTime = date + ' ' + time;
  return `${dateTime}-${info.level}: ${JSON.stringify(info.message, null, null)}\n`;
});

var transport = new (winston.transports.DailyRotateFile)({
    filename: './logs/Log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: logFormat
});

const levels = { 
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5,
    issue:6 
  };

  const myCustomLevels = {
    levels: {
        error: 0, 
        warn: 1, 
        info: 2, 
        verbose: 3, 
        debug: 4, 
        silly: 5,
        issue:6 
    },
    colors: {
        error: "red", 
        warn: "magenta", 
        info: "green", 
        verbose: "gray", 
        debug: "blue", 
        silly: "yellow",
        issue:"green" 
    }
  };
  winston.addColors(myCustomLevels.colors);
  winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  );
var logger = function() {
    require('events').defaultMaxListeners = 25;
    return winston.createLogger({
        levels:myCustomLevels.levels,
        transports: [
            /* new winston.transports.Console({
                colorize: true,
                level: 'debug',
                format: winston.format.combine(winston.format.colorize(), logFormat)
            }), */
            transport,
            //transportIssueTracker
            /* new winston.transports.File({ filename: './logs/error.log' , level: 'error',  
             format: logFormat  }),
            new winston.transports.File({ filename: './logs/info.log' , level: 'info',  
            format: logFormat }), */
        ]
    });
};

module.exports = logger;