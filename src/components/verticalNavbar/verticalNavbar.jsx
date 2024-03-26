import React, { useState } from 'react'; // Import useState
import './verticalNavbar.css';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

function VerticalNavbar({ onClose }) {
    const [activeLink, setActiveLink] = useState(null);
    const handleLinkClick = (pathname) => {
        onClose();
        setActiveLink(pathname);
    };
    return (
        <div className='total-v-navbar'>
            <div className={`menu-item ${activeLink === '/' ? 'active' : ''}`} onClick={() => handleLinkClick('/')}>
                <Link to="/" className="link-style"><DashboardRoundedIcon className='nav-icons' />Dashboard</Link>
            </div>
            <div className={`menu-item ${activeLink === '/courseExcp' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseExcp')}>
                <Link to="/courseExcp" className="link-style"><DashboardRoundedIcon className='nav-icons' />Course Exception</Link>
            </div>
            <div className={`menu-item ${activeLink === '/courseApproval' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseApproval')}>
                <Link to="/courseApproval" className="link-style"><DashboardRoundedIcon className='nav-icons' />Course Approval</Link>
            </div>
            <div className={`menu-item ${activeLink === '/OnlineReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineReports')}>
                <Link to="/OnlineReports" className="link-style"><DashboardRoundedIcon className='nav-icons' />Online Approved</Link>
            </div>
            <div className={`menu-item ${activeLink === '/OnlineRejected' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineRejected')}>
                <Link to="/OnlineRejected" className="link-style"><DashboardRoundedIcon className='nav-icons' />Online Rejected</Link>
            </div>
        </div>
    );
}

export default VerticalNavbar;

