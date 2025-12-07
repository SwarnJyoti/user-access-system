import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username || "User";

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "black",
            maxWidth: "600px",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              marginBottom: "10px",
              fontWeight: "700",
              textShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            Welcome to our Website
          </h1>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "10px",
              fontWeight: "600",
              textShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            Hello, {userName} 
          </h2>

          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              opacity: "0.9",
              lineHeight: "1.7",
              fontWeight: "400",
            }}
          >
            We are happy to see you here. Explore the features and enjoy your
            experience!
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
