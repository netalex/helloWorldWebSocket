console.log('hello!');

const testServer = 'test.mosquitto.org';
const port = 8080;
const clientID = `web${new Date().getTime()}-${parseInt(
  Math.random() * 100,
  10
)}`;
document.getElementById('clientIDText').innerHTML = clientID;

const testClient = new Paho.Client(testServer,Number(port),'/','clientID');
const channell = '/test';
const message = new Paho.Message('hello world');
message.destinationName = channell;

const options = {
  timeout: 3000,
  onSuccess: () => {
    console.log('connected');
    document.getElementById('connected').innerHTML = 'connected: ' + JSON.stringify(message);
    testClient.subscribe(channell,{ qos: 1 });
    testClient.send(message);
  },
  onFailure: () => {
    console.log('Connection failed: ' + message.errorMessage);
    document.getElementById('unconnected').innerHTML = 'Connection failed: ' + message.errorMessage;
  },
};

const init = () => testClient.connect(options);

/***
 * 
 * REFERENCE: 
 * 
 * GIT D'ESEMPIO
 * https://gist.github.com/matbor/9825309
 * 
 * Paho DOCS https://www.eclipse.org/paho/index.php?page=documentation.php
 * https://www.eclipse.org/paho/files/jsdoc/index.html
 * https://github.com/eclipse/paho.mqtt.javascript#readme
 * 
 * https://www.damirscorner.com/blog/posts/20210528-AllowingInsecureWebsocketConnections.html
 */