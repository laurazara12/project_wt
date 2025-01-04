import {useCallback, useEffect, useState} from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import {formatDate} from "../../../lib/utils.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";
import {startOfMonth, add} from 'date-fns'

const url = "http://localhost:3000/enrollment/create"

const Sessions = ({className}) => {
  const [sessions, setSessions] = useState(null);

  const {user} = useAuth();

  const fetchActiveSession = useCallback(() => {
    return fetch("http://localhost:3000/enrollment/sessions/active", {
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
        console.log(data);
        setSessions((data.activeEnrollmentSessions || []).filter((session) => session.professorId === user.professorId));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user.professorId])

  const createSession = useCallback(async () => {
    const body = {
      professorId: user.professorId,
      startTime: startOfMonth(new Date()),
      endTime: add(new Date(), {months: 2}),
      studentsLimit: 10
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      fetchActiveSession()
    } else {
      console.log("error", response)
    }
  }, [fetchActiveSession, user.professorId])


  useEffect(() => {
    fetchActiveSession()
  }, [fetchActiveSession]);


  return (
    <div className={className}>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => (
          <div key={session.sessionId}>
            <Card>
              <div>
                <h1>Session ID: {session.sessionId}</h1>
                <p>Professor: {session.professorName}</p>
                <p>Start Time: {formatDate(session.startTime)}</p>
                <p>End Time: {formatDate(session.endTime)}</p>
                <p>Enrolled Students: {session.enrolledStudents}</p>
                <p>Students Limit: {session.studentsLimit}</p>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <div className={className}>
          <h1>No sessions</h1>
          <Button onClick={() => createSession()}>CREATE SESSION</Button>
        </div>
      )}
    </div>
  );
};

export default Sessions;
