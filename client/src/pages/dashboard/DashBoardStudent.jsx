import { useEffect, useState } from "react";
import { Tab, Tabs } from "../../components/ui/Tabs.jsx";
import Sessions from "../../components/studentDashboard/Sessions.jsx";
import PreliminaryReqStud from "../../components/studentDashboard/PreliminaryReqStud.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import RequestGenerator from "../../components/studentDashboard/RequestGenerator.jsx";
import RequestUploader from "../../components/studentDashboard/RequestUploader.jsx";

const DashboardStudent = () => {
  const { user } = useAuth();
  const [professor, setProfessor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState(null); // Track request status
  const [errorMessage, setErrorMessage] = useState(null); // Track any error messages

  useEffect(() => {
    // Fetch professor's info only if assigned
    const fetchProfessor = async () => {
      if (!user.assignedProfessorId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/professor/${user.assignedProfessorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfessor(data.professor);
      } catch (error) {
        console.error("There was an error!", error);
        setErrorMessage("Failed to fetch professor details.");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch preliminary requests to determine status
    const fetchPreliminaryRequests = async () => {
      try {
        const response = await fetch("http://localhost:3000/preliminary-request/student", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const requests = data.preliminaryRequests || [];

        // Determine request status as 'approved', 'pending', or none
        if (requests.some(req => req.status === "approved")) {
          setRequestStatus("approved");
        } else if (requests.some(req => req.status === "pending")) {
          setRequestStatus("pending");
        } else {
          setRequestStatus("none");
        }
      } catch (error) {
        console.error("There was an error fetching preliminary requests!", error);
        setErrorMessage("Failed to fetch preliminary requests.");
      }
    };

    fetchProfessor();
    fetchPreliminaryRequests();
  }, [user.assignedProfessorId]);

  const handleEnrollSuccess = () => {
    // This could be called after a successful enrollment action
    setRequestStatus("pending");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-2xl text-center mt-7 text-white">
        {user.assignedProfessorId ? `YOUR PROFESSOR IS ${professor?.name || "Unknown"}` : "Welcome"}
      </h1>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <Tabs className="mt-20">
        {requestStatus === "none" && (
          <Tab label="Active Sessions">
            <Sessions className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" onEnroll={handleEnrollSuccess} />
          </Tab>
         )}
        {(requestStatus === "approved" || requestStatus === "pending") ? (
          <Tab label="Preliminary Requests">
            <PreliminaryReqStud className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 mx-auto max-w-screen-lg" />
          </Tab>
        ) : (
          user.assignedProfessorId && professor && (
            <>
              <Tab label="Generate Request">
                <RequestGenerator student={user} professor={professor} />
              </Tab>
              <Tab label="Upload Request">
                <RequestUploader />
              </Tab>
            </>
          )
        )}
      </Tabs>
    </>
  );
};

export default DashboardStudent;