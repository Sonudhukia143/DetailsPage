import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout, signInStart } from '../redux/user/userSlice.js';
import { setFlashMessage } from '../redux/flash/flashMessage.js';
import Loader from '../helperComponents/Loader';
import { useState } from 'react';

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const currentUser = useSelector(state => state.user);

  const dispatch = useDispatch();
  
  const signOut = async () => {
    dispatch(signInStart());

    const res = await fetch("/api/logout", {
      method: 'POST',
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok || res.status == 200) {
      dispatch(logout());
      dispatch(setFlashMessage({ message: data.message, type: "success" }));
    }
    else if (!res.ok) {
      dispatch(setFlashMessage({ message: "Unable to logout", type: "warning" }));
    }
  };

  const deleteAccount = async () => {
    dispatch(signInStart());

    const res = await fetch("/api/delete-account", {
      method: 'DELETE',
      headers:{
        'Authorization': `${currentUser?.currentUser?.token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok || res.status == 200) {
      dispatch(logout());
      dispatch(setFlashMessage({ message: data.message, type: "success" }));
    } else {
      dispatch(setFlashMessage({ message: "Unable to delete account", type: "warning" }));
    }
  };

  return (
    <>
      {currentUser.loading && <Loader props={"Clearing Session"} />}
      <Navbar className="navb" expand="md">
        <Container className="container" fluid>
          <Navbar.Brand><b style={{ color: "grey" }}>DASH </b> MASTER</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            {
              currentUser?.currentUser?.user?.username
                ?
                <Nav className="ms-auto">
                  <Dropdown align="end" show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
                    <Dropdown.Toggle variant="link" id="profile-dropdown">
                      <i className="bi bi-person-circle"></i>{currentUser?.currentUser?.user?.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item disabled>{currentUser?.currentUser?.user?.gmail}</Dropdown.Item>
                      <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
                      <Dropdown.Item onClick={deleteAccount}>Delete Account</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
                :
                null
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
