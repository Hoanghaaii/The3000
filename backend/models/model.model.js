import mongoose from 'mongoose';

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên mô hình
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Tham chiếu tới nghề
});

const ModelModel = mongoose.model('Model', ModelSchema);

export default ModelModel;
