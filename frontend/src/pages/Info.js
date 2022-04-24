// import { Link } from "react-router-dom";

const Info = () => {

   const closeTab = () => {
          window.opener = null;
          window.open("", "_self");
          window.close()
      }

  return (
    <div>
    <div className='info-page'>
      <h1>Info</h1>
      <h2>Welcome</h2>
      <p></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>Close this page</h2>
      <p>You can close this page by clicking the x next to the page name above or by clickig the button below. </p>
        <p>Please note that by clicking the Home button you will have two active pages open. </p>
      {/* <button className="btn">
      <Link to="/">Home</Link>
      </button> */}
   </div>
   <div>
    <button color='gray' className="btn"  onClick={closeTab}>Home</button>
  </div>
  </div>
                  
    
  )
}

export default Info