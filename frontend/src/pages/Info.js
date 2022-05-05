/* This component is the Info page, which can be accessed with path '/info' */
import Button from "../components/home/Button"

const Info = () => {

   const closeTab = () => {
          window.opener = null
          window.open("", "_self")
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
					<li><a id='infoa' href="#setup">Set Up</a></li>
					<li><a id='infoa' href="#position">Position Preparation</a></li>
          <li><a id='infoa' href="#tips">Tips for good testing results</a></li>
          <li><a id='infoa' href="#leftright">Left-Right</a></li>
          <li><a id='infoa' href="#start">Start</a></li>
          <li><a id='infoa' href="#stop">Stop</a></li>
          <li><a id='infoa' href="#load">Load</a></li>
					<li><a id='infoa' href="#closepage">Close page</a></li>
				</ul>
			</aside>
     
     
      <div>
      <article id="welcome">
      <h3>Welcome</h3>
      <p>
      This tool helps to analyse whether a person’s knee is in the neutral position while doing a single leg squat. 
      </p>
      <p>
      This means the maximum of 10 degrees variation of the knee angle either inwards, preventing Valgus, or outwards, preventing Varus.
      </p>
      <p>
      The exercise can be streamed and then analysed by using the visual and numerical results of the test. 
      </p>
      </article>

      <article id="setup">
      <h3>Set Up</h3>
      <p>
        Allow the use of the camera for the App.
      </p>
      <p>
          For a sound approval sign, check that your audio is on.
      </p>
     </article>
      </div>

     <article id="position">
       <h3>Position Preparation</h3>
       <p>
          A person to be examined should fit in the screen from feet to head. Usually it means about 2-3 meters distance from the camera.
       </p>
       <p>
         The App should point four points at the screen:
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
       <h3>Tips for good testing results</h3>

       <p>
         Use good lightning, especially, if you are using a mobile device.
       </p>

       <p>
       The person to be examined should be posed directly towards to the camera avoiding any diagonal poses. 
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
       <h3>Left – Right </h3>
       <p>Choose the leg to be analised by clicking the button.</p>
     </article>

     <article id='timer'>
       <h3>Timer</h3>
       <p>Timer gives five seconds for the last pose preparations before the calculation starts.</p>
       <p>Tick the box to use it. </p>
     </article>

     <article id='start'>
       <h3>Start</h3>
       <p>
       The stream starts. Now you can see a calculator on the top right corner.
       </p>
       <p>
         Next to knee you can see changing values. Light blue means that the person to be examined is within the desired limits of the neutral position. Dark blue means that the limits have been exceeded.
       </p>
       <p>
        The App starts to gather data, for example anglevalues and landmarks of the movement.  
       </p>
       <p>
      When the person’s squat is deep enough you get a visual sign “ok!” and a sound signal if you have your audio on. 
       </p>
     </article>

     <article id='stop'>
     <h3>Stop</h3>
       <p>
       The stream stops. You can either accept the test results by a giving name for the exercise or presss cancel and return to the main view.
       </p>
       <p>
       The data is saved to the database. 
       </p>
      </article>

     <article id='load'>
       <h3>Load</h3>
       <p>
       You can check the latest or any other test results.
       </p>
       <p>
       You can revise the wanted graphical test results on the App screen or you can export them to the CSV file.
       </p>
       </article>

      <article id="closepage">
      <h3>Close this page</h3>
      <p>by clicking Home button below. You may also leave this tab open. </p>
        </article>
    </div >
    <div id='info-button'>
    <Button
      className={'info-btn'}
      color={'grey'}
      onClick={closeTab}
      text={'Home'}
    />
    </div>
  </div>  
  )
}

export default Info