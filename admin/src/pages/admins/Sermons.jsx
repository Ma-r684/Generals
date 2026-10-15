import { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Music, Video, Loader2, Trash2 } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/sermon"
    : "/api/sermon";

export default function AdminSermons() {
  const [form, setForm] = useState({
    title: "",
    preacher: "",
    description: "",
    type: "audio",
    mediaUrl: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sermons, setSermons] = useState([]);
  const [fetching, setFetching] = useState(true);

  /* ================= FETCH ================= */
  const fetchSermons = async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(`${API_BASE}/list`);
      if (data.success) setSermons(data.data);
    } catch {
      console.error("Failed to fetch sermons");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  /* ================= YOUTUBE CONVERTER ================= */
  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
  };

  /* ================= FILE ================= */
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadFile = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_BASE}/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      if (res.data.success) {
        setForm((prev) => ({
          ...prev,
          mediaUrl: res.data.url,
          type: "audio",
        }));
        alert("Audio uploaded successfully!");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title || !form.preacher) {
      alert("Title and Preacher required");
      return;
    }

    if (!form.mediaUrl) {
      alert("Upload audio or provide video link");
      return;
    }

    try {
      setLoading(true);
      let updatedForm = { ...form };

      if (form.type === "video") {
        updatedForm.mediaUrl = convertToEmbedUrl(form.mediaUrl);
      }

      const res = await axios.post(`${API_BASE}/create`, updatedForm);

      if (res.data.success) {
        alert("Sermon published!");
        setForm({
          title: "",
          preacher: "",
          description: "",
          type: "audio",
          mediaUrl: "",
        });
        setFile(null);
        setPreview(null);
        setProgress(0);
        fetchSermons();
      }
    } catch {
      alert("Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteSermon = async (id) => {
    if (!window.confirm("Delete this sermon?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchSermons();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto mt-12 text-base">
      <h1 className="text-2xl font-semibold mb-8">
        Sermon Management
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 max-w-[500px]"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Preacher"
          value={form.preacher}
          onChange={(e) =>
            setForm({ ...form, preacher: e.target.value })
          }
          className="p-3 border rounded"
          required
        />

        <textarea
          rows="3"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="p-3 border rounded"
        />

        {/* TYPE */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              setForm({ ...form, type: "audio", mediaUrl: "" })
            }
            className={`px-4 py-2 rounded border ${
              form.type === "audio"
                ? "bg-black text-white"
                : ""
            }`}
          >
            <Music size={16} /> Audio
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({ ...form, type: "video", mediaUrl: "" })
            }
            className={`px-4 py-2 rounded border ${
              form.type === "video"
                ? "bg-black text-white"
                : ""
            }`}
          >
            <Video size={16} /> Video
          </button>
        </div>

        {form.type === "audio" && (
          <>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {file && (
              <button
                type="button"
                onClick={uploadFile}
                disabled={uploading}
                className="p-3 bg-black text-white rounded"
              >
                {uploading ? `${progress}%` : "Upload Audio"}
              </button>
            )}
            {preview && <audio controls src={preview} />}
          </>
        )}

        {form.type === "video" && (
          <input
            type="text"
            placeholder="YouTube Link"
            value={form.mediaUrl}
            onChange={(e) =>
              setForm({ ...form, mediaUrl: e.target.value })
            }
            className="p-3 border rounded"
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-black text-white rounded"
        >
          {loading ? "Publishing..." : "Publish Sermon"}
        </button>
      </form>

      {/* ================= GRID CARDS ================= */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">
          Published Sermons
        </h2>

        {fetching ? (
          <p>Loading sermons...</p>
        ) : sermons.length === 0 ? (
          <p>No sermons published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sermons.map((sermon) => (
              <div
                key={sermon._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-sm truncate">
                  {sermon.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {sermon.preacher}
                </p>

                {sermon.type === "audio" ? (
                  <audio
                    controls
                    className="w-full mb-3"
                    src={sermon.mediaUrl}
                  />
                ) : (
                  <iframe
                    className="w-full h-40 mb-3 rounded"
                    src={sermon.mediaUrl}
                    title={sermon.title}
                    allowFullScreen
                  />
                )}

                <button
                  onClick={() => deleteSermon(sermon._id)}
                  className="text-red-600 text-xs flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
