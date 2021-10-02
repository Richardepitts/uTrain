import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { auth } from 'firebase';
import { AuthContext } from '../context/authContext';
import Search from './Search';
import './Nav.css';
import uTrainEmblem from '../assets/uTrainEmblem.png';
import { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux';

const Nav = (props) => {
    const isTablet = useMediaQuery({
        query: '(max-width: 1000px)'
      })
    const { state, dispatch } = useContext(AuthContext);
    const [ isNavShowing, setIsNavShowing ] = useState(false);

    useEffect(() => {

        let navbarSupportedContent = document.getElementById('navbarSupportedContent');
        if (isNavShowing) {
            // navbarSupportedContent.style.opacity = 0
            navbarSupportedContent.classList.add('navbar-side')
            // setTimeout(() => { navbarSupportedContent.style.opacity = 1 }, 900)
        } else if (!isNavShowing) {
            navbarSupportedContent.classList.remove('navbar-side')
            setTimeout(() => { navbarSupportedContent.classList.remove('navbar-side')}, 500)
        }
    }, [isNavShowing])


    const backupCall = (className, elMoniker, action) => {
        console.log(`backupCalled for ${className}`)
        var x; 
        if (elMoniker === 'class') {
            x = document.querySelector(`.${className}`)
        } else if (elMoniker === 'id') { 
            x = document.getElementById(className)
        }
        if (action === 'none') {
            if (x) { x.style.display = 'none'; }
        } else if (action === 'flex') {
            if (x) { x.style.display = 'flex'; } 
        } else if (action ==='block') {
            if (x) { x.style.display = 'block'; } 
        }
    }
    
    const toggleContents = () => {
        // let navbarToggler = document.querySelector('.navbar-toggler')
        // navbarToggler.setAttribute('data-toggle', 'collapse')
        // navbarToggler.setAttribute('aria-expanded', 'false')
        let navbarCollapse = document.querySelector('.navbar-collapse')

        let HomeDynamicUsernameContainer = document.querySelector('.HomeDynamicUsernameContainer');
        let HomeDynamicMacrosContainer = document.querySelector('.HomeDynamicMacrosContainer');
        let HomeDynamicTotalCaloriesContainer = document.querySelector('.HomeDynamicTotalCaloriesContainer');
        let breakdownTitle = document.getElementById('breakdownTitle');
        let BreakdownTopicSelectionParentContainer = document.getElementById('BreakdownTopicSelectionParentContainer');
        let BreakdownTextContainer = document.getElementById('BreakdownTextContainer');
        let CalculatorContentContainer = document.getElementById('CalculatorContentContainer');
        let GainsDynamicFrontContents = document.getElementById('GainsDynamicFrontContents');
        let GainsDynamicBackContents = document.getElementById('GainsDynamicBackContents');
        let GainsDynamicImage = document.getElementById('GainsDynamicImage');
        let GainsDynamicButtonFront = document.getElementById('GainsDynamicButtonFront');
        let GainsDynamicButton = document.getElementById('GainsDynamicButton');
        if (!isNavShowing) {
            // navbarCollapse.classList.remove('show')
            if (HomeDynamicUsernameContainer) { HomeDynamicUsernameContainer.style.display = 'none'; } else { backupCall('HomeDynamicUsernameContainer', 'class', 'none')}
            if (HomeDynamicMacrosContainer) { HomeDynamicMacrosContainer.style.display = 'none'; } else { backupCall('HomeDynamicMacrosContainer', 'class', 'none')}
            if (HomeDynamicTotalCaloriesContainer) { HomeDynamicTotalCaloriesContainer.style.display = 'none'; } else { backupCall('HomeDynamicTotalCaloriesContainer', 'class', 'none')}
            if (breakdownTitle) { breakdownTitle.style.display = 'none'; } else { backupCall('breakdownTitle', 'id', 'none')}
            if (BreakdownTopicSelectionParentContainer) { BreakdownTopicSelectionParentContainer.style.display = 'none'; } else { backupCall('BreakdownTopicSelectionParentContainer', 'id', 'none')}
            if (BreakdownTextContainer) { BreakdownTextContainer.style.display = 'none'; } else { backupCall('BreakdownTextContainer', 'id', 'none')}
            if (CalculatorContentContainer) { CalculatorContentContainer.style.display = 'none'; } else { backupCall('CalculatorContentContainer', 'id', 'none')}
            if (GainsDynamicFrontContents) { GainsDynamicFrontContents.style.display = 'none'; } else { backupCall('GainsDynamicFrontContents', 'id', 'none')}
            if (GainsDynamicBackContents) { GainsDynamicBackContents.style.display = 'none'; } else { backupCall('GainsDynamicBackContents', 'id', 'none')}
            if (GainsDynamicButtonFront) { GainsDynamicButtonFront.style.display = 'none'; } else { backupCall('GainsDynamicButtonFront', 'id', 'none')}
            if (GainsDynamicImage) { GainsDynamicImage.style.display = 'none'; } else { backupCall('GainsDynamicImage', 'id', 'none')}
            if (GainsDynamicButton) { GainsDynamicButton.style.display = 'none'; } else { backupCall('GainsDynamicButton', 'id', 'none')}
            setIsNavShowing(true)
        } else if (isNavShowing) {
            console.log(`props.chosenOrientation is: ${props.chosenOrientation}`)
            if (HomeDynamicUsernameContainer) { HomeDynamicUsernameContainer.style.display = 'flex'; } else { backupCall('HomeDynamicUsernameContainer', 'class', 'flex')}
            if (HomeDynamicMacrosContainer) { HomeDynamicMacrosContainer.style.display = 'flex'; } else { backupCall('HomeDynamicMacrosContainer', 'class', 'flex')}
            if (HomeDynamicTotalCaloriesContainer) { HomeDynamicTotalCaloriesContainer.style.display = 'flex'; } else { backupCall('HomeDynamicTotalCaloriesContainer', 'class', 'flex')}
            if (breakdownTitle) { breakdownTitle.style.display = 'block'; } else { backupCall('breakdownTitle', 'id', 'block')}
            if (BreakdownTopicSelectionParentContainer) { BreakdownTopicSelectionParentContainer.style.display = 'flex'; } else { backupCall('BreakdownTopicSelectionParentContainer', 'id', 'flex')}
            if (BreakdownTextContainer) { BreakdownTextContainer.style.display = 'flex'; } else { backupCall('BreakdownTextContainer', 'id', 'flex')}
            if (CalculatorContentContainer) { CalculatorContentContainer.style.display = 'flex'; } else { backupCall('CalculatorContentContainer', 'id', 'flex')}
            
                if (props.chosenOrientation === 'false') { // If its front
                    alert(`nice`)
                    if (GainsDynamicFrontContents) { GainsDynamicFrontContents.style.display = 'flex'; } else { backupCall('GainsDynamicFrontContents', 'id', 'flex')}
                } else if (props.chosenOrientation === 'true') {
                    if (GainsDynamicBackContents) { GainsDynamicBackContents.style.display = 'flex'; } else { backupCall('GainsDynamicBackContents', 'id', 'flex')}
                }

                // if (GainsDynamicFrontContents) { GainsDynamicFrontContents.style.display = 'flex'; } else { backupCall('GainsDynamicFrontContents', 'id', 'flex')}
                // if (GainsDynamicBackContents) { GainsDynamicBackContents.style.display = 'flex'; } else { backupCall('GainsDynamicBackContents', 'id', 'flex')}
            if (GainsDynamicImage) { GainsDynamicImage.style.display = 'block'; } else { backupCall('GainsDynamicImage', 'id', 'block')}
            if (GainsDynamicButtonFront) { GainsDynamicButtonFront.style.display = 'block'; } else { backupCall('GainsDynamicButtonFront', 'id', 'block')}
            if (GainsDynamicButton) { GainsDynamicButton.style.display = 'block'; } else { backupCall('GainsDynamicButton', 'id', 'block')}
            setIsNavShowing(false)
        }
    }

    const linkClicked = () => {
        let navbarSupportedContent = document.getElementById('navbarSupportedContent')
        navbarSupportedContent.style.display = 'none'
    }
    
    let history = useHistory();

    const { user } = state;

    const logout = () => {
        alert(`it was hit`)
        // auth().signOut();
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: null
        });
        history.push('/login');
    };
// NOTE
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link style={{fontFamily: 'orpheus-pro', fontSize: '28px', top: '4px'}} className="navbar-brand" to="/">
                <div className='uTrainEmblemContainer'>
                    <img className={isTablet ? 'uTrainEmblemTablet' : 'uTrainEmblem'} src={uTrainEmblem} alt='' />
                </div> 
            </Link>
            <button
                className="navbar-toggler"
                onClick = {() => toggleContents()}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul onClick={() => linkClicked()} className="navbar-nav mr-auto">

              {user && user !== null && (
            <React.Fragment>
                {console.log(user)}
              <li className="nav-item active">
                  <Link className="nav-link" to="/">
                  </Link>
              </li>
                  <li className="nav-item active">
                  <Link className="nav-link" to="/breakdown">
                      Breakdown
                  </Link>
              </li>
              <li className="nav-item active">
                  <Link className="nav-link" to="/calculator">
                      Calculator
                  </Link>
              </li>
               {/* <li className="nav-item active">
                  <Link className="nav-link" to="/calendar">
                      Calendar
                  </Link>
              </li>  */}
              <li className="nav-item active">
                  <Link className="nav-link" to="/gains">
                      Gains
                  </Link>
              </li>
              <li className="nav-item active">
                  <Link className="nav-link" to="/input">
                      Input
                  </Link>
                  {console.log(user.token)}
              </li> 
              <li className="nav-item">
                    <a onClick={logout} href="/login" className="nav-item nav-link">
                        Logout
                    </a>
                </li>
              </React.Fragment>
)}
              {user === null && (
                <React.Fragment>
                      {console.log(user)}
                    <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                    </li>
                </React.Fragment>
              )}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    chosenOrientation: state.chosenOrientation.items,
})
export default connect(mapStateToProps, {})(Nav);

