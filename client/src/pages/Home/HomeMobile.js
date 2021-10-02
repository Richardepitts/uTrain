import './HomeMobile.css'
import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import HomeAnatomy from './CalculatorAnatomy.png';
// import { toast } from 'react-toastify';
import Button from "@material-ui/core/Button";
import { AuthContext } from '../../../src/context/authContext';
// import { useHistory } from 'react-router-dom';
import { POSTS_BY_USER } from '../../graphql/queries';
import { EXTRACT_DIET_CALCULATION, EXTRACT_EXERCISE_LOGS } from '../../graphql/queries';
import { useMediaQuery } from 'react-responsive'
import flipImg from '../../assets/flipImg.png'


const HomeMobile = (props) =>  {
    const isTablet = useMediaQuery({
        query: '(max-width: 1280px)'
      })
    const isPhone = useMediaQuery({
        query: '(max-width: 580px)'
      })
    const { state, dispatch } = useContext(AuthContext);
    const { data: posts } = useQuery(POSTS_BY_USER);
    const { data: dietCalculation } = useQuery(EXTRACT_DIET_CALCULATION);
    const { data: exerciseLogsReturned } = useQuery(EXTRACT_EXERCISE_LOGS);
    const [carbs, setCarbs ] = useState('')
    const [protein, setProtein ] = useState('')
    const [fats, setFats ] = useState('')
    const [facingFront, setFacingFront ] = useState(true)
    const [upperBodyGains, setUpperBodyGains ] = useState(0)
    const [lowerBodyGains, setLowerBodyGains ] = useState(0)
    const [currentWeight, setCurrentWeight ] = useState(0)
    const [goalWeight, setGoalWeight ] = useState(0)

    useEffect(() => {

        // if (dietCalculation) {
        //     if (JSON.stringify(dietCalculation.ExtractDietCalculation[0]) !== undefined) {
        //     }
        //     console.log(JSON.stringify(dietCalculation.ExtractDietCalculation[0]))
        //     if (JSON.stringify(dietCalculation.ExtractDietCalculation[0]) !== undefined) {
        //         console.log(JSON.stringify(dietCalculation.ExtractDietCalculation[0]))
        //         setCarbs(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Carbs))
        //     } 
        //     // if (JSON.stringify(dietCalculation.ExtractDietCalculation[0].Carbs)) {
        //     //     setCarbs(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Carbs))
        //     // }
        // }

        if (dietCalculation && JSON.stringify(dietCalculation.ExtractDietCalculation[0])) {
            if (JSON.stringify(dietCalculation.ExtractDietCalculation[0].Carbs)) {
                setCarbs(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Carbs))
            }
            setProtein(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Protein))
            setFats(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Fats))
            setCurrentWeight(JSON.stringify(dietCalculation.ExtractDietCalculation[0].Weight))
            setGoalWeight(JSON.stringify(dietCalculation.ExtractDietCalculation[0].GoalWeight))
        }
    }, [dietCalculation])

    useEffect(() => {
        if (exerciseLogsReturned && exerciseLogsReturned.ExtractExerciseLogs) {
            let exerciseLogsObj = exerciseLogsReturned.ExtractExerciseLogs
            var upperBodySum = 0;
            var upperBodyQuantity = 0;
            var lowerBodySum = 0;
            var lowerBodyQuantity = 0;
            // FRONT/LEFT SIDE \\
    
            // For Lats \\ ['Lat Pulldown', 'Dumbell Row', 'Chinups']
            let LatsMaxArray = []
            let LatPulldownLog = exerciseLogsObj.filter(exerciseLog => "Lat Pulldown" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(LatPulldownLog)) !== 'number' || isNaN(Math.round(CalculateMax(LatPulldownLog)))) {} else { 
                LatsMaxArray.push(Math.round(CalculateMax(LatPulldownLog))) }
                let DumbellRowLog = exerciseLogsObj.filter(exerciseLog => "Dumbell Row" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(DumbellRowLog)) !== 'number' || isNaN(Math.round(CalculateMax(DumbellRowLog)))) {} else { 
                LatsMaxArray.push(Math.round(CalculateMax(DumbellRowLog))) }
                let ChinupsLog = exerciseLogsObj.filter(exerciseLog => "Chinups" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(ChinupsLog)) !== 'number' || isNaN(Math.round(CalculateMax(ChinupsLog)))) {} else { 
                LatsMaxArray.push(Math.round(CalculateMax(ChinupsLog))) }
            let latsMax = LatsMaxArray.length === 0 ? 0 : Math.max(...LatsMaxArray)
            if (latsMax && latsMax !== 0 ) { upperBodySum += latsMax; upperBodyQuantity += 1 }
    
            // For Triceps \\ ['Tricep Pushdown', 'Tricep Dips', 'Overhead Pushdown']
            let TricepMaxArray = []
            let TricepPushdownLog = exerciseLogsObj.filter(exerciseLog => "Tricep Pushdown" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(TricepPushdownLog)) !== 'number' || isNaN(Math.round(CalculateMax(TricepPushdownLog)))) {} else { 
                TricepMaxArray.push(Math.round(CalculateMax(TricepPushdownLog))) }
            let TricepDipsLog = exerciseLogsObj.filter(exerciseLog => "Tricep Dips" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(TricepDipsLog)) !== 'number' || isNaN(Math.round(CalculateMax(TricepDipsLog)))) {} else { 
                TricepMaxArray.push(Math.round(CalculateMax(TricepDipsLog))) }
            let OverheadPushdownLog = exerciseLogsObj.filter(exerciseLog => "Overhead Pushdown" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(OverheadPushdownLog)) !== 'number' || isNaN(Math.round(CalculateMax(OverheadPushdownLog)))) {} else { 
                TricepMaxArray.push(Math.round(CalculateMax(OverheadPushdownLog))) }
            let tricepsMax = TricepMaxArray.length === 0 ? 0 : Math.max(...TricepMaxArray)
            if (tricepsMax && tricepsMax !== 0 ) { upperBodySum += tricepsMax; upperBodyQuantity += 1 }
    
            //  For Quads \\ ['Leg Extensions']
            let QuadsMaxArray = []
            let LegExtensionsLog = exerciseLogsObj.filter(exerciseLog => "Leg Extensions" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(LegExtensionsLog)) !== 'number' || isNaN(Math.round(CalculateMax(LegExtensionsLog)))) {} else { 
                QuadsMaxArray.push(Math.round(CalculateMax(LegExtensionsLog))) }
            // console.log(QuadsMaxArray.length === 0 ? 0 : Math.max(...QuadsMaxArray))
            let quadsMax = QuadsMaxArray.length === 0 ? 0 : Math.max(...QuadsMaxArray)
            if (quadsMax && quadsMax !== 0 ) { lowerBodySum += quadsMax; lowerBodyQuantity += 1 }
    
            // For Hamstrings \\ ['Seated Leg Curl', 'Laying Leg Curl']
            let HamstringsMaxArray = []
            let SeatedLegCurlLog = exerciseLogsObj.filter(exerciseLog => "Seated Leg Curl" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(SeatedLegCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(SeatedLegCurlLog)))) {} else { 
                HamstringsMaxArray.push(Math.round(CalculateMax(SeatedLegCurlLog))) }
                let LayingLegCurlLog = exerciseLogsObj.filter(exerciseLog => "Laying Leg Curl" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(LayingLegCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(LayingLegCurlLog)))) {} else { 
                HamstringsMaxArray.push(Math.round(CalculateMax(LayingLegCurlLog))) }
            // console.log(HamstringsMaxArray.length === 0 ? 0 : Math.max(...HamstringsMaxArray))
            let hamstringsMax = HamstringsMaxArray.length === 0 ? 0 : Math.max(...HamstringsMaxArray)
            if (hamstringsMax && hamstringsMax !== 0 ) { lowerBodySum += hamstringsMax; lowerBodyQuantity += 1 }
    
            // For Glutes \\ ['Deadlifts', 'Leg Press', 'Barbell Squats', 'Hack Squat']
            let GlutesMaxArray = []
            let DeadliftsLog = exerciseLogsObj.filter(exerciseLog => "Deadlifts" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(DeadliftsLog)) !== 'number' || isNaN(Math.round(CalculateMax(DeadliftsLog)))) {} else { 
                GlutesMaxArray.push(Math.round(CalculateMax(DeadliftsLog))) }
            let LegPressLog = exerciseLogsObj.filter(exerciseLog => "Leg Press" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(LegPressLog)) !== 'number' || isNaN(Math.round(CalculateMax(LegPressLog)))) {} else { 
                GlutesMaxArray.push(Math.round(CalculateMax(LegPressLog))) }
            let BarbellSquatsLog = exerciseLogsObj.filter(exerciseLog => "Barbell Squats" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(BarbellSquatsLog)) !== 'number' || isNaN(Math.round(CalculateMax(BarbellSquatsLog)))) {} else { 
                GlutesMaxArray.push(Math.round(CalculateMax(BarbellSquatsLog))) }
            let HackSquatLog = exerciseLogsObj.filter(exerciseLog => "Hack Squat" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(HackSquatLog)) !== 'number' || isNaN(Math.round(CalculateMax(HackSquatLog)))) {} else { 
                GlutesMaxArray.push(Math.round(CalculateMax(HackSquatLog))) }
            // console.log(GlutesMaxArray.length === 0 ? 0 : Math.max(...GlutesMaxArray))
            let glutesMax = GlutesMaxArray.length === 0 ? 0 : Math.max(...GlutesMaxArray)
            if (glutesMax && glutesMax !== 0 ) { lowerBodySum += glutesMax; lowerBodyQuantity += 1 }
    
            // BACK/RIGHT SIDE \\
    
            // For Chest \\ ['Flat Bench', 'Incline Bench', 'Decline Bench', 'Dumbell Bench', 'Pec Fly']
            let ChestMaxArray = []
            let FlatBenchLog = exerciseLogsObj.filter(exerciseLog => "Flat Bench" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(FlatBenchLog)) !== 'number' || isNaN(Math.round(CalculateMax(FlatBenchLog)))) {} else { 
                ChestMaxArray.push(Math.round(CalculateMax(FlatBenchLog))) }
            let InclineBenchLog = exerciseLogsObj.filter(exerciseLog => "Incline Bench" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(InclineBenchLog)) !== 'number' || isNaN(Math.round(CalculateMax(InclineBenchLog)))) {} else { 
                ChestMaxArray.push(Math.round(CalculateMax(InclineBenchLog))) }
            let DeclineBenchLog = exerciseLogsObj.filter(exerciseLog => "Decline Bench" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(DeclineBenchLog)) !== 'number' || isNaN(Math.round(CalculateMax(DeclineBenchLog)))) {} else { 
                ChestMaxArray.push(Math.round(CalculateMax(DeclineBenchLog))) }
            let DumbellBenchLog = exerciseLogsObj.filter(exerciseLog => "Dumbell Bench" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(DumbellBenchLog)) !== 'number' || isNaN(Math.round(CalculateMax(DumbellBenchLog)))) {} else { 
                ChestMaxArray.push(Math.round(CalculateMax(DumbellBenchLog))) }
            let PecFlyLog = exerciseLogsObj.filter(exerciseLog => "Pec Fly" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(PecFlyLog)) !== 'number' || isNaN(Math.round(CalculateMax(PecFlyLog)))) {} else { 
                ChestMaxArray.push(Math.round(CalculateMax(PecFlyLog))) }
            // console.log(ChestMaxArray.length === 0 ? 0 : Math.max(...ChestMaxArray))
            let chestMax = ChestMaxArray.length === 0 ? 0 : Math.max(...ChestMaxArray)
            if (chestMax && chestMax !== 0 ) { upperBodySum += chestMax; upperBodyQuantity += 1 }
    
            //  For Biceps \\ ['Seated Curl', 'Standing Curl', 'Close-grip Curl']
            let BicepsMaxArray = []
            let SeatedCurlLog = exerciseLogsObj.filter(exerciseLog => "Seated Curl" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(SeatedCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(SeatedCurlLog)))) {} else { 
                BicepsMaxArray.push(Math.round(CalculateMax(SeatedCurlLog))) }
            let StandingCurlLog = exerciseLogsObj.filter(exerciseLog => "Standing Curl" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(StandingCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(StandingCurlLog)))) {} else { 
                BicepsMaxArray.push(Math.round(CalculateMax(StandingCurlLog))) }
            let CloseGripCurlLog = exerciseLogsObj.filter(exerciseLog => "Close-grip Curl" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(CloseGripCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(CloseGripCurlLog)))) {} else { 
                BicepsMaxArray.push(Math.round(CalculateMax(CloseGripCurlLog))) }
            // console.log(BicepsMaxArray.length === 0 ? 0 : Math.max(...BicepsMaxArray))
            let bicepsMax = BicepsMaxArray.length === 0 ? 0 : Math.max(...BicepsMaxArray)
            if (bicepsMax && bicepsMax !== 0 ) { upperBodySum += bicepsMax; upperBodyQuantity += 1 }
    
            // For Shoulders \\ ['Overhead Press', 'Lateral Raise', 'Frontal Raise']
            let ShouldersMaxArray = []
            let OverheadPressLog = exerciseLogsObj.filter(exerciseLog => "Overhead Press" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(OverheadPressLog)) !== 'number' || isNaN(Math.round(CalculateMax(OverheadPressLog)))) {} else { 
                ShouldersMaxArray.push(Math.round(CalculateMax(OverheadPressLog))) }
            let LateralRaiseLog = exerciseLogsObj.filter(exerciseLog => "Lateral Raise" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(LateralRaiseLog)) !== 'number' || isNaN(Math.round(CalculateMax(LateralRaiseLog)))) {} else { 
                ShouldersMaxArray.push(Math.round(CalculateMax(LateralRaiseLog))) }
            let FrontalRaiseLog = exerciseLogsObj.filter(exerciseLog => "Frontal Raise" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(FrontalRaiseLog)) !== 'number' || isNaN(Math.round(CalculateMax(FrontalRaiseLog)))) {} else { 
                ShouldersMaxArray.push(Math.round(CalculateMax(FrontalRaiseLog))) }
            // console.log(ShouldersMaxArray.length === 0 ? 0 : Math.max(...ShouldersMaxArray))
            let shouldersMax = ShouldersMaxArray.length === 0 ? 0 : Math.max(...ShouldersMaxArray)
            if (shouldersMax && shouldersMax !== 0 ) { upperBodySum += shouldersMax; upperBodyQuantity += 1 }
    
            // For Abs \\ ['Leg Lift', 'Suitcase Crunch', 'Crunch']
            let AbsMaxArray = []
            let LegLiftLog = exerciseLogsObj.filter(exerciseLog => "Leg Lift" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(LegLiftLog)) !== 'number' || isNaN(Math.round(CalculateMax(LegLiftLog)))) {} else { 
                AbsMaxArray.push(Math.round(CalculateMax(LegLiftLog))) }
            let SuitcaseCrunchLog = exerciseLogsObj.filter(exerciseLog => "Suitcase Crunch" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(SuitcaseCrunchLog)) !== 'number' || isNaN(Math.round(CalculateMax(SuitcaseCrunchLog)))) {} else { 
                AbsMaxArray.push(Math.round(CalculateMax(SuitcaseCrunchLog))) }
            let CrunchLog = exerciseLogsObj.filter(exerciseLog => "Crunch" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(CrunchLog)) !== 'number' || isNaN(Math.round(CalculateMax(CrunchLog)))) {} else { 
                AbsMaxArray.push(Math.round(CalculateMax(CrunchLog))) }
            let absMax = AbsMaxArray.length === 0 ? 0 : Math.max(...AbsMaxArray)
            if (absMax && absMax !== 0 ) { upperBodySum += absMax; upperBodyQuantity += 1 }
    
            // For Calves \\ ['Weighted Raise', ' Calf Raise', 'Seated Raise']
            let CalvesMaxArray = []
            let WeightedRaiseLog = exerciseLogsObj.filter(exerciseLog => "Weighted Raise" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(WeightedRaiseLog)) !== 'number' || isNaN(Math.round(CalculateMax(WeightedRaiseLog)))) {} else { 
                CalvesMaxArray.push(Math.round(CalculateMax(WeightedRaiseLog))) }
            let CalfRaiseLog = exerciseLogsObj.filter(exerciseLog => "Calf Raise" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(CalfRaiseLog)) !== 'number' || isNaN(Math.round(CalculateMax(CalfRaiseLog)))) {} else { 
                CalvesMaxArray.push(Math.round(CalculateMax(CalfRaiseLog))) }
            let SeatedRaiseLog = exerciseLogsObj.filter(exerciseLog => "Seated Raise" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(SeatedRaiseLog)) !== 'number' || isNaN(Math.round(CalculateMax(SeatedRaiseLog)))) {} else { 
                CalvesMaxArray.push(Math.round(CalculateMax(SeatedRaiseLog))) }
            // console.log(CalvesMaxArray.length === 0 ? 0 : Math.max(...CalvesMaxArray))
            let calvesMax = CalvesMaxArray.length === 0 ? 0 : Math.max(...CalvesMaxArray)
            if (calvesMax && calvesMax !== 0 ) { lowerBodySum += calvesMax; lowerBodyQuantity += 1 }
        }
        setUpperBodyGains(upperBodySum / upperBodyQuantity)
        setLowerBodyGains(lowerBodySum / lowerBodyQuantity)
    }, [exerciseLogsReturned])

    const CalculateMax = (ExerciseLog) => {
        let ExerciseMaxs = ExerciseLog.map(exerciseLog => exerciseLog.Max)
        let ExerciseMax = Math.max(...ExerciseMaxs)
        let ExerciseMin = Math.min(...ExerciseMaxs)
        let Gain = ( (ExerciseMax - ExerciseMin) / ExerciseMin ) * 100
        return Gain
    }

    return (
    <React.Fragment>
    <div className="HomeParentContainerPhone">
            <div className='HomeContentContainer'>
            <div id='HomeWhiteboard' className='HomeWhiteboardPhone'>
            <div className='HomeWhiteboardTextPhone'>
            <div className='HomeWelcomeXPhone'>
                <div className="WelcomeXText">Welcome</div>
                <Button onClick={() => setFacingFront(!facingFront)} className='flipButton' >
                        <img id='flipImg' className='flipImg' src={flipImg} />
                    </Button>
            </div>
            <div className='HomeDynamicContainer1XPhone'>

                {facingFront ? 
                <div id='HomeDynamic1XPhone' className='HomeDynamic1XPhone'>
                <span>Upper Body Gains:</span>
                <span>{upperBodyGains}%</span>
                </div> 
                :
                <div id='HomeDynamic1XPhone' className='HomeDynamic1XPhone'>
                    <span>Current Weight:</span>
                    <span>{currentWeight}</span>
                </div>
                }

            </div>
            <div className='HomeDynamicContainer2XPhone'> 

                {facingFront ? 
                
                <div id='HomeDynamic2XPhone' className='HomeDynamic2XPhone'>
                                        <span>Lower Body Gains:</span>
                    <span>{lowerBodyGains}%</span>

                </div>
                :



                <div id='HomeDynamic2XPhone' className='HomeDynamic2XPhone'>
                    <span>Goal Weight:</span>
                    <span>{goalWeight}</span>
                </div>
                }

            </div>


            {/* <div className="container"> */}
     
      {/* </div> */}
                
                            {/* <div className={'HomeDynamicMacrosContainer'}>
                            <div className={isPhone ? 'HomeMacrosContainerPhone' : 'HomeMacrosContainer'}>
                                <div className="HomeCarbsContainer">
                                    <div className="HomeCarbsTitle">
                                        Carbs
                                    </div>{carbs}g   
                                </div>
                                <div className="HomeFatsContainer">
                                <div className="HomeFatsTitle">
                                        Fats
                                    </div>{fats}g
                                </div>
                                <div className="HomeProteinContainer">
                                <div className="HomeProteinTitle">
                                        Protein
                                    </div>{protein}g</div>
                            </div> 
                        </div>

                        <div className={isPhone ? 'HomeDynamicTotalCaloriesContainerPhone' : 'HomeDynamicTotalCaloriesContainer'}>
                            <span className={isPhone ? 'HomeTotalCaloriesTitlePhone' : 'HomeTotalCaloriesTitle'}>Total Calories</span>
                            <span className={isPhone ? 'HomeTotalCaloriesDataPhone' : 'HomeTotalCaloriesData'}>
                            {((protein * 4) + (fats * 9) + (carbs * 4))}
                               &nbsp; cal</span>
                        </div> 
            
            
                     <div className={isPhone ? 'HomeDynamicUsernameContainerPhone' : 'HomeDynamicUsernameContainer'}>
                            <span className={isPhone ? 'HomeUsernameWelcomePhone' : 'HomeUsernameWelcome'}>Welcome</span>
                        </div>
                    <div className={isPhone ? 'invisibleClass' : 'HomeGainsDynamicContainer'}>
                        <div className='HomeDisplayContainer'>
                            <span>Upper Body Gains</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>{upperBodyGains}%</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>Lower Body Gains</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>{lowerBodyGains}%</span>
                            </div>
                    </div>
                    <div className={isPhone ? 'invisibleClass' : 'HomeWeightDynamicContainer'}>
                    <div className='HomeDisplayContainer'>
                            <span>Current Weight</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>{currentWeight}</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>Goal Weight</span>
                            </div>
                        <div className='HomeDisplayContainer'>
                            <span>{goalWeight}</span>
                            </div>
                    </div>  */}

                        </div>
                    </div>
                    <div className={'HomeAnatomy2'}>
                    {/* <div className={isPhone ? 'HomeiPhoneAnatomy' : isTablet ? 'HomeDynamicAnatomy' : 'HomeAnatomy'}> */}
                        <img className='HomeAnatomyImg2' alt='' src={HomeAnatomy}  />
                        {/* <img className='HomeAnatomyImg' alt='' src={HomeAnatomy}  /> */}
                    </div>
                </div>
            </div>
    </React.Fragment>
    );
}


export default HomeMobile;

