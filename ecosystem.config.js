module.exports = {
  apps : [{
    name: 'Admin',
    script: './lib/index.js',
    wait_ready: true,
    listen_timeout: 3000,
    exp_backoff_restart_delay: 150,

    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
