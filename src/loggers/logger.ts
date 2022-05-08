import winston, { format } from 'winston';

const logFormat = format.printf ( ( { level, message, timestamp, stack } ) => {
    return `${ level } - ${ timestamp }: ${ stack || message }`;
} );

const logger = winston.createLogger ( {
    format: format.combine ( format.colorize (), format.timestamp ( { format: 'YYYY-MM-DD HH:mm:ss' } ), format.errors ( { stack: true } ), logFormat ),
    defaultMeta: { service: 'user-service' },
    transports: [ new winston.transports.File ( {
        filename: 'logs/application.log',
        level: 'info'
    } ), new winston.transports.Console ( { level: 'debug' } ) ]
} );

export default logger;