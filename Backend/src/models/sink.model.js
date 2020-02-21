// sink-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'sink';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    carnumber: { type: String, required: true, default: '' },
    carmake: {
      _id: { type: Schema.Types.ObjectId, ref: 'carmake' },
      make: { type: String, default: ''}
    },
    carmodel: {
      _id: { type: Schema.Types.ObjectId, ref: 'carmodel' },
      model: { type: String, default: ''}
    },
    boxnumber: { type: String, required: true, default: '' },
    services: [{
      id: { type: String, required: true },
      name: { type: String, required: true, default: '' },
      price: { type: String, required: true, default: 0 }
    }]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
