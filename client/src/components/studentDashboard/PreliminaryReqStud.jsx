import { useEffect, useState } from "react";
import Card from "../ui/Card.jsx";

const PreliminaryReqStud = ({ className }) => {
  const [preliminaryRequests, setPreliminaryRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        console.log(data);
        setPreliminaryRequests(data.preliminaryRequests || []);
      } catch (error) {
        console.error("There was an error!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreliminaryRequests();
  }, []);

  return (
    <div className={className}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : preliminaryRequests.length > 0 ? (
        [...preliminaryRequests]
          .sort((a, b) => (a.status === "rejected" ? 1 : -1))
          .map((preliminaryRequest) => (
            <Card key={preliminaryRequest.preliminaryRequestId}>
              <div>
                <h1>Preliminary Request ID: {preliminaryRequest.preliminaryRequestId}</h1>
                <p>Session Id: {preliminaryRequest.sessionId}</p>
                <p>Title: {preliminaryRequest.title}</p>
                <p>Description: {preliminaryRequest.description}</p>
                <p>
                  Status:{" "}
                  <span className={preliminaryRequest.status === "rejected" ? "text-red-800" : ""}>
                    {preliminaryRequest.status}
                  </span>
                </p>
                {preliminaryRequest.status === "rejected" && (
                  <p>Justification: {preliminaryRequest.professorJustification}</p>
                )}
              </div>
            </Card>
          ))
      ) : (
        <h1>No preliminary requests</h1>
      )}
    </div>
  );
};

export default PreliminaryReqStud;