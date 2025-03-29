import { useSelector } from 'react-redux';
import Sidebar from '../helperComponents/Sidebar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Details() {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!userState?.currentUser?.user?.profile) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container-fluid">
            <div style={{display:'grid',gridTemplateColumns:'1fr 5fr'}} className="row">
                <div style={{margin:'0px',padding:'0px'}}>
                    <Sidebar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
