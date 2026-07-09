const http = require('http');
const fs = require('fs');
const path = require('path');
const climateRoutes = require('./routes/climateRoutes');
const logger = require('./middleware/logger');

const server = http.createServer((req, res) => {
  logger(req);
  
  // API
  if (req.url.startsWith('/api')) {
    const routeHandled = climateRoutes(req, res);

    if (!routeHandled) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          message: 'Ruta no encontrada',
        })
      );
    }

    return;
  }

  // HTML principal
  if (req.url === '/') {
    const filePath = path.join(__dirname, '../public/index.html');

    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error cargando index.html');
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      res.end(data);
    });

    return;
  }

  // CSS
  if (req.url === '/styles.css') {
    const filePath = path.join(__dirname, '../public/styles.css');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end();
      }

      res.writeHead(200, {
        'Content-Type': 'text/css',
      });

      res.end(data);
    });

    return;
  }

  // JS
  if (req.url === '/app.js') {
    const filePath = path.join(__dirname, '../public/app.js');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end();
      }

      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      });

      res.end(data);
    });

    return;
  }

  res.writeHead(404);
  res.end('Página no encontrada');
});

server.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});
