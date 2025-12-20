import { useState } from "react";
import API from "../services/api";

function Settings() {
  const [onAngle, setOnAngle] = useState(180);
  const [offAngle, setOffAngle] = useState(150);
  const [autoOffTime, setAutoOffTime] = useState("05:00");

  const saveSettings = () => {
    API.post("/settings/update", {
      onAngle,
      offAngle,
      autoOffTime
    });
  };

  return (
    <div className="container mt-5">
      <h2>Device Settings</h2>

      <label>ON Angle (0–180)</label>
      <input
        type="number"
        className="form-control"
        value={onAngle}
        onChange={e => setOnAngle(Number(e.target.value))}
      />

      <label className="mt-3">OFF Angle (0–180)</label>
      <input
        type="number"
        className="form-control"
        value={offAngle}
        onChange={e => setOffAngle(Number(e.target.value))}
      />

      <label className="mt-3">Auto OFF Time</label>
      <input
        type="time"
        className="form-control"
        value={autoOffTime}
        onChange={e => setAutoOffTime(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={saveSettings}>
        Save
      </button>
    </div>
  );
}

export default Settings;
