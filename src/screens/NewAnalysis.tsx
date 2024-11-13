import React from "react";
import { useNavigate } from "react-router-dom";

const NewAnalysis: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <div className="main-container-contents-fileupload">
        <button
          className="back-button"
          onClick={() => navigate("/user/home")}
        >
          Back
        </button>
        <div className="new-analysis-main-container">
          <p>What type of analysis do you wish to run?</p>
          <div className="new-analysis-options">

            <div
              className="analysis-type-box"
              onClick={() => navigate('/user/new-analysis/upload/text')}
            >
              <div className="type-box-top">Text</div>
              <div className="type-box-bottom">
                <p>Supported Files:</p>
                <p className="file-types">TXT, DOC, DOCX, PDF</p>
              </div>
            </div>

            <div
              className="analysis-type-box"
              onClick={() => navigate('/user/new-analysis/upload/audio')}
            >
              <div className="type-box-top">Audio</div>
              <div className="type-box-bottom">
                <p>Supported Files:</p>
                <p className="file-types">MP4, MP3, WAV</p>
              </div>
            </div>

            <div
              className="analysis-type-box"
              onClick={() => navigate('/user/new-analysis/upload/video')}
            >
              <div className="type-box-top">Video</div>
              <div className="type-box-bottom">
                <p>Supported Files:</p>
                <p className="file-types">MP4, MKV, MOV, FLV</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysis;
