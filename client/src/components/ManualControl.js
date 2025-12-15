import { useEffect, useRef, useState } from "react";
import API from "../services/api";

function ManualControl() {
  const [currentTime, setCurrentTime] = useState("--:--");
  const offCounter = useRef(0);

  const turnOn = () => {
    API.post("/settings/update", {
      deviceStatus: "ON"
    });
  };

  const turnOff = () => {
    offCounter.current += 1;

    API.post("/settings/update", {
      deviceStatus: "OFF",
      offCommandId: offCounter.current
    });
  };

  // fetch ESP32 time
  useEffect(() => {
    const timer = setInterval(() => {
      API.get("/settings").then(res => {
        if (res.data.currentTime) {
          setCurrentTime(res.data.currentTime);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2>Manual Switch Control</h2>

      <h4 className="text-primary mt-3">
        ESP32 Time: {currentTime}
      </h4>

      {/* <button className="btn btn-success m-3" onClick={turnOn}>
        ON
      </button> */}

      <button className="btn btn-danger m-3" onClick={turnOff}>
        OFF
      </button>
    </div>
  );
}

export default ManualControl;
