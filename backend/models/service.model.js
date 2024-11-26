import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên dịch vụ
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true }, // Tham chiếu tới mô hình
});

const ServiceModel = mongoose.model('Service', ServiceSchema);

export default ServiceModel;
