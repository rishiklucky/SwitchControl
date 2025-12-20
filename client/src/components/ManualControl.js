import { useRef, useState } from "react";
import API from "../services/api";

function ManualControl() {
  const [currentTime, setCurrentTime] = useState("--:--");
  const [loadingTime, setLoadingTime] = useState(false); // 🔄 loading state
  const offCounter = useRef(0);

  const turnOff = async () => {
    offCounter.current += 1;

    await API.post("/settings/update", {
      deviceStatus: "OFF",
      offCommandId: offCounter.current
    });
  };

  const showEspTime = async () => {
    setLoadingTime(true); // start loading

    // 1️⃣ ask ESP32 to send time
    await API.post("/settings/update", {
      requestTime: true
    });

    // 2️⃣ wait for ESP32 loop
    setTimeout(async () => {
      const res = await API.get("/settings");
      setCurrentTime(res.data.currentTime || "--:--");
      setLoadingTime(false); // stop loading
    }, 3000); // must be > ESP32 delay
  };

  return (
    <div className="container text-center mt-5">
      <h2>Manual Switch Control</h2>

      <h4 className="text-primary mt-3">
        ESP32 Time: {currentTime}
      </h4>

      {/* 🔄 SHOW TIME BUTTON */}
      <button
        className="btn btn-info m-3"
        onClick={showEspTime}
        disabled={loadingTime}
      >
        {loadingTime ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
            Fetching...
          </>
        ) : (
          "Show ESP Time"
        )}
      </button>

      {/* 🔴 OFF BUTTON */}
      <button className="btn btn-danger m-3" onClick={turnOff}>
        OFF
      </button>
    </div>
  );
}

export default ManualControl;
