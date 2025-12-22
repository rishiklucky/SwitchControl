import { useEffect, useState } from "react";
import API from "../services/api";

function Settings() {
  const [onAngle, setOnAngle] = useState(180);
  const [offAngle, setOffAngle] = useState(150);
  const [autoOffTime, setAutoOffTime] = useState("05:00");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // 🔄 Load real values from backend
  useEffect(() => {
    API.get("/settings").then(res => {
      if (res.data) {
        setOnAngle(res.data.onAngle ?? 180);
        setOffAngle(res.data.offAngle ?? 150);
        setAutoOffTime(res.data.autoOffTime ?? "05:00");
      }
    });
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    setSaved(false);

    await API.post("/settings/update", {
      onAngle,
      offAngle,
      autoOffTime
    });

    setSaving(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center mb-4">⚙️ Device Settings</h3>

        {/* ON ANGLE */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            ON Angle: <span className="text-primary">{onAngle}°</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="180"
            value={onAngle}
            onChange={e => setOnAngle(Number(e.target.value))}
          />
        </div>

        {/* OFF ANGLE */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            OFF Angle: <span className="text-danger">{offAngle}°</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="180"
            value={offAngle}
            onChange={e => setOffAngle(Number(e.target.value))}
          />
          <small className="text-muted">
            Adjust carefully to match your physical switch
          </small>
        </div>

        {/* AUTO OFF TIME */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Auto OFF Time
          </label>
          <input
            type="time"
            className="form-control"
            value={autoOffTime}
            onChange={e => setAutoOffTime(e.target.value)}
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={saveSettings}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {saved && (
          <div className="alert alert-success text-center mt-3 py-2">
            ✅ Settings saved successfully
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
