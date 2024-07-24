import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { appLogout } from "../store/slices/authSlice";

const Navbar = ({ style }) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(appLogout());
    };



    return (
        <div className="navbar-container" >
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1> HOSPITAL PEP PROJECT</h1>

            </Link>
            <button onClick={handleLogout} style={style?.button}>Logout</button>

        </div>
    )
}

export default Navbar;