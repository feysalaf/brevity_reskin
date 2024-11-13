// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { state } from "../store/rootReducer";
// import { useSelector, useDispatch } from "react-redux";
// import { deletePDFs } from "../store/analysis/actions";
// import { Typography, Box } from "@mui/material";

// const AnalysisResults = () => {
//   const [endSession, setEndSession] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const text_pdfs = useSelector((state: state) => state.upload.reports);
//   const [blobUrl, setBlobUrl] = useState<string>('');
//   const dispatch = useDispatch()
//   const [filenames, setFilenames] = useState<string[]>([]);
//   const [type, setType] = useState<string>('');
 
  
//   useEffect(() => {
//     const storedFilenames = localStorage.getItem('filenames');
//     const storedType = localStorage.getItem('type');
    
//     if (storedType) {
//       setType(storedType);
//     }
//     if (storedFilenames) {
//       setFilenames(JSON.parse(storedFilenames));
//     }

//     console.log("Text_pdfs: ", text_pdfs);

//     if (Array.isArray(text_pdfs) && text_pdfs.length > 0) {
//       console.log("inside if");
//       console.log({ text_pdfs });

//       // Check if the first item is an ArrayBuffer
//       if (text_pdfs[0] instanceof ArrayBuffer) {
//         console.log("arraybuffer");
//         // Create a Blob from the ArrayBuffer
//         const blob = new Blob([text_pdfs[0]]);
//         const url = URL.createObjectURL(blob); // Create a blob URL
//         setBlobUrl(url); // Set the blob URL
//         console.log("Blob URL set:", url);
//       } else {
//         console.log("string probbaly");
//         console.log("Type is:", typeof text_pdfs[0]);
//         const url = text_pdfs[0];
//         setBlobUrl(url);
//       }
//     }
//   }, [text_pdfs]);

//   //clean it up on unmount or chnage 
//   useEffect(() => {
//     return () => {
//       if (blobUrl) {
//         URL.revokeObjectURL(blobUrl);
//       }
//     };
//   }, [blobUrl]);
  
  

 
//   if (endSession) {
//     return (
//       <div className="home-container">
//         <div className="main-container-contents">
//           <div className="main-container-header back-prompt">
//             <p>Please ensure you have downloaded your PDF.</p>
//             <p>
//               Clicking Yes will return you to the main screen and your PDF and
//               file will be cleared from the Brevity.
//             </p>
//             <p>Are you sure you wish to finish this session?</p>
//             <div className="back-prompt-confirmation-buttons-container">
//               <button
//                 className="green-button"
//                 onClick={() => setEndSession(false)}
//               >
//                 No
//               </button>
//               <button
//                 className="red-button"
//                 onClick={() => navigate("/user/home/")}
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
      
//       <div className="main-container-contents-analysis-results">
//       <button
//             className="back-button-results"
//             onClick={() => {
//               setEndSession(true);
//               dispatch(deletePDFs())
//             }}
//           >
//             Finish Session
//           </button>
//         <div className="main-container-header analysis-result-main-container">
//           {/* <h3  className="analysis-heading" >Analysis Complete!</h3> */}
//           <div className="analysis-result-container">
//             <div className="analysis-left">
//               <div className="analysis-results">
//                 {blobUrl ? (
//                   <iframe
//                     src={blobUrl}
//                     style={{ width: "100%", height: "100%", border: "none", borderRadius: '7px' }}
//                     title="PDF Viewer"
//                   />
//                 ) : (
//                   <p>PDF Will SHOW HERE</p>
//                 )}
//               </div>
//             </div>
//             <div className="analysis-right">
//             <div
//               className="receipt-box"
//             >
//               <div className="receipt-box-top">Receipt</div>
//               <div className="receipt-box-bottom">
//               <Box className="receipt-row">
//                 <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }} >Units used in this season:</Typography>
//                 <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>15</Typography>
//               </Box>
//               <Box className="receipt-row">
//                 <Typography  sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>
//                   Total Plan units used:
//                 </Typography>
//                 <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>360</Typography>
//               </Box>
//               <Box className="receipt-row">
//                 <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>
//                   Total units remaining:
//                 </Typography>
//                 <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>140</Typography>
//               </Box>
//               </div>
//             </div>

//               <button
//                 className="update-plan-button download-pdf-button"
//                 onClick={() => {
//                   if (blobUrl) {
//                     const a = document.createElement('a');
//                     a.href = blobUrl;
//                     a.download = `${filenames[0]}_Brevity_${type}_Analysis_Report.pdf`;
//                     a.click();
//                   }
//                 }}
//               >
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResults;











import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { state } from "../store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { deletePDFs } from "../store/analysis/actions";
import { Typography, Box, Dialog, DialogActions, DialogContent, Button } from "@mui/material";

const AnalysisResults = () => {
  const [endSession, setEndSession] = useState<boolean>(false);
  const [backPrompt, setBackPrompt] = useState<boolean>(false); // New state for dialog
  const navigate = useNavigate();
  const text_pdfs = useSelector((state: state) => state.upload.reports);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const dispatch = useDispatch();
  const [filenames, setFilenames] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  
  useEffect(() => {
    const storedFilenames = localStorage.getItem('filenames');
    const storedType = localStorage.getItem('type');
    
    if (storedType) {
      setType(storedType);
    }
    if (storedFilenames) {
      setFilenames(JSON.parse(storedFilenames));
    }

    if (Array.isArray(text_pdfs) && text_pdfs.length > 0) {
      if (text_pdfs[0] instanceof ArrayBuffer) {
        const blob = new Blob([text_pdfs[0]]);
        const url = URL.createObjectURL(blob); // Create a blob URL
        setBlobUrl(url); // Set the blob URL
      } else {
        setBlobUrl(text_pdfs[0]);
      }
    }
  }, [text_pdfs]);

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);
  
  // Handle Dialog open/close
  const handleCloseBackPrompt = () => {
    setBackPrompt(false);
  };

  const handleConfirmBack = () => {
    dispatch(deletePDFs());
    navigate("/user/home/");
  };

  if (endSession) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="main-container-contents-analysis-results">
        <button
          className="back-button-results"
          onClick={() => setBackPrompt(true)}
        >
          Finish Session
        </button>
        <div className="main-container-header analysis-result-main-container">
          <div className="analysis-result-container">
            <div className="analysis-left">
              <div className="analysis-results">
                {blobUrl ? (
                  <iframe
                    src={blobUrl}
                    style={{ width: "100%", height: "100%", border: "none", borderRadius: '7px' }}
                    title="PDF Viewer"
                  />
                ) : (
                  <p>PDF Will SHOW HERE</p>
                )}
              </div>
            </div>
            <div className="analysis-right">
              <div className="receipt-box">
                <div className="receipt-box-top">Receipt</div>
                <div className="receipt-box-bottom">
                  <Box className="receipt-row">
                    <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>Units used in this season:</Typography>
                    <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>15</Typography>
                  </Box>
                  <Box className="receipt-row">
                    <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>Total Plan units used:</Typography>
                    <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>360</Typography>
                  </Box>
                  <Box className="receipt-row">
                    <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>Total units remaining:</Typography>
                    <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>140</Typography>
                  </Box>
                </div>
              </div>
              <button
                className="update-plan-button download-pdf-button"
                onClick={() => {
                  if (blobUrl) {
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = `${filenames[0]}_Brevity_${type}_Analysis_Report.pdf`;
                    a.click();
                  }
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Dialog Component */}
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
            Are you sure you wish to finish this session?
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
            Clicking Yes will return you to the main screen and your PDF and file will be cleared from the Brevity.
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
              "&:hover": { color: "white", background: "#c4c4c4" },
              "&:active": { background: "#FFDA01", color: "black" },
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
              background: "linear-gradient(90deg, #ed605b 0%, #f5aa49 54.97%, #ffda01 99.01%)",
              fontFamily: "Arial",
              fontSize: "16px",
              fontWeight: 700,
              color: "#000",
              "&:hover": { color: "white" },
              "&:active": { background: "#FFDA01", color: "black" },
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AnalysisResults;
