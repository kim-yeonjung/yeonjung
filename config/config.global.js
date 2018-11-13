let config = {
    'info': {
        'name': 'YeonJung',
        'env_type': 'dev'
    },
    'pm2': {
        'max_memory': 256,
        'instance': 2
    }
};

config.info.name = process.env.APP_NAME;
config.info.env_type = 'production';

module.exports = config;