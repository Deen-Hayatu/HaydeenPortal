// PM2 ecosystem file for process management
module.exports = {
  apps: [{
    name: 'haydeen-portal',
    script: './dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    env_file: '.env', // Load environment variables from .env file
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G'
  }]
};

