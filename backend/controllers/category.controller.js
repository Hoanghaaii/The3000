import IndustryModel from '../models/industry.model.js'; // Đảm bảo import đúng model của bạn
import JobModel from '../models/job.model.js'; // Import đúng model Job
import ModelModel from '../models/model.model.js'; // Import đúng model Model
import ServiceModel from '../models/service.model.js'; // Import đúng model Service

// Create: Thêm ngành nghề mới
export const createIndustry = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const newIndustry = new IndustryModel({ name });
        await newIndustry.save();
        return res.status(201).json({ success: true, message: "Industry created", data: newIndustry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Tạo nhiều ngành nghề
export const createMultipleIndustries = async (req, res) => {
    const industries = req.body;  // Mảng các ngành nghề

    if (!Array.isArray(industries) || industries.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    try {
        // Tạo nhiều ngành nghề cùng lúc
        const newIndustries = await IndustryModel.insertMany(industries);
        return res.status(201).json({ success: true, message: "Industries created", data: newIndustries });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Read: Lấy danh sách ngành nghề
export const getIndustries = async (req, res) => {
    try {
        const industries = await IndustryModel.find();
        return res.status(200).json({ success: true, data: industries });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy ngành nghề theo ID
export const getIndustryById = async (req, res) => {
    const { id } = req.params;
    try {
        const industry = await IndustryModel.findById(id);
        if (!industry) {
            return res.status(404).json({ success: false, message: "Industry not found" });
        }
        return res.status(200).json({ success: true, data: industry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update: Cập nhật ngành nghề
export const updateIndustry = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const updatedIndustry = await IndustryModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedIndustry) {
            return res.status(404).json({ success: false, message: "Industry not found" });
        }
        return res.status(200).json({ success: true, message: "Industry updated", data: updatedIndustry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete: Xóa ngành nghề
export const deleteIndustry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIndustry = await IndustryModel.findByIdAndDelete(id);
        if (!deletedIndustry) {
            return res.status(404).json({ success: false, message: "Industry not found" });
        }
        return res.status(200).json({ success: true, message: "Industry deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// Create: Thêm nghề mới
export const createJob = async (req, res) => {
    const { name, industryId } = req.body;
    if (!name || !industryId) {
        return res.status(400).json({ success: false, message: "Name and Industry ID are required" });
    }

    try {
        const industry = await IndustryModel.findById(industryId);
        if (!industry) {
            return res.status(404).json({ success: false, message: "Industry not found" });
        }
        console.log(industry.name);
        const newJob = new JobModel({
            name,
            industryId: industryId
        });

        await newJob.save();
        return res.status(201).json({ success: true, message: "Job created", data: newJob });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create: Thêm nghề mới multi
export const createJobs = async (req, res) => {
    const { jobs } = req.body; // Lấy danh sách job từ body
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
        return res.status(400).json({ success: false, message: "Jobs must be an array with at least one item" });
    }

    try {
        const results = [];
        for (const job of jobs) {
            const { name, industryId } = job;

            // Kiểm tra dữ liệu
            if (!name || !industryId) {
                return res.status(400).json({ success: false, message: "Each job must have a name and industryId" });
            }

            // Xác minh Industry tồn tại
            const industry = await IndustryModel.findById(industryId);
            if (!industry) {
                return res.status(404).json({ success: false, message: `Industry with ID ${industryId} not found` });
            }

            // Tạo mới Job
            const newJob = new JobModel({ name, industryId: industryId });
            await newJob.save();
            results.push(newJob);
        }

        return res.status(201).json({ success: true, message: "Jobs created successfully", data: results });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy danh sách nghề
export const getJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find().populate('industry'); // Populate để lấy thông tin Ngành nghề
        return res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy nghề theo ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await JobModel.findById(id).populate('industry');
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, data: job });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update: Cập nhật nghề
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { name, industryId } = req.body;

    if (!name || !industryId) {
        return res.status(400).json({ success: false, message: "Name and Industry ID are required" });
    }

    try {
        const updatedJob = await JobModel.findByIdAndUpdate(id, { name, industry: industryId }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, message: "Job updated", data: updatedJob });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete: Xóa nghề
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await JobModel.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, message: "Job deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Create: Thêm mô hình mới
export const createModel = async (req, res) => {
    const { name, jobId } = req.body;
    if (!name || !jobId) {
        return res.status(400).json({ success: false, message: "Name and Job ID are required" });
    }

    try {
        const job = await JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const newModel = new ModelModel({
            name,
            job: job._id
        });

        await newModel.save();
        return res.status(201).json({ success: true, message: "Model created", data: newModel });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy danh sách mô hình
export const getModels = async (req, res) => {
    try {
        const models = await ModelModel.find().populate('job'); // Populate để lấy thông tin Nghề
        return res.status(200).json({ success: true, data: models });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy mô hình theo ID
export const getModelById = async (req, res) => {
    const { id } = req.params;
    try {
        const model = await ModelModel.findById(id).populate('job');
        if (!model) {
            return res.status(404).json({ success: false, message: "Model not found" });
        }
        return res.status(200).json({ success: true, data: model });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update: Cập nhật mô hình
export const updateModel = async (req, res) => {
    const { id } = req.params;
    const { name, jobId } = req.body;

    if (!name || !jobId) {
        return res.status(400).json({ success: false, message: "Name and Job ID are required" });
    }

    try {
        const updatedModel = await ModelModel.findByIdAndUpdate(id, { name, job: jobId }, { new: true });
        if (!updatedModel) {
            return res.status(404).json({ success: false, message: "Model not found" });
        }
        return res.status(200).json({ success: true, message: "Model updated", data: updatedModel });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete: Xóa mô hình
export const deleteModel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedModel = await ModelModel.findByIdAndDelete(id);
        if (!deletedModel) {
            return res.status(404).json({ success: false, message: "Model not found" });
        }
        return res.status(200).json({ success: true, message: "Model deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// Create: Thêm dịch vụ mới
export const createService = async (req, res) => {
    const { name, modelId } = req.body;
    if (!name || !modelId) {
        return res.status(400).json({ success: false, message: "Name and Model ID are required" });
    }

    try {
        const model = await ModelModel.findById(modelId);
        if (!model) {
            return res.status(404).json({ success: false, message: "Model not found" });
        }

        const newService = new ServiceModel({
            name,
            model: model._id
        });

        await newService.save();
        return res.status(201).json({ success: true, message: "Service created", data: newService });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy danh sách dịch vụ
export const getServices = async (req, res) => {
    try {
        const services = await ServiceModel.find().populate('model'); // Populate để lấy thông tin Mô hình
        return res.status(200).json({ success: true, data: services });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read: Lấy dịch vụ theo ID
export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await ServiceModel.findById(id).populate('model');
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, data: service });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update: Cập nhật dịch vụ
export const updateService = async (req, res) => {
    const { id } = req.params;
    const { name, modelId } = req.body;

    if (!name || !modelId) {
        return res.status(400).json({ success: false, message: "Name and Model ID are required" });
    }

    try {
        const updatedService = await ServiceModel.findByIdAndUpdate(id, { name, model: modelId }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service updated", data: updatedService });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete: Xóa dịch vụ
export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await ServiceModel.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
