import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

const FinalReq = ({ className }) => {
  const [finalRequests, setFinalRequests] = useState([]);
  const [showFileUploadOverlay, setShowFileUploadOverlay] = useState(false);
  const [selectedFinalRequestId, setSelectedFinalRequestId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/final-request/professor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFinalRequests(data.finalRequests || []);
      })
      .catch((error) => {
        console.error("There was an error fetching final requests!", error);
        setError("Failed to load final requests. Please try again later.");
      });
  }, []);

  const handleAccept = (finalRequestId, e) => {
    e.preventDefault();
    setShowFileUploadOverlay(true);
    setSelectedFinalRequestId(finalRequestId);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("cerere", e.target.files[0]);

    fetch(`http://localhost:3000/final-request/accept/${selectedFinalRequestId}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        setFinalRequests(
          finalRequests.filter(
            (request) => request.finalRequestId !== selectedFinalRequestId
          )
        );
        setError(null);
      })
      .catch((error) => {
        console.error("There was an error uploading the file!", error);
        setError("Failed to upload file. Please try again.");
      })
      .finally(() => {
        setShowFileUploadOverlay(false);
        setSelectedFinalRequestId(null);
      });
  };

  const handleReject = (finalRequestId, e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/final-request/reject/${finalRequestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ finalRequestId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        setFinalRequests(
          finalRequests.filter(
            (request) => request.finalRequestId !== finalRequestId
          )
        );
        setError(null);
      })
      .catch((error) => {
        console.error("There was an error rejecting the request!", error);
        setError("Failed to reject the request. Please try again.");
      });
  };

  const handleDownloadPdf = (finalRequestId, e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/final-request/pdf/${finalRequestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `finalRequest${finalRequestId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        setError("Failed to download PDF. Please try again.");
      });
  };

  return (
    <div className={className}>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {finalRequests && finalRequests.length > 0 ? (
        finalRequests.map((finalRequest) => (
          <Card key={finalRequest.finalRequestId} className="mb-4 bg-gray-800 p-5">
            <h1 className="text-white font-bold">Final Request ID: {finalRequest.finalRequestId}</h1>
            <p className="text-gray-300">Professor ID: {finalRequest.professorId}</p>
            <p className="text-gray-300">Student ID: {finalRequest.studentId}</p>
            <div className="flex justify-around mt-2">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={(e) => handleDownloadPdf(finalRequest.finalRequestId, e)}
              >
                Download
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                type="button"
                onClick={(e) => handleAccept(finalRequest.finalRequestId, e)}
              >
                ACCEPT
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                type="button"
                onClick={(e) => handleReject(finalRequest.finalRequestId, e)}
              >
                REJECT
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-300">No final requests assigned to you.</p>
      )}
      {showFileUploadOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                type="button"
              >
                UPLOAD
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                type="button"
                onClick={() => setShowFileUploadOverlay(false)}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalReq;