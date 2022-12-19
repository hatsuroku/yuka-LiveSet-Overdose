import WebSocket, { WebSocketServer } from 'ws';

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

const wss = new WebSocketServer({ port: 80 });

console.log(wss.address());

wss.on('connection', function connection(ws, req) {
  console.log(new URL(req.url, `http://${req.headers.host}`));
  console.log(req.url, req.headers.host);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  ws.on('close', function close(data) {
    console.log('a client closed. : %s', data);
  })
  console.log(`client's number: ${wss.clients.size}`);

  ws.send('hello from server');
});

wss.on('close', () => {
  console.log('close');
})

