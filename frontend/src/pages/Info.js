// import { Link } from "react-router-dom";

const Info = () => {

   const closeTab = () => {
          window.opener = null;
          window.open("", "_self");
          window.close()
      }

  return (
  <div >
    <div className='info-page'>
      <header>
         <h1>Info</h1>
      </header>
      <aside>
				<ul id="info-menu">
					{/* <li><a href="#welcome">Welcome</a></li> */}
					<li><a id='infoa' href="#setup">Set up</a></li>
					<li><a id='infoa' href="#position">Position</a></li>
          <li><a id='infoa' href="#tips">Tips for a good streaming</a></li>
          <li><a id='infoa' href="#leftright">Left-Right</a></li>
          <li><a id='infoa' href="#start">Start</a></li>
          <li><a id='infoa' href="#stop">Stop</a></li>
          <li><a id='infoa' href="#load">Load</a></li>
          <li><a id='infoa' href="#results">Test Results</a></li>
					<li><a id='infoa' href="#closepage">Close page</a></li>
				</ul>
			</aside>
     
     
      <div>
      <article id="welcome">
      <h3>Welcome</h3>
      <p>
      This tool helps you to check whether a person’s knee is in a right position while doing a single leg squat. 
      </p>
      </article>

      <article id="setup">
      <h3>Set Up</h3>
      <p>
        Allow the use of the camera for the program.
      </p>
      <p>
          If you wish to get sound signal you should also check that your audio is on.
      </p>
     </article>
      </div>

     <article id="position">
       <h3>Position</h3>
       <p>
          Position of the person to be examined should be about 3-4 meters away from the camera.
       </p>
       <p>
         The program should point four points at the screen:
      </p>
        <ul>
          <li>
           1. left hip 
          </li>
        <li>
          2. right hip
        </li>
        <li>
           3. knee to be examined
        </li>
       <li>
          4. ankle of the same side of the knee
       </li>
        </ul>
     
      <p>
        Please do not start streaming before the person being examined is in the right position.
      </p>
     </article>

     <article id="tips">
       <h3>Tips for a good streaming</h3>

       <p>
       The person should be posed directly towards to the camera avoiding any diagonal poses. 
          </p>
          <p>
          The leg that is not being examined should be lifted either to backward or to forward.
          </p>
          <p>
          The background should be plane and different color than the person’s clothes.   
          </p>
          <p>
            The person to be streamed should be in the middle of the screen. 
          </p>    
     </article>

     <article id='leftright'>
       <h3>L (Left) – R (Right) </h3>
       <p>You can define which leg will be examined by clicking the button.</p>
     </article>

     <article id='start'>
       <h3>Start</h3>
       <p>
       The stream starts. Now you can see a calculator on the top right corner.
       </p>
       <p>
      When the person’s squat is deep enough you get a visual sign “ok!” and a sound signal of you have your audio on. 
       </p>
     </article>

     <article id='stop'>
     <h3>Stop</h3>
       <p>
       The stream stops. You can either accept the results by giving name for the exercise or cancel and return to the main view.
       </p>
      </article>

     <article id='load'>
       <h3>Load</h3>
       <p>
       You can check the latest or any other test results.
       </p>
       </article>

      <article id='results'>
      <h3>Test results</h3>
       <p>
       You can revise the wanted test results at the App sceen or you can export them to the CSV file.
       </p>
       </article>

      <article id="closepage">
      <h3>Close this page</h3>
      <p>by clicking Home button below. You may also leave this tab open. </p>
        </article>
    </div >
    <div id='info-button'>
    <button color='gray' className="info-btn"  onClick={closeTab}>Home</button>
    </div>
  </div>  
  )
}

export default Info