const vision = require('@google-cloud/vision');


const client = new vision.ImageAnnotatorClient();

const [result] = await client.textDetection();