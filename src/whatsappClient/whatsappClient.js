import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { handleMessage } from './messageHandler.js';

export const initializeWhatsappClient = () => {

  const client = new Client({
    authStrategy: new LocalAuth({
      dataPath: 'mess-management-whatsapp-session'
    })
  });
  
  client.on('ready', () => {
    console.log('Client is ready!');
  });
  
  client.on('qr', qr => {
    console.log('Scan the QR code below:');
    qrcode.generate(qr, {small: true});
  });
  
  client.on('message_create', async (message) => {

    if(!message.fromMe){
      await handleMessage(client, message);
    }
  });

  client.on('authenticated', () => {
    console.log('Authenticated successfully!');
  });

  client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
  });

  client.on('disconnected', (reason) => {
    console.log('Client was logged out or disconnected:', reason);
  });

  client.initialize();

  return client;
  
};

