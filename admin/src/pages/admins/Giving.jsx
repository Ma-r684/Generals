import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/admin"
    : "/api/admin";

const AdminGivingPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [thankYouMessage, setThankYouMessage] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/donations`, {
        withCredentials: true,
      });

      setDonations(res.data.donations || []);
    } catch (err) {
      console.error("Failed to fetch donations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  /* SEND THANK YOU */
  const sendThankYou = async () => {
    if (!thankYouMessage.trim()) return;

    try {
      setActionLoading(true);

      await axios.post(
        `${API_BASE}/donations/${selectedDonation._id}/thank-you`,
        { message: thankYouMessage },
        { withCredentials: true }
      );

      setMessage("Thank you message sent successfully!");
      setSelectedDonation(null);
      setThankYouMessage("");
      fetchDonations();
    } catch (err) {
      setMessage("Failed to send message.");
    } finally {
      setActionLoading(false);
    }
  };

  /* DOWNLOAD REPORT */
  const downloadReport = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/donations/report`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "giving-report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Failed to download report", err);
    }
  };

  const totalAmount = donations.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  const totalGivers = donations.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Giving Records...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Giving Management Dashboard
      </h1>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Total Givers</h3>
          <p className="text-2xl font-bold">{totalGivers}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Total Amount (KES)</h3>
          <p className="text-2xl font-bold">
            {totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center">
          <button
            onClick={downloadReport}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Download PDF Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center">
          <button
            onClick={fetchDonations}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone/Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{donation.name}</td>

                <td className="p-3">
                  {donation.phone || donation.email || "-"}
                </td>

                <td className="p-3 font-semibold">
                  KES {Number(donation.amount).toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      donation.method === "mpesa"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {donation.method}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      donation.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : donation.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <button
                    disabled={
                      donation.status !== "completed" ||
                      donation.emailSent ||
                      donation.smsSent
                    }
                    onClick={() => setSelectedDonation(donation)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      donation.emailSent || donation.smsSent
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {donation.emailSent || donation.smsSent
                      ? "Already Sent"
                      : "Send Thank You"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">
              Send Thank You to {selectedDonation.name}
            </h3>

            <textarea
              rows={4}
              className="w-full border p-3 rounded-md mb-3"
              placeholder="Write your thank you message..."
              value={thankYouMessage}
              onChange={(e) => setThankYouMessage(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={sendThankYou}
                disabled={actionLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {actionLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminGivingPage;
