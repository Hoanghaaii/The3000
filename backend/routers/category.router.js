import express from 'express';
import { 
    createIndustry, 
    getIndustries, 
    getIndustryById, 
    updateIndustry, 
    deleteIndustry,
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    createModel,
    getModels,
    getModelById,
    updateModel,
    deleteModel,
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    createMultipleIndustries,
    createJobs
} from '../controllers/category.controller.js';  // Đảm bảo rằng các controller được import đúng

const router = express.Router();

// Routes cho Industry (Ngành nghề)
router.post('/industry', createIndustry);          // Tạo mới ngành nghề
router.post('/industries', createMultipleIndustries);  // Tạo nhiều ngành nghề
router.get('/industries', getIndustries);           // Lấy danh sách ngành nghề
router.get('/industry/:id', getIndustryById);      // Lấy ngành nghề theo ID
router.put('/industry/:id', updateIndustry);       // Cập nhật ngành nghề
router.delete('/industry/:id', deleteIndustry);    // Xóa ngành nghề

// Routes cho Job (Nghề)
router.post('/job', createJob);                     // Tạo mới nghề
router.post('/jobs', createJobs);
router.get('/jobs', getJobs);                       // Lấy danh sách nghề
router.get('/job/:id', getJobById);                 // Lấy nghề theo ID
router.put('/job/:id', updateJob);                  // Cập nhật nghề
router.delete('/job/:id', deleteJob);               // Xóa nghề

// Routes cho Model (Mô hình)
router.post('/model', createModel);                 // Tạo mới mô hình
router.get('/models', getModels);                   // Lấy danh sách mô hình
router.get('/model/:id', getModelById);             // Lấy mô hình theo ID
router.put('/model/:id', updateModel);              // Cập nhật mô hình
router.delete('/model/:id', deleteModel);           // Xóa mô hình

// Routes cho Service (Dịch vụ)
router.post('/service', createService);             // Tạo mới dịch vụ
router.get('/services', getServices);               // Lấy danh sách dịch vụ
router.get('/service/:id', getServiceById);         // Lấy dịch vụ theo ID
router.put('/service/:id', updateService);          // Cập nhật dịch vụ
router.delete('/service/:id', deleteService);       // Xóa dịch vụ

export default router;
