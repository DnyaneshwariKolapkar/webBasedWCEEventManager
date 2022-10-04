import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Verificartionpage = () => {
    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Verify Your Email</h5>
                        <p className="card-text">We have sent you a verification link to your email. Please verify your email to continue.</p>
                        <Link to="/" > Verify </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verificartionpage