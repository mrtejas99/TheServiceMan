import React ,{useState} from 'react'
import { Form, Button ,FormControl,InputGroup,} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import Sellerfeedback from "./Sellerfeedback"

const MessageForm =({handleSubmit,text,setText,user11,user22} )=>{
    const [msg, setMsg] = useState('');
    const [user, loading, error] = useAuthState(auth);
return(
	<div id="msgform">
	  <Form className="message_form" onSubmit={handleSubmit}> 
            <Form.Group className="mb-3" controlId="formBasicText">

  <InputGroup className="mb-3" >
    <FormControl
      className="ml-3"
      placeholder="message"
      size="lg"
      autocomplete="off"
       onChange={(e)=>setText(e.target.value)}  value={text}
    />
    <Button variant="primary" style={{width:"5rem"}} className="btn-sm my-0 mr-3" type="submit" >
      Send
    </Button>
  </InputGroup> 
            </Form.Group>
          
            <Sellerfeedback
           user11={user11}
           user22={user22}/>
       
        
          
        </Form>
	</div>
	)
}
export default MessageForm