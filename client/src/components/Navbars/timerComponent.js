import { useEffect, useState, useRef } from "react";
import { useDispatch} from "react-redux";
import checkIn from "../../Redux/Action/driver";
import { Nav } from "react-bootstrap";
const TimerComponent = ({onlyTimer}) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(
    () => localStorage.getItem("checkinStatus") || "Check-In"
  );
  const [time, setTime] = useState(
    () => parseInt(localStorage.getItem("timerValue"), 10) || 0
  );
  const [isActive, setIsActive] = useState(
    () => localStorage.getItem("isActive") === "true"
  );
  const [isPaused, setIsPaused] = useState(
    () => localStorage.getItem("isPaused") === "true"
  );
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  useEffect(() => {
    localStorage.setItem("timerValue", time);
    localStorage.setItem("isActive", isActive.toString());
    localStorage.setItem("isPaused", isPaused.toString());
  }, [time, isActive, isPaused]);

  const handleCheckIn = async () => {
    try {
      const currentDateTime = new Date();
      const data = {
        checkInDate: `${currentDateTime.getFullYear()}-${String(
          currentDateTime.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDateTime.getDate()).padStart(
          2,
          "0"
        )}`,
      };

      if (check === "Check-In") {
        // data.checkinTime = currentDateTime.toLocaleTimeString();
        data.checkinTime = currentDateTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        const response = await dispatch(checkIn(data));
        if (response.payload.status === 201) {
          localStorage.setItem("checkinStatus", "Halt");
          localStorage.setItem("checkinTime", currentDateTime.toISOString());
          startTimer();
          setCheck("Halt");
        }
      }
      if (check === "Halt") {
        data.isOnBreak = true
        // data.breakTime = currentDateTime.toLocaleTimeString("en-GB", {
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   second: "2-digit",
        // });
        const response = await dispatch(checkIn(data));
        stopTimer();
        localStorage.setItem("checkinStatus", "Resume");
        setCheck("Resume");
      }
      if (check === "Resume") {
        data.isOnBreak = false
        // data.breakTime = currentDateTime.toLocaleTimeString("en-GB", {
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   second: "2-digit",
        // });
        const response = await dispatch(checkIn(data));
        startTimer();
        localStorage.setItem("checkinStatus", "Halt");
        setCheck("Halt");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentDateTime = new Date();
      const data = {
        // checkoutTime: currentDateTime.toLocaleTimeString(),
        checkoutTime: currentDateTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        checkInDate: `${currentDateTime.getFullYear()}-${String(
          currentDateTime.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDateTime.getDate()).padStart(
          2,
          "0"
        )}`,
        checkoutDate: `${currentDateTime.getFullYear()}-${String(
          currentDateTime.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDateTime.getDate()).padStart(
          2,
          "0"
        )}`,
      };

      const response = await dispatch(checkIn(data));
      if (response.payload.status === 200) {
        localStorage.setItem("checkinStatus", "Check-In");
        localStorage.removeItem("checkinTime");
        localStorage.removeItem("timerValue");
        resetTimer();
        setCheck("Check-In");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedCheckinStatus = localStorage.getItem("checkinStatus");
    const storedTimerValue = parseInt(localStorage.getItem("timerValue"), 10);
    const storedIsActive = localStorage.getItem("isActive") === "true";
    const storedIsPaused = localStorage.getItem("isPaused") === "true";
    if (storedCheckinStatus) {
      setCheck(storedCheckinStatus);
      setTime(storedTimerValue || 0);
      setIsActive(storedIsActive);
      setIsPaused(storedIsPaused);

      if (storedCheckinStatus === "Halt") {
        startTimer();
      } else if (storedCheckinStatus === "Resume") {
        stopTimer();
      } else {
        stopTimer();
      }
    } else {
      stopTimer();
    }
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <Nav.Item>
    <span className="no-icon timer-check-in">{formatTime(time)}</span>
    {onlyTimer === "true" && (
      <>
        <Nav.Link className="m-0 timer-nav-link" onClick={handleCheckIn}>
          <span className="no-icon timer-check-in">{check}</span>
        </Nav.Link>
        {check !== "Check-In" && (
          <Nav.Link className="m-0 timer-nav-link" onClick={handleCheckOut}>
            <span className="no-icon timer-check-out">Check-Out</span>
          </Nav.Link>
        )}
      </>
    )}
  </Nav.Item>
  );
};

export default TimerComponent;



