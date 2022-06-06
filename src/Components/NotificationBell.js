import React from "react";
import { NavDropdown } from "react-bootstrap";

import { FaBell } from "react-icons/fa";

function NotificationBell() {
    return (
        <NavDropdown title={<FaBell />} className='me-3 navdropdown-no-arrow' align="end">
            <NavDropdown.Item href="#action/3.3">T</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">S</NavDropdown.Item>
        </NavDropdown>
    );
}

export { NotificationBell };
