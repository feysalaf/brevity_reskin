// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from './logo.png';

// interface NavbarProps {
//   logOff: (prompt: boolean) => void;
// }

// const styles = {
//   linkButton: {
//     backgroundColor: '',
//     color: '#ffffff',
//     textDecoration: 'none',
//     padding: '16px 14px', // Reduced padding to reduce the gap
//     borderRadius: '5px',
//     transition: 'background-color 0.3s ease',
//   },
//   linkButtonHover: {
//     color: 'red'
//   },
//   linkButtonActive: {
//     backgroundColor: '#015964',
//     color: '#ffffff',
//   },
//   navUl: {
//     display: 'flex',
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   },
//   navLi: {
//     margin: '0 0px', 
//   },
// };

// const Navbar: React.FC<NavbarProps> = ({ logOff }) => {
//   const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
//   const [hoveredButton, setHoveredButton] = React.useState<boolean>(false);
//   const location = useLocation();

//   const navItems = ['Profile', 'Pricing', 'Manage plans', 'Contact', 'FAQ'];

//   const hiddenPaths = [
//     '/user/new-analysis',
//     '/user/new-analysis/upload',
//     '/user/analyze/',
//     '/user/analysis-results',    
//     '/user/new-analysis/upload/:type',
//   ];
//   const hiddenPathsLogoff = [
//     '/user/new-analysis',
//     '/user/new-analysis/upload',
//     '/user/analyze/',
//     '/user/analysis-results',    
//     '/user/new-analysis/upload/:type',
//     '/user/contact',
//     '/user/profile',
//     '/user/edit/profile',
//     '/user/faq'
//   ];

//   const shouldHideNavItem = (item: string) => {
//     if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
//       return ['Home', 'Profile', 'Pricing', 'Manage plans', 'Contact', 'FAQ'].includes(item);
//     }
//     return false;
//   };

//   const shouldHideLogOff = () => {
//     return hiddenPathsLogoff.some(path => location.pathname.startsWith(path));
//   };



//   return (
//     <nav className='nav-container' style={{ background: '#17213C' }}>
//       {/* <img src={logo} alt="Logo" className="navbar-logo" style={{ width: '200px', height: '50px' }} /> */}
//       <ul className='nav-ul' style={styles.navUl}>
//         {navItems.map((item) => (
//           !shouldHideNavItem(item) && (
//             <li className='nav-li' style={styles.navLi} key={item}>
//               <Link
//                 to={`/user/${item.toLowerCase().replace(' ', '')}`}
//                 style={
//                   (location.pathname === `/user/${item.toLowerCase().replace(' ', '')}` ||
//                   (item === 'Profile' && location.pathname === '/user/edit/profile'))
//                     ? { ...styles.linkButton, ...styles.linkButtonHover }
//                     : hoveredLink === item
//                     ? { ...styles.linkButton, ...styles.linkButtonHover }
//                     : styles.linkButton
//                 }
//                 onMouseEnter={() => setHoveredLink(item)}
//                 onMouseLeave={() => setHoveredLink(null)}
//               >
//                 {item}
//               </Link>
//             </li>
//           )
//         ))}
//         {!shouldHideLogOff() && (
//           <li className='nav-li' style={styles.navLi}>
//             <button
//               className='logOff-button'
//               onClick={() => logOff(true)}
//               onMouseEnter={() => setHoveredButton(true)}
//               onMouseLeave={() => setHoveredButton(false)}
//             >
//               Log off
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;








import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  logOff: (prompt: boolean) => void; // Function to handle log off action
}

const Navbar: React.FC<NavbarProps> = ({ logOff }) => {
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [logOffPrompt, setLogOffPrompt] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = ['Profile', 'Pricing', 'Manage plans', 'Contact','Settings', 'FAQ'];

  const shouldHideLogOff = (): boolean => {
    const hiddenPathsLogoff = [
      '/user/new-analysis',
      '/user/new-analysis/upload',
      '/user/analyze/',
      '/user/analysis-results',
      '/user/new-analysis/upload/:type',
      '/user/contact',
      '/user/profile',
      '/user/edit/profile',
      '/user/faq',
    ];
    return hiddenPathsLogoff.some((path) => location.pathname.startsWith(path));
  };

  return (
    <nav className='nav-container'>
      <ul className='nav-ul'>
        {navItems.map((item) => (
          !shouldHideLogOff() && (
            <li className='nav-li' key={item}>
              <Link
                to={`/user/${item.toLowerCase().replace(' ', '')}`}
                className='link-button'
                onMouseEnter={() => setHoveredLink(item)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item}
              </Link>
            </li>
          )
        ))}
        {!shouldHideLogOff() && (
          <li className='nav-li'>
            {logOffPrompt ? (
              <div className='prompt-container'>
                <div>Are you sure you want to log off?</div>
                <button
                  className={`log-off-button yes-button-logoff`}
                  onClick={() => {
                    logOff(false);
                    setLogOffPrompt(false);
                    // localStorage.removeItem('token');
                    navigate('/login/');
                  }}
                >
                  Yes
                </button>
                <button
                  className={`log-off-button no-button-logoff`}
                  onClick={() => setLogOffPrompt(false)}
                >
                  No
                </button>
              </div>
            ) : (
              <button
                className='logOff-button'
                onClick={() => setLogOffPrompt(true)} 
              >
                Log off
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

