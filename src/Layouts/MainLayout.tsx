// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Navbar from '../containers/Navbar';
// import Footer from '../containers/Footer';

// const MainLayout: React.FC = () => {
//     const [logOffPrompt, setLogOffPrompt] = useState<boolean>(false);
//     const navigate = useNavigate();

//     return (
//         <div style={styles.mainLayout as React.CSSProperties}>
//             <Navbar logOff={setLogOffPrompt} />
//             <div style={styles.content as React.CSSProperties}>
//                 {logOffPrompt ? (
//                     <div style={styles.homeContainer as React.CSSProperties}>
//                         <div style={styles.mainContainerContents as React.CSSProperties}>
//                             <div style={styles.mainContainerHeader as React.CSSProperties}>
//                                 <p>Are you sure you want to log off?</p>
//                                 <p>This will sign you out of Brevity!</p>
//                                 <div style={styles.backPromptConfirmationButtonsContainer as React.CSSProperties}>
//                                     <button style={styles.greenButton as React.CSSProperties}
//                                         onClick={() => {
//                                             setLogOffPrompt(false);
//                                         }}
//                                     >
//                                         No
//                                     </button>
//                                     <button style={styles.redButton as React.CSSProperties}
//                                         onClick={() => navigate('/login/')}
//                                     >
//                                         Yes
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <Outlet />
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// }

// const styles = {
//     mainLayout: {
//         display: 'flex',
//         flexDirection: 'column' as 'column',
//         minHeight: '100vh',
//     },
//     content: {
//         flex: 1,
//         overflowY: 'auto' as 'auto',
//     },
//     homeContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//     },
//     mainContainerContents: {
//         display: 'flex',
//         flexDirection: 'column' as 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mainContainerHeader: {
//         padding: '20px',
//         textAlign: 'center' as 'center',
//     },
//     backPromptConfirmationButtonsContainer: {
//         display: 'flex',
//         justifyContent: 'space-around',
//         marginTop: '20px',
//     },
//     greenButton: {
//         backgroundColor: 'green',
//         color: 'white',
//         padding: '10px 20px',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     redButton: {
//         backgroundColor: 'red',
//         color: 'white',
//         padding: '10px 20px',
//         border: 'none',
//         cursor: 'pointer',
//     },
// };

// export default MainLayout;







import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../containers/Navbar';
import Footer from '../containers/Footer';

const MainLayout: React.FC = () => {
    return (
        <div style={styles.mainLayout as React.CSSProperties}>
            <Navbar logOff={(prompt: boolean) => console.log("Log off:", prompt)} />
            <div style={styles.content as React.CSSProperties}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    mainLayout: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
        overflowY: 'auto' as 'auto',
    },
};

export default MainLayout;
