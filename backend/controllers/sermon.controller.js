import Sermon from "../models/sermon.model.js";
import cloudinary from "../utils/cloudinary.js";

/* 
   UPLOAD AUDIO TO CLOUDINARY
 */
export const uploadSermonFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // allows audio
      folder: "sermons/audio",
    });

    res.json({
      success: true,
      url: result.secure_url,
      type: "audio",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Upload failed",
    });
  }
};

/* =============================
   CREATE SERMON
============================= */
export const createSermon = async (req, res) => {
  try {
    const { title, preacher, description, type, mediaUrl } = req.body;

    if (!title || !preacher || !type || !mediaUrl) {
      return res.json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const sermon = new Sermon({
      title,
      preacher,
      description,
      type,
      mediaUrl,
    });

    await sermon.save();

    res.json({
      success: true,
      message: "Sermon created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to create sermon",
    });
  }
};

/* =============================
   LIST SERMONS
============================= */
export const listSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sermons,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch sermons",
    });
  }
};

/* =============================
   DELETE SERMON
============================= */
export const removeSermon = async (req, res) => {
  try {
    const { id } = req.body;

    await Sermon.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Sermon deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Delete failed",
    });
  }
};
