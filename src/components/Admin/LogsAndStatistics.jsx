import React, { useEffect, useState } from "react";


const UserAccessLogs = ({ userId }) => {
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3308/api/access-logs/user?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setAccessLogs(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [userId, setAccessLogs]);

  return (
    <div>
      <h2>Log di accesso per l'utente {userId}</h2>
      {accessLogs.map((log, idx) => (
        <div key={idx}>
          <p>Data e ora: {log.data_log}</p>
          {/* Altre informazioni dei log */}
        </div>
      ))}
    </div>
  );
};

// const AppStatistics = () => {
//   const [accessLogs, setAccessLogs] = useState([]);


//   // useEffect(() => {
//   //   try {
//   //     fetch(`http://localhost:3308/api/access-logs/total`)
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         setAccessLogs(data);
//   //       });
//   //   } catch (error) {
//   //     console.error("Errore durante il recupero dei log di accesso:", error);
//   //   }
//   // }, []);
  


//   useEffect(() => {
//     const fetchAccessLogs = async () => {
//       try {
//         const response = await fetch("/api/access-logs/total");
//         const data = await response.json();
//         setAccessLogs(data);
//       } catch (error) {
//         console.error("Errore durante il recupero dei log di accesso:", error);
//       }
//     };

//     fetchAccessLogs();
//   }, []);

//   const totalAccesses = accessLogs.length;

//   return (
//     <div>
//       <h2>Statistiche dell'applicazione</h2>
//       <p>Numero totale di accessi: {totalAccesses}</p>
//       {/* Altre statistiche */}
//     </div>
//   );
// };

const LogsAndStatistics = () => {
  const [userId, setUserId] = useState("");
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3308/api/access-logs/user?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setAccessLogs(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [userId]);

  return (
    <div>
      <h3>
        Consultazione numero di accessi: <br /> inserire ID utente per informazioni.
      </h3>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Inserisci ID utente"
      />
      {userId && (
        <>
          <UserAccessLogs userId={userId} setAccessLogs={setAccessLogs} />
          {/* <AppStatistics /> */}
        </>
      )}
    </div>
  );
};

export default LogsAndStatistics;