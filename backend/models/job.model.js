import mongoose from 'mongoose';

// Schema cho Nghề
const JobSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên nghề
  industryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Industry' }, // Tham chiếu tới Lĩnh vực
});

// Tạo model
const JobModel = mongoose.model('Job', JobSchema);

export default JobModel;
