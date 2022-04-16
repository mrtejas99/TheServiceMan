import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const footerStyle = {  
    position: 'sticky',
    bottom: '0',
    width: '100%',
    height: '60px',
    lineHeight: '60px',
    backgroundColor: '#f5f5f5' 
  };  
function Footer(){
    return(
        <footer className="footer text-center" style={footerStyle}>
            <div>Copyright &#169;<b></b>The Service Man</div>
        </footer>
    );
}
export { Footer };