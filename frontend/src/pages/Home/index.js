import React from 'react';
import { Link } from "react-router-dom";

const Page = () => {
    return (
        <div>
            <h1>Página Home</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Page;