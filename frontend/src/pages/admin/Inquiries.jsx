import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../../config/firebase";
import * as XLSX from "xlsx";
import { ArrowUpDown, ArrowUp, ArrowDown, FileDown } from "lucide-react";

const Inquiries = () => {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const fetchInquiries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "inquiries"));
      const inquiriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(inquiriesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async () => {
    try {
      setSending(true);
      await updateDoc(doc(db, "inquiries", selectedInquiry.id), {
        status: "completed",
        reply: replyMessage,
      });

      const functions = getFunctions();
      const sendEmail = httpsCallable(functions, "sendInquiryResponse");
      await sendEmail({
        email: selectedInquiry.email,
        name: selectedInquiry.name,
        companyName: selectedInquiry.companyName,
        reply: replyMessage,
      });

      setReplyMessage("");
      setShowModal(false);
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing request");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "inquiries", id));
        fetchInquiries();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("Failed to delete inquiry");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleExport = () => {
    const exportData = inquiries.map((inquiry) => ({
      Name: inquiry.name,
      Email: inquiry.email,
      Company: inquiry.companyName,
      Country: inquiry.country,
      "Job Title": inquiry.jobTitle,
      Message: inquiry.message,
      Status: inquiry.status,
      "Created At": new Date(inquiry.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");
    XLSX.writeFile(
      wb,
      `inquiries_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "id") {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ArrowUpDown size={16} className="opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inquiries Management</h2>
        <button
          className="btn btn-primary"
          onClick={handleExport}
          disabled={inquiries.length === 0}
        >
          <FileDown size={20} />
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-fixed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("country")}
                >
                  Country
                  {sortField === "country" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("jobTitle")}
                >
                  Job Title
                  {sortField === "jobTitle" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>
                  {inquiry.name}
                  <br />
                  <small className="text-gray-500">{inquiry.email}</small>
                </td>
                <td>{inquiry.companyName}</td>
                <td>{inquiry.country}</td>
                <td>{inquiry.jobTitle}</td>
                <td>
                  <div className="max-w-xs">
                    <p className="truncate">{inquiry.message}</p>
                  </div>
                </td>
                <td>
                  <div
                    className={`badge ${
                      inquiry.status === "completed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {inquiry.status}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        setShowModal(true);
                      }}
                      disabled={inquiry.status === "completed"}
                    >
                      Reply
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reply to Inquiry</h3>
            <div className="py-4">
              <div className="mb-4">
                <p className="font-semibold">From: {selectedInquiry.name}</p>
                <p className="text-sm opacity-70">{selectedInquiry.email}</p>
              </div>
              <div className="mb-4">
                <p className="font-medium">Original Message:</p>
                <p className="text-sm bg-base-200 p-3 rounded-lg mt-1">
                  {selectedInquiry.message}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Reply</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full"
                  placeholder="Type your reply message here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleStatusChange}
                disabled={sending || !replyMessage.trim()}
              >
                {sending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  "Send Reply"
                )}
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowModal(false);
                  setSelectedInquiry(null);
                  setReplyMessage("");
                }}
                disabled={sending}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
