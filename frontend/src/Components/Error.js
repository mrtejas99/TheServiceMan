import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Error(){
    return(
        <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
                <div class="row justify-content-center" style={{paddingTop:"20%"}}>
                    <div class="col-md-12 text-center">
                        <span class="display-1 d-block">404</span>
                        <div class="mb-4 lead">The page you are looking for was not found.</div>
                        <a href="/" >Back to home</a>
                    </div>
                </div>
            </div>
        </div>

    );
}
export { Error };