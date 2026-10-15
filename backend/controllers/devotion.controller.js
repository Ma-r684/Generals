import Devotion from "../models/devotion.model.js";
import fs from "fs";
import path from "path";

/* ===============================
   ➜ CREATE DEVOTION
================================= */
export const createDevotion = async (req, res) => {
  try {
    const { title, scripture, content, category } = req.body;

    if (!title || !scripture || !content) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const devotion = new Devotion({
      title,
      scripture,
      content,
      category: category || null, // ✅ Added category
      image: req.file ? req.file.filename : null,
    });

    await devotion.save();

    res.json({
      success: true,
      message: "Devotion created successfully",
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error creating devotion",
    });
  }
};


/* ===============================
   ➜ LIST DEVOTIONS
================================= */
export const listDevotions = async (req, res) => {
  try {
    const devotions = await Devotion.find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: devotions,
    });

  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching devotions",
    });
  }
};
 //Update Devotion
 export const updateDevotion = async (req, res) => {
  try {
    const { id, title, scripture, content, category } = req.body;

    const devotion = await Devotion.findById(id);

    if (!devotion) {
      return res.status(404).json({
        success: false,
        message: "Devotion not found",
      });
    }

    devotion.title = title;
    devotion.scripture = scripture;
    devotion.content = content;
    devotion.category = category;

    // If new image uploaded
    if (req.file) {
      devotion.image = req.file.filename;
    }

    await devotion.save();

    res.status(200).json({
      success: true,
      message: "Devotion updated successfully",
    });

  } catch (error) {
    console.log("Update Devotion Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   ➜ DELETE DEVOTION
================================= */
export const removeDevotion = async (req, res) => {
  try {
    const { id } = req.body;

    await Devotion.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Devotion deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete devotion",
    });
  }
};

export const getSingleDevotion = async (req, res) => {
  try {
    const devotion = await Devotion.findById(req.params.id);

    if (!devotion) {
      return res.json({ success: false, message: "Devotion not found" });
    }

    res.json({ success: true, data: devotion });
  } catch (error) {
    res.json({ success: false, message: "Error fetching devotion" });
  }
};

