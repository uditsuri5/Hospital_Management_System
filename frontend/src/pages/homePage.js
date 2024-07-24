import { Link } from "react-router-dom"
import Navbar from "../components/navbar"

const HomePage = () => {

    return (
        <>
            <Navbar />
            <div className="home-page-container">
                <div className="home-page-card">
                    <div className="box">
                    <Link to="/addhospital">
                        <button>Click here to Add Hospital</button>
                    </Link>
                    </div>
                    <div className="box">
                    <Link to="/hospitals">
                    <button>Click here to know nearby hospitals</button>
                    </Link>
                    </div>
                    <div className="box">
                    <Link to="/getall">
                    <button>View all Hospitals</button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage