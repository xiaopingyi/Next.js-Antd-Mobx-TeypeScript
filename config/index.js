const envType = process.env.API_ENV || 'development';

// 环境变量
const envMaps = {
  development: {
    // HOST: 'http://gateway.dev.360humi.com',
    HOST: 'http://gateway.fat.humiapp.com',
    port: 3600
  },
  test: {
    // HOST: 'http://cloud.gateway.360humi.com',
    HOST: 'http://gateway.fat.humiapp.com',
    port: 3600
  },
  production: {
    // HOST: 'http://gateway.360humi.com',
    HOST: 'http://gateway.fat.humiapp.com',
    port: 3600
  }
}

module.exports = envMaps[envType];