import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

function LoggedOut() {
    return(
        <Nav.Link href='/login' >Login</Nav.Link>
    );
}

export { LoggedOut };
