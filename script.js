console.log('hello!');

const testServer = 'test.mosquitto.org';
const port = 8080;
const clientID = `web${new Date().getTime()}-${parseInt(
  Math.random() * 100,
  10
)}`;
document.getElementById('clientIDText').innerHTML = clientID;
const testClient = new Paho.Client(testServer, Number(port), '/', 'clientID');
const channell = '/test';
const message = new Paho.Message('hello world');
message.destinationName = channell;

const options = {
  timeout: 3000,
  onSuccess: () => {
    console.log('connected');
    testClient.subscribe(channell, { qos: 1 });
    testClient.send(message);
  },
  onFailure: () => console.log('Connection failed: ' + message.errorMessage),
};

const init = () => testClient.connect(options);
