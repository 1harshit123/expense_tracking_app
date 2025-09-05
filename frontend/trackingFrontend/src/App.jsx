// App.jsx
import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(135deg, #292e49 0%, #536976 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "48px 64px",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: 24 }}>👋 Hello, React!</h1>
        <p style={{ color: "#e0e0e0", fontSize: 20 }}>
          This is a fullscreen test of your React app setup.<br />
          <span style={{ color: "#7de2fc" }}>Change me as you like!</span>
        </p>
      </div>
    </div>
  );
}
