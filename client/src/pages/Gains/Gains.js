import './Gains.css'
import { useQuery, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { EXTRACT_EXERCISE_LOGS } from '../../graphql/queries';
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { gainsOrientation } from '../../components/actions/gainsOrientation';

const Gains = (props) =>  {
    const isPhone = useMediaQuery({
        query: '(max-width: 540px)'
      })
    const isTablet = useMediaQuery({
        query: '(max-width: 1000px)'
      })
    const [chestGains, setChestGains] = useState(0)
    const [shouldersGains, setShouldersGains] = useState(0)
    const [bicepsGains, setBicepsGains] = useState(0)
    const [absGains, setAbsGains] = useState(0)
    const [quadsGains, setQuadsGains] = useState(0)
    const [tricepsGains, setTricepsGains] = useState(0)
    const [latsGains, setLatsGains] = useState(0)
    const [hamstringsGains, setHamstringsGains] = useState(0)
    const [calvesGains, setCalvesGains] = useState(0)
    const [glutesGains, setGlutesGains] = useState(0)

    //  query
    const { data: exerciseLogsReturned } = useQuery(EXTRACT_EXERCISE_LOGS);

    useEffect(() => {
        console.log(`props.chosenOrientation is: ${props.chosenOrientation}`)
        if (exerciseLogsReturned && exerciseLogsReturned.ExtractExerciseLogs) {
            let exerciseLogsObj = exerciseLogsReturned.ExtractExerciseLogs
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
            setLatsGains(LatsMaxArray.length === 0 ? 0 : Math.max(...LatsMaxArray))
    
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
            setTricepsGains(TricepMaxArray.length === 0 ? 0 : Math.max(...TricepMaxArray))
    
            //  For Quads \\ ['Leg Extensions']
            let QuadsMaxArray = []
            let LegExtensionsLog = exerciseLogsObj.filter(exerciseLog => "Leg Extensions" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(LegExtensionsLog)) !== 'number' || isNaN(Math.round(CalculateMax(LegExtensionsLog)))) {} else { 
                QuadsMaxArray.push(Math.round(CalculateMax(LegExtensionsLog))) }
            setQuadsGains(QuadsMaxArray.length === 0 ? 0 : Math.max(...QuadsMaxArray))
    
            // For Hamstrings \\ ['Seated Leg Curl', 'Laying Leg Curl']
            let HamstringsMaxArray = []
            let SeatedLegCurlLog = exerciseLogsObj.filter(exerciseLog => "Seated Leg Curl" === exerciseLog.Exercise)
            if (typeof Math.round(CalculateMax(SeatedLegCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(SeatedLegCurlLog)))) {} else { 
                HamstringsMaxArray.push(Math.round(CalculateMax(SeatedLegCurlLog))) }
                let LayingLegCurlLog = exerciseLogsObj.filter(exerciseLog => "Laying Leg Curl" === exerciseLog.Exercise) 
            if (typeof Math.round(CalculateMax(LayingLegCurlLog)) !== 'number' || isNaN(Math.round(CalculateMax(LayingLegCurlLog)))) {} else { 
                HamstringsMaxArray.push(Math.round(CalculateMax(LayingLegCurlLog))) }
            setHamstringsGains(HamstringsMaxArray.length === 0 ? 0 : Math.max(...HamstringsMaxArray))
    
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
            setGlutesGains(GlutesMaxArray.length === 0 ? 0 : Math.max(...GlutesMaxArray))
    
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
            setChestGains(ChestMaxArray.length === 0 ? 0 : Math.max(...ChestMaxArray))
    
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
            setBicepsGains(BicepsMaxArray.length === 0 ? 0 : Math.max(...BicepsMaxArray))
    
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
            setShouldersGains(ShouldersMaxArray.length === 0 ? 0 : Math.max(...ShouldersMaxArray))
    
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
            setAbsGains(AbsMaxArray.length === 0 ? 0 : Math.max(...AbsMaxArray))
    
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
            setCalvesGains(CalvesMaxArray.length === 0 ? 0 : Math.max(...CalvesMaxArray))
    
        }
    }, [exerciseLogsReturned])

    const liftSubmission = () => {
        let repsValue = parseInt(document.getElementById('reps').value)
        let weightValue = parseInt(document.getElementById('weight').value)
        let max = (repsValue * weightValue * 0.033) + weightValue
    }

    const CalculateMax = (ExerciseLog) => {
        let ExerciseMaxs = ExerciseLog.map(exerciseLog => exerciseLog.Max)
        let ExerciseMax = Math.max(...ExerciseMaxs)
        let ExerciseMin = Math.min(...ExerciseMaxs)
        let Gain = ( (ExerciseMax - ExerciseMin) / ExerciseMin ) * 100
        return Gain
    }

    const MouseOverMuscleGroup = (MuscleGroup, classNameOfParent) => {
        if (isTablet || !exerciseLogsReturned) {} else {
        let exerciseLogsObj = exerciseLogsReturned.ExtractExerciseLogs
        let MuscleGroupLog = exerciseLogsObj.filter(exerciseLog => MuscleGroup === exerciseLog.MuscleGroup)
        const popupContainer = document.createElement('div')
        popupContainer.addEventListener('mouseleave', e => { MouseLeaveMuscleGroup()})
        popupContainer.classList.add('GainsTooltipContainer')
        const popup = document.createElement('span')
        popup.classList.add('GainsTooltip')
        const popupContents = document.createElement('div')
        popupContents.classList.add('GainsTooltipText')

        const linkDiv = document.createElement('div')
        linkDiv.classList.add('linkDiv')
        linkDiv.innerHTML = '<div></div>'
        const linkDivChild = document.createElement('button')
        linkDivChild.classList.add('linkDivChild')
        linkDivChild.innerText = `Input your best ${MuscleGroup} lifts`
        linkDivChild.onclick = function(e) {
            e.preventDefault();
            window.location.href='https://utrain-client.herokuapp.com/input';
        }
        linkDiv.appendChild(linkDivChild)
        if (MuscleGroupLog.length == 0) {
            const selectedElement = document.querySelector(`.${classNameOfParent}`)
            if (selectedElement) { 
                var boundingRect = selectedElement.getBoundingClientRect();
             }
            if (popupContainer && boundingRect) {
                popupContainer.style.left = boundingRect.left - 114 + 'px'
                popupContainer.style.top = boundingRect.top - 128 + 'px'
                popupContainer.appendChild(popup)
                popup.appendChild(popupContents)
                }
                const root = document.getElementById('root')
                root.appendChild(popupContainer)
            popupContents.appendChild(linkDiv)
            return
        }

        var exercisesArray = [];
        MuscleGroupLog.forEach(exerciseItem => {
            if (!exercisesArray.includes(exerciseItem)) {
                exercisesArray.push(exerciseItem)
            }
        })
        popupContents.style.fontSize = 10 + 'px'
        popupContents.innerHTML = "&nbsp;" + "<strong>Exercise</strong>" + "&nbsp;" + "&nbsp;" +  "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" +  "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" +  "<strong>Reps</strong>" + "&nbsp;" + "&nbsp;" +  "&nbsp;" + "<strong>Weight</strong>" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "<strong>Max</strong>"
        MuscleGroupLog.forEach(exerciseItem => {
            let exerciseItemExercise = `${exerciseItem.Exercise}`
            var exerciseItemLengthSpacer = exerciseItemExercise.length

            var alreadyChanged = false;
            if (exerciseItemLengthSpacer === 5 && !alreadyChanged) {
                exerciseItemLengthSpacer = 9
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 6 && !alreadyChanged) {
                exerciseItemLengthSpacer = 13
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 7 && !alreadyChanged) {
                exerciseItemLengthSpacer = 12
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 8 && !alreadyChanged) {
                exerciseItemLengthSpacer = 11
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 9 && !alreadyChanged) {
                exerciseItemLengthSpacer = 8
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 10 && !alreadyChanged) {
                exerciseItemLengthSpacer = 9
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 11 && !alreadyChanged) {
                exerciseItemLengthSpacer = 8
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 12 && !alreadyChanged) {
                exerciseItemLengthSpacer = 7
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 13 && !alreadyChanged) {
                exerciseItemLengthSpacer = 6
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 14 && !alreadyChanged) {
                exerciseItemLengthSpacer = 5
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer === 15 && !alreadyChanged) {
                exerciseItemLengthSpacer = 4
                alreadyChanged = true
            }
            if (exerciseItemLengthSpacer > 14 && !alreadyChanged) {
                exerciseItemLengthSpacer = 2
                alreadyChanged = true
            }
            let exerciseItemReps = `${exerciseItem.Reps}`
            let exerciseItemWeight = `${exerciseItem.Weight}`
            let exerciseItemMax = `${exerciseItem.Max}`
            var exerciseItemRepsSpacer = exerciseItemReps.length
            var exerciseItemWeightSpacer = exerciseItemWeight.length
            var innerHTMLInput; 
            var firstSpace = "&nbsp;" + "&nbsp;";
            var secondSpace = "&nbsp;" + "&nbsp;" + "&nbsp;";
            var thirdSpace = "&nbsp;";
            let beginningPiece = "<br/>" + "&nbsp;" + `${exerciseItem.Exercise}`
            for (let i = 0; i < exerciseItemLengthSpacer; i++) {
                firstSpace += "&nbsp;";
            }
            var exerciseRepsAlreadySet = false;
            if (exerciseItemRepsSpacer == 1) { exerciseRepsAlreadySet = true; secondSpace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" }
            if (exerciseItemRepsSpacer == 2 && !exerciseRepsAlreadySet) { exerciseRepsAlreadySet = true; secondSpace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" }
            if (exerciseItemRepsSpacer == 3 && !exerciseRepsAlreadySet) { secondSpace = "" }
            var exerciseWeightAlreadySet = false;
            if (exerciseItemWeightSpacer == 1) { exerciseWeightAlreadySet = true; thirdSpace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" }
            if (exerciseItemWeightSpacer == 2 && !exerciseWeightAlreadySet) { exerciseWeightAlreadySet = true; thirdSpace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" }
            if (exerciseItemWeightSpacer == 3 && !exerciseWeightAlreadySet) { exerciseWeightAlreadySet = true; thirdSpace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" }
            innerHTMLInput = beginningPiece + firstSpace + exerciseItemReps + secondSpace + exerciseItemWeight + thirdSpace + exerciseItemMax
            popupContents.innerHTML += innerHTMLInput
        })
        const selectedElement = document.querySelector(`.${classNameOfParent}`)
        if (selectedElement) { 
            var boundingRect = selectedElement.getBoundingClientRect();
         }
         if (popupContainer && boundingRect) {
        popupContainer.style.left = boundingRect.left - 114 + 'px'
        popupContainer.style.top = boundingRect.top - 128 + 'px'
        popupContainer.appendChild(popup)
        popup.appendChild(popupContents)
        }
        const root = document.getElementById('root')
        root.appendChild(popupContainer)
    }
}

    // const openMobileMail = (muscleGroup) => {
    //     const popupContainer = document.createElement('div')
    //     // popupContainer.addEventListener('mouseleave', e => { MouseLeaveMuscleGroup()})
    //     popupContainer.classList.add('GainsTooltipContainer2')

    //     const root = document.getElementById('root')
    //     root.appendChild(popupContainer)
    // }

    const onToggleAnatomy = (side) => {
        let GainsDynamicFrontContents = document.getElementById('GainsDynamicFrontContents')
        let GainsDynamicBackContents = document.getElementById('GainsDynamicBackContents')
        let GainsDynamicImage = document.getElementById('GainsDynamicImage');
        let GainsDynamicButtonFront = document.getElementById('GainsDynamicButtonFront');
        let GainsDynamicButton = document.getElementById('GainsDynamicButton');
        if (side === 'Back') {
            GainsDynamicButtonFront.classList.add('GainsSelected')
            GainsDynamicButton.classList.remove('GainsSelected')
            props.gainsOrientation(true)
            GainsDynamicImage.classList.remove('GainsDynamicImage');
            GainsDynamicImage.classList.add('GainsDynamicImageFront');
            GainsDynamicFrontContents.style.display = 'block'
            GainsDynamicBackContents.style.display = 'none'
        }
        if (side === 'Front') {
            GainsDynamicButtonFront.classList.remove('GainsSelected')
            GainsDynamicButton.classList.add('GainsSelected')
            props.gainsOrientation(false)
            GainsDynamicImage.classList.add('GainsDynamicImage');
            GainsDynamicImage.classList.remove('GainsDynamicImageFront');
            GainsDynamicFrontContents.style.display = 'none'
            GainsDynamicBackContents.style.display = 'block'
        }
    }

    const MouseLeaveMuscleGroup = () => {
        let AllPossiblePopups = document.querySelectorAll('.GainsTooltipContainer')
        if (AllPossiblePopups) { AllPossiblePopups.forEach(popup => {
            popup.remove()
            })
        }
    }
    if (isTablet) {
        return (
        <React.Fragment>
        <div className={isPhone ? "GainsParentContainerPhone" : "GainsParentContainerD"}>
            <div id='GainsDynamicContainer' className="GainsDynamicContainer">
                <button id='GainsDynamicButtonFront' className='GainsDynamicButtonFront' onClick={() => onToggleAnatomy('Back')} >Front</button>
                <button id='GainsDynamicButton' className='GainsDynamicButton GainsSelected' onClick={() => onToggleAnatomy('Front')} >Back</button>
            <div id='GainsDynamicImage' className='GainsDynamicImage'></div>
            <div style={{ display: 'none'}} id='GainsDynamicFrontContents' className='GainsDynamicFrontContents'>
            <div onMouseEnter={() => MouseOverMuscleGroup(`Chest`, 'ChestParentContainer')}  className={isPhone ? 'ChestDynamicParentContainer' : 'ChestDynamicParentContainerD'}>
                                <div className='ChestLabel'>Chest</div>
                                <div className='ChestGainsTester'>
                                    <div className='ChestGainsValueText'><CountUp end={chestGains} duration={2}/>%</div>
                                </div>
                            </div> 
        
                            <div onMouseEnter={() => MouseOverMuscleGroup(`Shoulders`, 'ShoulderParentContainer')} className={isPhone ? 'ShoulderDynamicParentContainer' : 'ShoulderDynamicParentContainerD'}>
                                <div className='ShouldersLabel'>Shoulders</div>
                                <div className='ShouldersGainsTester'>
                                    <div className='ShoulderGainsValueText'><CountUp end={shouldersGains} duration={2}/>%</div>
                                </div>
                            </div> 
                            
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Abs`, 'AbsParentContainer')} className={isPhone ? 'AbsDynamicParentContainer' : 'AbsDynamicParentContainerD'}>
                            <div className='AbsLabel'>Abs</div>
                            <div className='AbsGainsTester'>
                                <div className='AbsGainsValueText'><CountUp end={absGains} duration={2}/>%</div>
                            </div>
                        </div>
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Biceps`, 'BicepParentContainer')} className={isPhone ? 'BicepDynamicParentContainer' : 'BicepDynamicParentContainerD'}>
                            <div className='BicepLabel'>Biceps</div>
                            <div className='BicepsGainsTester'>
                                <div className='BicepGainsValueText'><CountUp end={bicepsGains} duration={2}/>%</div>
                            </div>
                        </div> 
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Calves`, 'CalvesParentContainer')} className={isPhone ? 'CalvesDynamicParentContainer' : 'CalvesDynamicParentContainerD'}>
                            <div className='CalvesLabel'>Calves</div>
                            <div className='CalvesGainsTester'>
                                <div className='CalvesGainsValueText'><CountUp end={calvesGains} duration={7}/>%</div>
                            </div>
                        </div>  
                   
            </div>
            <div id='GainsDynamicBackContents' className='GainsDynamicBackContents'>
            <div onMouseEnter={() => MouseOverMuscleGroup(`Lats`, `LatsParentContainer`)} className={isPhone ?  'LatsDynamicParentContainer' : 'LatsDynamicParentContainerD'}>
                            <div className='LatsLabel'>Lats</div>
                            <div className='LatsGainsTester'>
                                <div className='LatsGainsValueText'><CountUp end={latsGains} duration={2}/>%</div>
                            </div>
                        </div>  
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Glutes`, `GlutesParentContainer`)} className={isPhone ?  'GlutesDynamicParentContainer' : 'GlutesDynamicParentContainerD'}>
                            <div className='GlutesLabel'>Glutes</div>
                            <div className='GlutesGainsTester'>
                                <div className='GlutesGainsValueText'><CountUp end={glutesGains} duration={2}/>%</div>
                            </div>
                        </div>  
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Triceps`, 'TricepsParentContainer')} className={isPhone ?  'TricepsDynamicParentContainer' : 'TricepsDynamicParentContainerD'}>
                            <div className='TricepsLabel'>Triceps</div>
                            <div className='TricepsGainsTester'>
                                <div className='TricepsGainsValueText'><CountUp end={tricepsGains} duration={2}/>%</div>
                            </div>
                        </div>  
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Hamstrings`, 'HamstringsParentContainer')} className={isPhone ?  'HamstringsDynamicParentContainer' : 'HamstringsDynamicParentContainerD'}>
                            <div className='HamstringsLabel'>Hamstrings</div>
                            <div className='HamstringsGainsTester'>
                                <div className='HamstringsGainsValueText'><CountUp end={hamstringsGains} duration={2}/>%</div>
                            </div>
                        </div>  
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Quads`, 'QuadsParentContainer')} className={isPhone ?  'QuadsDynamicParentContainer' : 'QuadsDynamicParentContainerD'}>
                            <div className='QuadsLabel'>Quads</div>
                            <div className='QuadsGainsTester'>
                                <div className='QuadsGainsValueText'><CountUp end={quadsGains} duration={2}/>%</div>
                            </div>
                        </div>  
                     </div>
                 </div>
            </div>
            {isPhone ? '' : <div className='GainsMarbleContainer'>
                <div className='GainsMarbleImg'></div>
            </div>}
           
    </React.Fragment>
        )
    } else if (!isTablet) {
        return (
            <React.Fragment>
                <div className="GainsParentContainer">
                    <div className='GainsLeftContainer'>
                        <div className='GainsLeftImage'></div>
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Lats`, `LatsParentContainer`)} className='LatsParentContainer'>
                            <div className='LatsLabel'>Lats</div>
                            <div className='LatsGainsTester'>
                                <div className='LatsGainsValueText'><CountUp end={latsGains} duration={2}/>%</div>
                            </div>
                        </div>  
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Glutes`, `GlutesParentContainer`)} className='GlutesParentContainer'>
                            <div className='GlutesLabel'>Glutes</div>
                            <div className='GlutesGainsTester'>
                                <div className='GlutesGainsValueText'><CountUp end={glutesGains} duration={2}/>%</div>
                            </div>
                        </div>  

                        <div onMouseEnter={() => MouseOverMuscleGroup(`Triceps`, 'TricepsParentContainer')} className='TricepsParentContainer'>
                            <div className='TricepsLabel'>Triceps</div>
                            <div className='TricepsGainsTester'>
                                <div className='TricepsGainsValueText'><CountUp end={tricepsGains} duration={2}/>%</div>
                            </div>
                        </div>  
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Hamstrings`, 'HamstringsParentContainer')} className='HamstringsParentContainer'>
                            <div className='HamstringsLabel'>Hamstrings</div>
                            <div className='HamstringsGainsTester'>
                                <div className='HamstringsGainsValueText'><CountUp end={hamstringsGains} duration={2}/>%</div>
                            </div>
                        </div>  
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Quads`, 'QuadsParentContainer')} className='QuadsParentContainer'>
                            <div className='QuadsLabel'>Quads</div>
                            <div className='QuadsGainsTester'>
                                <div className='QuadsGainsValueText'><CountUp end={quadsGains} duration={2}/>%</div>
                            </div>
                        </div>  
                    </div>
                    <div className='GainsRightContainer'>
                        <div className='GainsRightImage'>
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Chest`, 'ChestParentContainer')}  className='ChestParentContainer'>
                                <div className='ChestLabel'>Chest</div>
                                <div className='ChestGainsTester'>
                                    <div className='ChestGainsValueText'><CountUp end={chestGains} duration={2}/>%</div>
                                </div>
                            </div> 
        
                            <div onMouseEnter={() => MouseOverMuscleGroup(`Shoulders`, 'ShoulderParentContainer')} className='ShoulderParentContainer'>
                                <div className='ShouldersLabel'>Shoulders</div>
                                <div className='ShouldersGainsTester'>
                                    <div className='ShoulderGainsValueText'><CountUp end={shouldersGains} duration={2}/>%</div>
                                </div>
                            </div> 
                            
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Abs`, 'AbsParentContainer')} className='AbsParentContainer'>
                            <div className='AbsLabel'>Abs</div>
                            <div className='AbsGainsTester'>
                                <div className='AbsGainsValueText'><CountUp end={absGains} duration={2}/>%</div>
                            </div>
                        </div>
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Biceps`, 'BicepParentContainer')} className='BicepParentContainer'>
                            <div className='BicepLabel'>Biceps</div>
                            <div className='BicepsGainsTester'>
                                <div className='BicepGainsValueText'><CountUp end={bicepsGains} duration={2}/>%</div>
                            </div>
                        </div> 
        
                        <div onMouseEnter={() => MouseOverMuscleGroup(`Calves`, 'CalvesParentContainer')} className='CalvesParentContainer'>
                            <div className='CalvesLabel'>Calves</div>
                            <div className='CalvesGainsTester'>
                                <div className='CalvesGainsValueText'><CountUp end={calvesGains} duration={7}/>%</div>
                            </div>
                        </div>  
                        </div>
                    </div>
                </div>
                    <div className='GainsMarbleContainer'>
                <div className='GainsMarbleImg'></div>
            </div>
            </React.Fragment>
            );
        }
    }

const mapStateToProps = state => ({
    chosenOrientation: state.chosenOrientation.items
})

export default connect(mapStateToProps, {gainsOrientation})(Gains);