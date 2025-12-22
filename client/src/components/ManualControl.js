import { useRef, useState } from "react";
import API from "../services/api";

function ManualControl() {
  const [currentTime, setCurrentTime] = useState("--:--");
  const [loadingTime, setLoadingTime] = useState(false);
  const offCounter = useRef(0);

  const turnOff = async () => {
    offCounter.current += 1;

    await API.post("/settings/update", {
      deviceStatus: "OFF",
      offCommandId: offCounter.current
    });
  };

  const showEspTime = async () => {
    setLoadingTime(true);

    await API.post("/settings/update", {
      requestTime: true
    });

    setTimeout(async () => {
      const res = await API.get("/settings");
      setCurrentTime(res.data.currentTime || "--:--");
      setLoadingTime(false);
    }, 3000);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm text-center p-4">
        <h3 className="mb-3">🔌 Manual Switch Control</h3>

        {/* TIME DISPLAY */}
        <div className="border rounded py-3 mb-4 bg-light">
          <div className="text-muted small">ESP32 Current Time</div>
          <div className="display-6 fw-bold text-primary">
            {currentTime}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="d-grid gap-3">
          <button
            className="btn btn-outline-info btn-lg"
            onClick={showEspTime}
            disabled={loadingTime}
          >
            {loadingTime ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Fetching ESP Time...
              </>
            ) : (
              "⏱ Show ESP Time"
            )}
          </button>

          <button
            className="btn btn-danger btn-lg"
            onClick={turnOff}
          >
            OFF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManualControl;
