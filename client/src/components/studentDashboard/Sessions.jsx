import { useState, useEffect } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { formatDate } from "../../../lib/utils.jsx";

const Sessions = ({ className }) => {
  const [sessions, setSessions] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/enrollment/sessions/active", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSessions(data.activeEnrollmentSessions || []);
      })
      .catch((error) => {
        console.error("There was an error fetching sessions!", error);
      });
  }, []);

  const handleEnroll = (sessionId, e) => {
    e.preventDefault();
    setSelectedSessionId(sessionId);
    setShowOverlay(true);
  };

  const handleEnrollConfirm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/preliminary-request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        sessionId: selectedSessionId,
        title: title,
        description: description,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Enrollment successful:", data.message);
        resetOverlay();
      })
      .catch((error) => {
        console.error("Enrollment error:", error);
        resetOverlay();
      });
  };

  const handleEnrollCancel = (e) => {
    e.preventDefault();
    resetOverlay();
  };

  const resetOverlay = () => {
    setShowOverlay(false);
    setTitle("");
    setDescription("");
    setSelectedSessionId(null);
  };

  return (
    <div className={className}>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <div key={session.sessionId} className="mb-4">
            <Card className="bg-gray-800 p-4 rounded shadow">
              <div>
                <h2 className="text-lg font-bold text-white">Session ID: {session.sessionId}</h2>
                <p className="text-gray-300">Professor: {session.professorName}</p>
                <p className="text-gray-300">Start Time: {formatDate(session.startTime)}</p>
                <p className="text-gray-300">End Time: {formatDate(session.endTime)}</p>
                <p className="text-gray-300">Enrolled Students: {session.enrolledStudents}</p>
                <p className="text-gray-300">Students Limit: {session.studentsLimit}</p>
              </div>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
                onClick={(e) => handleEnroll(session.sessionId, e)}
              >
                ENROLL
              </Button>
            </Card>
          </div>
        ))
      ) : (
        <div className="text-gray-300 text-center mt-8">
          <h1>No sessions available</h1>
        </div>
      )}

      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <input
              className="w-full p-2  rounded-md mb-4 bg-gray-700 text-white"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full h-24 p-2  rounded-md mb-4 bg-gray-700 text-white"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-between">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                type="button"
                onClick={handleEnrollConfirm}
              >
                CONFIRM ENROLL
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                type="button"
                onClick={handleEnrollCancel}
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

export default Sessions;