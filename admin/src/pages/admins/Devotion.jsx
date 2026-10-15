import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/devotion"
    : "/api/devotion";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export default function AdminDevotion() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    scripture: "",
    content: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [devotions, setDevotions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) return null;

  const fetchDevotions = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/list`, {
        withCredentials: true,
      });

      if (data.success) {
        setDevotions(data.data);
      }
    } catch (err) {
      toast.error("Failed to load devotions");
    }
  };

  useEffect(() => {
    fetchDevotions();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };
  const resetForm = () => {
    setForm({
      title: "",
      scripture: "",
      content: "",
      category: "",
    });
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const submitDevotion = async (e) => {
    e.preventDefault();

    if (!form.title || !form.scripture || !form.content) {
      toast.warning("All required fields must be filled");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append("title", form.title);
      data.append("scripture", form.scripture);
      data.append("content", form.content);
      data.append("category", form.category);
      if (imageFile) data.append("image", imageFile);

      if (editingId) {
        data.append("id", editingId);
        await axios.post(`${API_URL}/update`, data, {
          withCredentials: true,
        });
        toast.success("Devotion updated successfully");
      } else {
        await axios.post(API_URL, data, {
          withCredentials: true,
        });
        toast.success("Devotion added successfully");
      }

      resetForm();
      fetchDevotions();
    } catch (err) {
      toast.error("Failed to save devotion");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-3 font-medium">
            Are you sure you want to delete this devotion?
          </p>

          <div className="flex gap-3">
            <button
              onClick={async () => {
                try {
                  setDeletingId(id);

                  await axios.delete(`${API_URL}/remove`, {
                    data: { id },
                    withCredentials: true,
                  });

                  toast.success("Devotion deleted successfully");
                  fetchDevotions();
                } catch (err) {
                  toast.error("Failed to delete devotion");
                } finally {
                  setDeletingId(null);
                  closeToast();
                }
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded"
            >
              Yes, Delete
            </button>

            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-sm rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };
  const handleEdit = (devotion) => {
    setForm({
      title: devotion.title,
      scripture: devotion.scripture,
      content: devotion.content,
      category: devotion.category || "",
    });

    setPreview(
      devotion.image
        ? `${BASE_URL}/uploads/devotion/${devotion.image}`
        : null
    );

    setEditingId(devotion._id);
  };

  return (
    <div className="w-[75%] ml-[max(5vw,25px)] mt-[50px] text-base">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-2xl font-semibold mb-8">
        Devotion Management
      </h1>
    </div>
  );
}
