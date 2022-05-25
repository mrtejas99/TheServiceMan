import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LogInOutButton } from "./LogInOutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function LoggedIn() {
    return(
        <NavDropdown align="end" title={<FontAwesomeIcon icon={faUser} />} id="collasible-nav-dropdown" className='me-3'>
            <NavDropdown.Item href="/Userprofile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
    );
}

export { LoggedIn };
