import { useState } from "react";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import Datapanel from "./components/Datapanel";

const App = () => {
  const [isLeftLeg, setIsLeftLeg] = useState(true);
  const [showCanvas, setShowCanvas] = useState(true);
  const [showStart, setShowStart] = useState(true);
  const [squatData, setSquatData] = useState({});

  const startRecording = () => {
    console.log("Start");
    setShowStart(!showStart);
  };
  const stopRecording = () => {
    console.log("Stop");
    setShowStart(!showStart);
    setTimeout(function () {
      setShowCanvas(!showCanvas);
    }, 1000);
  };

  const handleSquatData = (squatData) => {
    setSquatData(squatData);
    //stopRecording();
  };

  return (
    <div className="container">
      {showCanvas ? (
        <>
          <Canvas
            isLeftLeg={isLeftLeg}
            isStarted={!showStart}
            getSquatData={handleSquatData}
          />
          <ControlPanel
            onChange={() => setIsLeftLeg(!isLeftLeg)}
            onClick={showStart ? startRecording : stopRecording}
            showStart={showStart}
          />
        </>
      ) : (
        <Datapanel
          onClick={() => setShowCanvas(!showCanvas)}
          squatData={squatData}
        />
      )}
    </div>
  );
};

export default App;
