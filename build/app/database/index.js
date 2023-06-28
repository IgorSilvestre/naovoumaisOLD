import mongo from 'mongoose';
const url = 'mongodb://127.0.0.1:27017/naovoumais';
mongo.connect(url);
mongo.Promise = global.Promise;
export default mongo;
