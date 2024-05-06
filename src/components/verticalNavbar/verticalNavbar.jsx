import React, { useState } from 'react'; // Import useState
import './verticalNavbar.css';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

function VerticalNavbar({ onClose }) {
    const [activeLink, setActiveLink] = useState(null);
    const [divOpen,setDivOpen] = useState(false);
    const handleLinkClick = (pathname) => {
        onClose();
        setActiveLink(pathname);
    };
    const handleOpen = () => {
        setDivOpen(!divOpen);
    }
    return (
        <div className='total-v-navbar'>
            <div className={`menu-item ${activeLink === '/' ? 'active' : ''}`} onClick={() => handleLinkClick('/')}>
                <Link to="/" className="link-style"><DashboardRoundedIcon className='nav-icons' />Dashboard</Link>
            </div>
            <div className='groups'>-- Course Exemption --</div>
            <div className={`menu-item ${activeLink === '/courseExcp' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseExcp')}>
                <Link to="/courseExcp" className="link-style"><DashboardRoundedIcon className='nav-icons' />Course Exception</Link>
            </div>
            <div className={`menu-item ${activeLink === '' ? 'active' : ''}`} onClick={() => handleOpen( )}>
                <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />OnlineCourse{divOpen?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>} </Link>
            </div>
            {divOpen && 
            <div className='options'>
            <div className={`menu-items ${activeLink === '/courseApproval' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseApproval')}>
                <Link to="/courseApproval" className="link-style"><DashboardRoundedIcon className='nav-icons' />Pending Courses</Link>
            </div>
            <div className={`menu-items ${activeLink === '/OnlineReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineReports')}>
                <Link to="/OnlineReports" className="link-style"><DashboardRoundedIcon className='nav-icons' />ApprovedCourses</Link>
            </div>
            <div className={`menu-items ${activeLink === '/OnlineRejected' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineRejected')}>
                <Link to="/OnlineRejected" className="link-style"><DashboardRoundedIcon className='nav-icons' />Rejected Courses</Link>
            </div>
            </div> }
        </div>
    );
}

export default VerticalNavbar;

