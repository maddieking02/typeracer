const cluster = require('cluster');
const { cpus } = require('os');
const { Server } = require('socket.io');
const { setupMaster, setupWorker } = require('@socket.io/sticky');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
const app = require('./index.js');

const numCPUs = cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  setupMaster(app.listen(), {
    loadBalancingMethod: 'least-connection',
  });

  setupPrimary();

  cluster.setupPrimary({
    serialization: 'advanced',
  });

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // app.listen(app.get('port'), () => { console.log(`Worker ${process.pid} listening on http://localhost:${app.get('port')}`); });
  console.log(`Worker ${process.pid} listening on http://localhost:${app.get('port')}`);

  const server = app.listen(app.get('port'));
  const io = new Server(server);

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  io.on('connection', (socket) => {
    /* ... */
  });
}
