// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { state } from "../store/rootReducer";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Button,
// } from "@mui/material";

// const Analyze: React.FC = () => {
//   const [currentFile, setCurrentFile] = useState<number>(0);
//   const [progress, setProgress] = useState<number>(0);
//   const [cancelPrompt, setcancelPrompt] = useState<boolean>(false);
//   const { count } = useParams<{ count: string }>(); // Extracting 'count' parameter from URL
//   const reports = useSelector((state: state) => state.upload.reports);
//   const navigate = useNavigate();
//   const totalCount = parseInt(count || "0", 10); // Ensure count is a number
//   const [heading, setHeading] = useState<string>("Analyzing");
//   const [showTick, setShowTick] = useState<boolean>(false);
//   const [oldHeading, setOldHeading] = useState<string>("");
//   const [hideFileProgress, setHideFileProgress] = useState<boolean>(false);

//   const handleCloseCancelPrompt = () => {
//     setcancelPrompt(false);
//   };

//   // Function to confirm cancellation and navigate back
//   const handleConfirmBack = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     const socket = new WebSocket("ws://127.0.0.1:8000/ws/progress/");

//     socket.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.message === "Analyzing" ) {
//         // Update the progress value only
//         setProgress((prevProgress) => Math.min(prevProgress + 20, 99)); // Adjust increment as needed
//       }

//       if (data.message === "Completed") {
//         setProgress((prevProgress) => Math.min(prevProgress + 20, 100));
//         setTimeout(() => {
//             // navigate("/user/analysis-results");
//         }, 1000); // 1 second
//     }

//     };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => {
//       socket.close(); // Clean up WebSocket on component unmount
//     };
//   }, []);

//   return (
//     <div className="home-container-analyze">
//       <div className="main-container-contents container-analyze">
//         <button
//           className="cancel-analysis-button"
//           onClick={() => setcancelPrompt(true)}
//         >
//           Cancel
//         </button>
//         <div className="main-container-header analyze-page">
//           <div className="analyze-progress-container">
//             <div
//               style={{
//                 width: "50%",
//                 backgroundColor: "transparent",
//                 borderRadius: "10px",
//                 marginBottom: "15px",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progress}%`,
//                   background:
//                     progress === 100
//                       ? "linear-gradient(90deg, #ED605B 0%, #FFDA01 100%)"
//                       : "#C4C4C4",
//                   height: "30px",
//                   borderRadius: "10px",
//                   transition: "width 0.2s",
//                 }}
//               />
//             </div>
//             <h3 className="progress-percentage">{Math.round(progress)}%</h3>
//             <div className="analyze-text">
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
//               voluptatum officiis cumque incidunt, voluptates minus cum
//               perferendis est delectus. Sapiente in reprehenderit iusto harum
//               nisi enim veritatis cum reiciendis rerum doloribus recusandae
//               aliquid cumque, non quos odio incidunt necessitatibus! Nemo odit
//               accusantium nisi voluptate facilis cum exercitationem impedit unde
//               hic.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cancel Prompt */}
//       <Dialog
//         open={cancelPrompt}
//         onClose={handleCloseCancelPrompt}
//         sx={{
//           "& .MuiDialog-paper": {
//             height: "40vh",
//             width: "50vw",
//             border: "2px solid black",
//             padding: "20px",
//           },
//         }}
//       >
//         <DialogContent>
//           <Typography
//             variant="h6"
//             sx={{
//               fontFamily: "Arial",
//               fontSize: "20px",
//               fontWeight: 700,
//               marginBottom: "40px",
//               textAlign: "center",
//             }}
//           >
//             Are you sure you want to cancel analyzing?
//           </Typography>
//           <Typography
//             sx={{
//               fontFamily: "Arial",
//               fontSize: "18px",
//               fontWeight: 400,
//               lineHeight: "23px",
//               textAlign: "center",
//             }}
//           >
//             By clicking yes your analysis will be cancelled and a report will not be produced. All files uploaded will be deleted.
//             Do you wish to continue?
//           </Typography>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             paddingBottom: "20px",
//           }}
//         >
//           <Button
//             onClick={handleConfirmBack}
//             sx={{
//               width: "166px",
//               height: "48px",
//               borderRadius: "10px",
//               background: "#c4c4c4",
//               fontFamily: "Arial",
//               fontSize: "16px",
//               fontWeight: 600,
//               color: "#000",
//               textAlign: "center",
//               cursor: "pointer",
//               "&:hover": {
//                 color: "white",
//                 background: "#c4c4c4",
//               },
//               "&:active": {
//                 color: "black",
//                 background: "#FFDA01",
//               },
//             }}
//           >
//             Yes
//           </Button>
//           <Button
//             onClick={handleCloseCancelPrompt}
//             sx={{
//               width: "166px",
//               height: "48px",
//               borderRadius: "10px",
//               background: "linear-gradient(90deg, #ed605b 0%, #f5aa49 54.97%, #ffda01 99.01%)",
//               fontFamily: "Arial, sans-serif",
//               fontSize: "16px",
//               fontWeight: 700,
//               color: "#000",
//               textAlign: "center",
//               cursor: "pointer",
//               "&:hover": {
//                 color: "white",
//               },
//               "&:active": {
//                 background: "#FFDA01",
//                 color: "black",
//               },
//             }}
//           >
//             No
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Analyze;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { state } from "../store/rootReducer";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const Analyze: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [cancelPrompt, setcancelPrompt] = useState<boolean>(false);
  const { count } = useParams<{ count: string }>(); // Extracting 'count' parameter from URL
  const reports = useSelector((state: state) => state.upload.reports);
  const navigate = useNavigate();
  const totalCount = parseInt(count || "0", 10); // Ensure count is a number
  const [heading, setHeading] = useState<string>("Analyzing");
  const [showTick, setShowTick] = useState<boolean>(false);
  const [oldHeading, setOldHeading] = useState<string>("");
  const [hideFileProgress, setHideFileProgress] = useState<boolean>(false);

  const handleCloseCancelPrompt = () => {
    setcancelPrompt(false);
  };

  // Function to confirm cancellation and navigate back
  const handleConfirmBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/progress/");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message === "Analyzing") {
        setProgress((prevProgress) => Math.min(prevProgress + 20, 99));
      }

      if (data.message === "Completed") {
        setProgress((prevProgress) => Math.min(prevProgress + 20, 100));
        setTimeout(() => {
          navigate("/user/analysis-results");
        }, 1000);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="home-container-analyze">
      {/* Main Content */}
      <div className="main-container-contents">
        <button
          className="cancel-analysis-button"
          onClick={() => setcancelPrompt(true)}
        >
          Cancel
        </button>


{/* 
      <div className="video-banner">
        <video className="background-video" autoPlay muted loop>
          <source src="src/assets/analyse-bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <svg className="masked-text-svg" viewBox="0 0 800 200"> 
          <defs>
            <mask id="text-mask">
              <rect width="100%" height="100%" fill="white" /> 
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="140" fontWeight="bold" fill="#17213C">
                ANALYZING
              </text>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#17213C" mask="url(#text-mask)" />
        </svg>
      </div> */}

<div className="video-banner" style={{ position: 'relative', width: '400px', height: '400px', overflow: 'hidden' }}>
  <video
    className="background-video"
    autoPlay
    muted
    loop
    style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: 'scale(1.5) translate(1%, 10%)', // Adjust scale and translate values here
    }}
  >
    <source src="src/assets/analyse-bg-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <svg className="masked-text-svg" viewBox="0 0 829 584" style={{ width: '100%', height: '100%' }}>
    <defs>
      <mask id="text-mask">
        <rect width="100%" height="100%" fill="white" />
        <image
          xlinkHref="/component.png"
          x="50%"
          y="50%"
          width="1200"
          height="500"
          transform="translate(-600, -150)"
        />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="#17213C" mask="url(#text-mask)" />
  </svg>
</div>


        

        <div className="container-analyze"></div>

        <div className="main-container-header analyze-page">
          <div className="analyze-progress-container">

            <div
              style={{
                width: "50%",
                backgroundColor: "transparent",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  background:
                    progress === 100
                      ? "linear-gradient(90deg, #ED605B 0%, #FFDA01 100%)"
                      : "#C4C4C4",
                  height: "30px",
                  borderRadius: "10px",
                  transition: "width 0.2s",
                }}
              />
            </div>
            <h3 className="progress-percentage">{Math.round(progress)}%</h3>
            <div className="analyze-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              iste id deleniti minima inventore. Modi tempora consectetur rerum
              sequi labore sint, impedit aut itaque iusto molestiae! Unde,
              vitae! Architecto tenetur ut omnis rem qui nobis obcaecati!
              Laudantium quod iure veritatis, iste velit eius, quidem eaque,
              expedita dolorem id ex impedit.
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Prompt */}
      <Dialog
        open={cancelPrompt}
        onClose={handleCloseCancelPrompt}
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
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Are you sure you want to cancel analyzing?
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
            By clicking yes your analysis will be cancelled and a report will
            not be produced...
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
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
              "&:hover": {
                color: "white",
                background: "#c4c4c4",
              },
              "&:active": {
                color: "black",
                background: "#FFDA01",
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseCancelPrompt}
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
              "&:hover": {
                color: "white",
              },
              "&:active": {
                background: "#FFDA01",
                color: "black",
              },
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Analyze;
