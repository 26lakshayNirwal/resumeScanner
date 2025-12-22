import Resume from "../models/Resume.js";

// @desc    Upload a new resume
// @route   POST /api/resumes/upload
// @access  Private
export const uploadResume = async (req, res) => {
  const resume = await Resume.create({
    user: req.user,
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path
  });
  res.status(201).json({ success: true, message: "Resume uploaded successfully", data: resume });
};

// @desc    Get all resumes for current user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user });
  res.json({ success: true, data: resumes });
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, data: resume });
};

// @desc    Update resume data
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, message: "Resume updated successfully", data: resume });
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  const resume = await Resume.findByIdAndDelete(req.params.id);
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, message: "Resume deleted successfully" });
};

// @desc    Download resume file
// @route   GET /api/resumes/:id/download
// @access  Private
export const downloadResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.download(resume.path, resume.originalName);
};
