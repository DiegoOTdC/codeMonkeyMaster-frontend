import React, { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, set_Seconds] = useState(0);
  const [minutes, set_Minutes] = useState(0);
  const [hours, set_Hours] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (seconds < 59) {
        set_Seconds(seconds + 1);
      } else if (seconds >= 59) {
        console.log("seconds inside here", seconds);
        set_Seconds(0);
        if (minutes < 59) {
          set_Minutes(minutes + 1);
        } else if (minutes >= 59) {
          set_Minutes(0);
          set_Hours(hours + 1);
        }
      }
    }, [1000]);
  }, [seconds]);

  console.log("seconds", seconds);
  //   console.log("minutes", minutes);
  //   console.log("hours", hours);

  return (
    <div style={{ color: "#f0ad4e" }}>{`${
      hours ? (hours > 9 ? hours : "0" + hours) : "00"
    }:${minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00"}:${
      seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00"
    }`}</div>
  );
}
