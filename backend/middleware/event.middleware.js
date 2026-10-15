import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/events");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images or videos allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
