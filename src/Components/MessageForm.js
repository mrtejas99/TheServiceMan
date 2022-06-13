import React ,{useState} from 'react'
import { Form, Button ,FormControl,InputGroup} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";

import Sellerfeedback from "./Sellerfeedback"

const MessageForm =({handleSubmit,text,setText,user11,user22,posted_by} )=>{
    const [msg, setMsg] = useState('');
    const [user, loading, error] = useAuthState(auth);
return(
	<div id="msgform">
	  <Form className="message_form" onSubmit={handleSubmit}> 
            <Form.Group className="mb-3" controlId="formBasicText">

  <InputGroup className="mb-3">
    <FormControl
      placeholder="message"
      size="lg"
       onChange={(e)=>setText(e.target.value)}  value={text}
    />
    <Button variant="primary" style={{width:"7rem"}} className="btn-sm my-0" type="submit" >
      Send
    </Button>
  </InputGroup> 
            </Form.Group>
          
            { user22==posted_by?(<Sellerfeedback
           user11={user11}
           user22={user22}
           adby={posted_by}
           />):(<></>)
       }
        
          
        </Form>
	</div>
	)
}
export default MessageForm