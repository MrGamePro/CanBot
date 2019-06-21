var http = require('http');

http.createServer(function (req, res) {
  res.write("CanBot est actuellement en ligne ! \n \n https://discordapp.com/api/oauth2/authorize?client_id=520205238452486144&permissions=8&scope=bot");
  res.end();
}).listen(8080);