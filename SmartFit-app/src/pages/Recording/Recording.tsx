import React, { useState } from "react";
import "../../pages/Recording/Recording.scss";
import Button from "../../components/Button/Button";
import NoIcon from "../../assets/No-icon.svg";
import Header from "../../components/Header/Header";
import ErrorPrevention from "../../components/ErrorPrevention/ErrorPrevention";
import PoseDetection from "../../components/PoseDetection/PoseDetection";
import * as mpPose from "@mediapipe/pose";
import { useSetAtom } from "jotai";
import { recordingLogsAtom, responseAtom } from "../../atom/response";

import { useAtomValue } from "jotai";
const Recording = () => {
  const [showErrorPrevention, setShowErrorPrevention] = useState(false);
  const [landMarkLogs,setLandmarkLogs] = useState<mpPose.NormalizedLandmark[][]>([]);

  const [firstFrame,setFirstFrame] = useState<any>();

  const setResponseAtom = useSetAtom(responseAtom);

  const recordingLogs = useAtomValue(recordingLogsAtom)

  const handleEndClick = async () => {

    console.log("recordingLogs",recordingLogs)
    setShowErrorPrevention(true);
    return;

    const resp = await fetch("http://127.0.0.1:5000/predict",{
      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        landmarks:landMarkLogs,
        firstFrame:firstFrame,
      })
    })
    const data = await resp.json();
    setResponseAtom(data);
    setShowErrorPrevention(true);
  };

  const handleCloseModal = () => {
    setShowErrorPrevention(false); // Reset showErrorPrevention when the modal is closed
  };

  
  

  return (
    <div className="recordingPage">
      <Header variant={"phoneM"} title="Recording" />

      {/* Replace the placeholder with PoseDetection */}
      <div className="recordingArea">
        <PoseDetection setLandmarkLogs={setLandmarkLogs} firstFrame={firstFrame} setFirstFrame={setFirstFrame}/>
      </div>

      <Button
        icon={NoIcon}
        label="End Recording"
        onClick={handleEndClick}
        variant="red"
      />

      {showErrorPrevention && (
        <ErrorPrevention

          text="Are you sure you want to end the recording?"
          type="error"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Recording;
