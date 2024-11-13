import React, { useEffect, useState } from "react";
import FileUploadIcon from "../assets/uploadIcons.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  uploadAudioRequest,
  uploadTextRequest,
  uploadVideoRequest,
} from "../store/analysis/actions";

interface Params {
  [key: string]: string | undefined;
}

const FileUpload: React.FC = () => {
  const params = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [draggingOver, setDraggingOver] = useState<boolean>(false);
  const [backPrompt, setBackPrompt] = useState<boolean>(false);
  const [multipleFilesPrompt, setMultipleFilesPrompt] =
    useState<boolean>(false);
  const [speakersPrompt, setSpeakersPrompt] = useState<boolean>(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [totalAnalysisTime, setTotalAnalysisTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("DONE");
    console.log(filenames);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.backgroundColor = "white";
    }

    return () => {
      if (rootElement) {
        rootElement.style.backgroundColor = "";
      }
    };
  }, []);

  const dispatch = useDispatch();

  // Allowed file types
  const allowedFileTypes: { [key: string]: string[] } = {
    text: [
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ],
    audio: ["audio/mp4", "audio/wav", "audio/m4a", "audio/aac"], // !!! 'video/mp4'
    video: ["video/mp4", "video/x-matroska", "video/quicktime", "video/x-flv"],
  };

  const calculateAnalysisTime = (files: File[]): number => {
    let time = 0;
    files.forEach((file) => {
      const fileSizeMB = file.size / 1048576; // Convert size to MB
      time += fileSizeMB * 0.7; // Example: 0.5 minutes per MB
    });
    return time;
  };
  const convertToFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append(`${params.type}`, file); //!!!!!
    return formData;
  };

  // Update the handleFileChange function to recalculate the analysis time
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      const fileType = params.type ?? "text"; // Default to 'text' if undefined
      const invalidFiles = fileList.filter(
        (file) => !allowedFileTypes[fileType]?.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setErrorMessage(
          `Invalid file types: ${invalidFiles
            .map((file) => file.name)
            .join(", ")}`
        );
        return;
      }
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...fileList];
        setTotalAnalysisTime(calculateAnalysisTime(updatedFiles));
        setErrorMessage(null);
        return updatedFiles;
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileList = Array.from(droppedFiles);
      const fileType = params.type ?? "text"; // Default to 'text' if undefined
      const invalidFiles = fileList.filter(
        (file) => !allowedFileTypes[fileType]?.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setErrorMessage(
          `INVALID FILE TYPES: ${invalidFiles
            .map((file) => file.name)
            .join(", ")}`
        );
        return;
      }
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...fileList];
        setTotalAnalysisTime(calculateAnalysisTime(updatedFiles));
        setErrorMessage(null);
        return updatedFiles;
      });
    }
  };

  const handleAnalyze = () => {
    const filenames = files.map((file) => file.name.replace(/\.[^/.]+$/, "")); // Remove extensions from filenames
    setFilenames(filenames); // Store filenames in state
    localStorage.setItem("filenames", JSON.stringify(filenames)); // Store filenames in localStorage
    const type = params.type ?? "default"; // Provide a default value if params.type is undefined
    localStorage.setItem("type", type); // Store type in local storage
    const file_to_send = files.map(convertToFormData);

    if (params.type === "text") {
      dispatch(uploadTextRequest(file_to_send));
      navigate(`/user/analyze/${params.type}/${files.length}`);
    } else {
      setSpeakersPrompt(true);
      setMultipleFilesPrompt(false);
    }
  };

  useEffect(() => {}, [speakersPrompt]);

  const handleCloseBackPrompt = () => setBackPrompt(false);
  const handleConfirmBack = () => navigate("/user/new-analysis");

  if (backPrompt) {
    return (
      <Dialog
        open={backPrompt}
        onClose={handleCloseBackPrompt}
        sx={{
          "& .MuiDialog-paper": {
            height: "40vh",
            width: "50vw",
            border: "2px solid black",
            padding: "20px",
          },
        }}
      >
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Arial",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "70px",
              textAlign: "center",
            }}
          >
            Are you sure you want to go back?
          </Typography>
          <Typography
            sx={{
              fontFamily: "Arial",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "23px",
              textAlign: "center",
            }}
          >
            This will delete the files you have uploaded to Brevity!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px", // spacing between buttons
            paddingBottom: "20px",
          }}
        >
          <Button
            onClick={handleConfirmBack}
            sx={{
              width: "166px",
              height: "48px",
              borderRadius: "10px",
              background: "#c4c4c4",
              fontFamily: "Arial",
              fontSize: "16px",
              fontWeight: 600,
              color: "#000",
              textAlign: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease, color 600ms ease-out",
              "&:hover": {
                color: "white",
                background: "#c4c4c4",
                transition: "background 600ms ease-out, color 600ms ease-out",
              },
              "&:active": {
                color: "black",
                background: "#FFDA01",
                transition: "none",
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseBackPrompt}
            sx={{
              width: "166px",
              height: "48px",
              borderRadius: "10px",
              background:
                "linear-gradient(90deg, #ed605b 0%, #f5aa49 54.97%, #ffda01 99.01%)",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#000",
              textAlign: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                color: "white",
                transition: "background 600ms ease-out, color 600ms ease-out",
              },
              "&:active": {
                background: "#FFDA01",
                color: "black",
                transition: "none",
              },
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (multipleFilesPrompt) {
    return (
      <div className="home-container">
        <div className="main-container-contents">
          <div className="main-container-header back-prompt">
            <p>You have uploaded multiple files.</p>
            <p>Do you wish to produce a co-occurence report?</p>
            <p>
              A co-occurrence report will look for themes of deception across
              all the uploaded files.
            </p>
            <div className="back-prompt-confirmation-buttons-container">
              <button
                className="green-button"
                onClick={() => {
                  setFiles([]);
                  setMultipleFilesPrompt(false);
                }}
              >
                No
              </button>
              <button className="red-button" onClick={handleAnalyze}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (speakersPrompt) {
    return (
      <div className="home-container">
        <div className="main-container-contents-fileupload">
          <button
            className="back-button"
            onClick={() => setSpeakersPrompt(false)}
          >
            Back
          </button>
          <div className="new-analysis-main-container">
            <p>How many speakers are there in this {params.type} file?</p>
            <div className="new-analysis-options">
              <div
                className="analysis-type-box"
                onClick={() => {
                  const file_to_send = files.map(convertToFormData);
                  const new_data_to_send: FormData[] = [];
                  file_to_send.forEach((formData: FormData) => {
                    formData.append("Diarization", "No");
                    new_data_to_send.push(formData);
                  });
                  if (params.type === "audio") {
                    dispatch(uploadAudioRequest(new_data_to_send));
                  } else if (params.type === "video") {
                    dispatch(uploadVideoRequest(new_data_to_send));
                  }
                  navigate(`/user/analyze/${params.type}/${files.length}`);
                }}
              >
                <div className="type-box-top">1 Person</div>
                <div className="type-box-bottom speaker-text">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis similique ullam voluptates, aut magni at eaque
                    nostrum ipsam dicta, unde, maxime impedit. Atque,
                    necessitatibus tenetur?
                  </p>
                </div>
              </div>

              <div
                className="analysis-type-box"
                onClick={() => {
                  const file_to_send = files.map(convertToFormData);
                  const new_data_to_send: FormData[] = [];
                  file_to_send.forEach((formData: FormData) => {
                    formData.append("Diarization", "Yes");
                    new_data_to_send.push(formData);
                  });
                  if (params.type === "audio") {
                    dispatch(uploadAudioRequest(new_data_to_send));
                  } else if (params.type === "video") {
                    dispatch(uploadVideoRequest(new_data_to_send));
                  }
                  navigate(`/user/analyze/${params.type}/${files.length}`);
                }}
              >
                <div className="type-box-top">2 or More</div>
                <div className="type-box-bottom speaker-text">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis similique ullam voluptates, aut magni at eaque
                    nostrum ipsam dicta, unde, maxime impedit. Atque,
                    necessitatibus tenetur?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let acceptedFormats = "";
  if (params.type === "text") {
    acceptedFormats =
      "text/plain, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (params.type === "audio") {
    acceptedFormats = "audio/*,.mp4"; //, audio/wav, audio/m4a, audio/aac
  } else if (params.type === "video") {
    acceptedFormats =
      "video/*, video/mp4, video/x-matroska, video/quicktime, video/x-flv";
  }

  return (
    <div className="home-container-fileupload">
      <div className="main-container-contents-fileupload">
        <div className="main-container-header">
          <button
            className="back-button back-button-up"
            onClick={() => {
              if (files.length > 0) {
                setBackPrompt(true);
              } else {
                navigate("/user/new-analysis");
              }
            }}
          >
            Back
          </button>
        </div>
        <div
          className="main-container-body upload-container"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={FileUploadIcon} width={130} />
          <p className="upload-container-text">
            {draggingOver
              ? "Drop files here or"
              : "Drag & drop Multiple files or"}
            <input
              type="file"
              accept={acceptedFormats}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
              multiple
            />
            <label
              htmlFor="fileInput"
              style={{
                cursor: "pointer",
                color: "light-blue",
                textDecoration: "underline",
                marginLeft: "7px",
                fontWeight: "700",
              }}
            >
              Browse
            </label>
          </p>
          {/* <h5>Supported files: {params.type === 'text' ? 'TXT, DOCX, PDF' : params.type === 'audio' ? 'MP3, WAV, MP4' : params.type === 'video' ? 'MP4, MKV, MOV, FLV' : ''}</h5> */}
          {errorMessage && (
            <p style={{ color: "red", marginTop: "40px", fontWeight: "bold" }}>
              {errorMessage}
            </p>
          )}
        </div>
        {files.length > 0 && (
          <div className="upload-details">
            <p>The following files have been successfully uploaded:</p>
            <div className="uploaded-file-table">
              {/* File Rows */}
              {files.map((file, index) => (
                <div key={index} className="table-row">
                  <span
                    className="table-cell"
                    style={{ fontWeight: "400" }}
                    title={file.name}
                  >
                    {file.name.length > 30
                      ? file.name.substring(0, 30) + "..."
                      : file.name}
                  </span>
                  <span className="table-cell">
                    {(file.size / 1048576).toFixed(2)} MB
                  </span>
                </div>
              ))}

              {/* Estimated Time Row */}
              <div className="table-row estimated-time-row">
                <span className="table-cell">
                  Estimated analysis time:{" "}
                  <span style={{ fontWeight: "400", marginLeft: "30px" }}>
                    {totalAnalysisTime.toFixed(2)} minutes
                  </span>
                </span>
              </div>
            </div>

            <button
              className="update-plan-button"
              onClick={() => {
                if (files.length === 1) {
                  handleAnalyze();
                } else {
                  setMultipleFilesPrompt(true);
                }
              }}
            >
              Analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
