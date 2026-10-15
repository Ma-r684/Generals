import Contact from "../models/contact.model.js";

/**
 * @desc    Create contact message
 * @route   POST /api/contact
 */
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all messages (Admin)
 * @route   GET /api/contact
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single message
 * @route   GET /api/contact/:id
 */
export const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get unread messages
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments({ status: "unread" });

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Mark as read
 */
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Admin reply
 * @route   PUT /api/contact/:id/reply
 */
export const replyToContact = async (req, res) => {
  try {
    const { adminReply } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        adminReply,
        status: "replied",
      },
      { new: true }
    );

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Message ID is required",
      });
    }

    // 2️⃣ Check if message exists
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // 3️⃣ Delete message
    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting message",
    });
  }
};