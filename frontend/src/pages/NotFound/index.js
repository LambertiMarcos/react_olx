import React from 'react';
import { NotFoundArea } from './styled';
import { Link } from "react-router-dom";


const Page = () => {
    return (
        <NotFoundArea>
            <div>
                <div className="container">
                    <h1>Oops!</h1>
                    <h2>404 - PAGE NOT FOUND</h2>
                    <p>The page you are looking for might be removed or temporarily unavailable</p>
                    <Link to="/"><button>Page Home</button></Link>
                </div>
            </div>
        </NotFoundArea>

    );
}

export default Page;