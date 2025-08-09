import { Link } from "react-router-dom"

const Header = () => {
    
    return(<>
      <div className="header d-flex">
        <Link to="/" > Home</Link>
         <div>
        <Link to="/login" className="themebtn"> Login</Link>
        <Link to="/register"  className="themebtn"> Register</Link>
         </div>
      </div>
    </>)
}

export default Header