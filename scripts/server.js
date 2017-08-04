'use strict';

const createServer = require('./create-server');

module.exports = function server(config, callback) {
  const env = 'development';
  
  const port = config.serverPort || 9003;
  const host = config.serverHost || 'localhost'

  const serverInfo = createServer(config, port, env);

  serverInfo.app.listen(port, host, callback);

  return serverInfo.compiler;
};
