import mongoose from 'mongoose';

// Schema cho Lĩnh vực
const IndustrySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên lĩnh vực
});

// Tạo model
const IndustryModel = mongoose.model('Industry', IndustrySchema);

export default IndustryModel;
