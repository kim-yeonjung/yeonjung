module.exports = {
  apps : [{
    name: 'YEONJUNG',
    script: './bin/www',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
