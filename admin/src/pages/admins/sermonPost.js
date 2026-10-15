import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/sermons"
    : "/api/sermons";

axios.defaults.withCredentials = true;

export const useSermonPostStore = create((set) => ({
  isUploading: false,
  uploadProgress: 0,
  isPosting: false,
  error: null,
  uploadedMedia: null, // { url, type }

  uploadMedia: async (file) => {
    set({ isUploading: true, error: null, uploadProgress: 0 });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          set({ uploadProgress: percent });
        },
      });

      set({
        uploadedMedia: res.data,
        isUploading: false,
        uploadProgress: 100,
      });

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Upload failed",
        isUploading: false,
      });
      throw err;
    }
  },

  createSermon: async (sermonData) => {
    set({ isPosting: true, error: null });

    try {
      const res = await axios.post(API_URL, sermonData);
      set({ isPosting: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to publish sermon",
        isPosting: false,
      });
      throw err;
    }
  },

  reset: () =>
    set({
      isUploading: false,
      uploadProgress: 0,
      isPosting: false,
      error: null,
      uploadedMedia: null,
    }),
}));
