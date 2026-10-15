import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/events",
  withCredentials: true,
});

export default function Events() {
  const formRef = useRef(null);

  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    mediaType: "image",
  });

  const [events, setEvents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const BASE_URL = "http://localhost:5000";

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/list");

      if (data.success) {
        setEvents(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle media upload
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  // CREATE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media) {
      setError("Media is required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("eventDate", form.eventDate);
      formData.append("mediaType", form.mediaType);
      formData.append("media", media);

      const { data } = await API.post("/add", formData);

      if (data.success) {
        await fetchEvents();

        // Reset form
        setForm({
          title: "",
          description: "",
          eventDate: "",
          mediaType: "image",
        });

        setMedia(null);
        setMediaPreview(null);

        // Scroll to form
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!selectedEvent) return;

    try {
      await API.delete(`/${selectedEvent._id}`);
      await fetchEvents();

      setShowModal(false);
      setSelectedEvent(null);

      // Scroll back to create form
      formRef.current?.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      setError("Failed to delete event");
    }
  };

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-base">

      <h1 className="text-xl font-semibold mb-6 text-black">
        Event Management
      </h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* FORM */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* MEDIA */}
        <div className="flex flex-col gap-2">
          <p>Upload Media</p>

          <label htmlFor="media" className="cursor-pointer w-[120px]">
            {mediaPreview ? (
              form.mediaType === "image" ? (
                <img
                  src={mediaPreview}
                  alt="preview"
                  className="w-[120px]"
                />
              ) : (
                <video
                  src={mediaPreview}
                  className="w-[120px]"
                  controls
                />
              )
            ) : (
              <div className="w-[120px] h-[120px] border border-gray-300 flex items-center justify-center text-sm">
                Select File
              </div>
            )}
          </label>

          <input
            type="file"
            id="media"
            hidden
            accept={form.mediaType === "image" ? "image/*" : "video/*"}
            onChange={handleMediaChange}
            required
          />
        </div>

        {/* TITLE */}
        <div className="w-full max-w-[500px] flex flex-col gap-2">
          <p>Event Title</p>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-[10px] text-sm border border-gray-300 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="w-full max-w-[500px] flex flex-col gap-2">
          <p>Event Description</p>
          <textarea
            name="description"
            rows="6"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-[10px] text-sm border border-gray-300 rounded resize-y"
          />
        </div>

        {/* DATE + TYPE */}
        <div className="flex gap-[30px]">
          <div className="flex flex-col gap-2">
            <p>Event Date</p>
            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required
              className="max-w-[150px] p-[10px] border border-gray-300 rounded text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Media Type</p>
            <select
              name="mediaType"
              value={form.mediaType}
              onChange={handleChange}
              className="max-w-[150px] p-[10px] border border-gray-300 rounded text-sm"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="max-w-[150px] p-[10px] bg-black text-white"
        >
          {submitting ? "Publishing..." : "ADD"}
        </button>
      </form>

      {/* EVENT LIST */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-black mb-4">
          Published Events
        </h2>

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="border p-4 max-w-[500px]"
              >
                {event.mediaType === "image" ? (
                  <img
                    src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                    alt={event.title}
                    className="w-[120px] mb-3"
                  />
                ) : (
                  <video
                    src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                    className="w-[120px] mb-3"
                    controls
                  />
                )}

                <p className="text-sm font-medium text-black">
                  {event.title}
                </p>

                <p className="text-sm mb-2">
                  {new Date(event.eventDate).toDateString()}
                </p>

                <p className="text-sm mb-3">
                  {event.description}
                </p>

                <button
                  onClick={() => openDeleteModal(event)}
                  className="max-w-[150px] p-[8px] bg-red-600 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded w-[90%] max-w-[400px]">

            <h3 className="text-lg font-semibold text-black mb-3">
              Confirm Delete
            </h3>

            <p className="text-sm mb-6">
              Are you sure you want to delete
              <span className="font-medium text-black">
                {" "}“{selectedEvent?.title}”
              </span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
