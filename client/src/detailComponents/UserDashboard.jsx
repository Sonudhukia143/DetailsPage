import { useSelector } from 'react-redux';
import Sidebar from '../helperComponents/Sidebar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../styles/userdash.css';

export default function Details() {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!userState?.currentUser?.user?.profile) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="outlet-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
