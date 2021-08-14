import './Gains.css'
import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { EXERCISE_LOG_CREATE, POST_CREATE } from '../../graphql/mutations';
import { GET_ALL_POSTS, EXTRACT_EXERCISE_LOGS } from '../../graphql/queries';
import { uTrainEmblem } from '../../assets/uTrainEmblem.png';


const Gains = (props) =>  {
    const [exerciseLogs, setExerciseLogs] = useState([])
    const [chestGains, setChestGains] = useState(0)
    const [shoulderGains, setShoulderGains] = useState(0)
    const [bicepGains, setBicepGains] = useState(0)

    // mutation
    const [postCreate] = useMutation(POST_CREATE);
    const [exerciseLogCreate] = useMutation(EXERCISE_LOG_CREATE);

    //  query
    const { data: exerciseLogsReturned } = useQuery(EXTRACT_EXERCISE_LOGS);
    const { data: getAllPosts } = useQuery(GET_ALL_POSTS);

//  wt. x reps x .0333 + wt.= 1RM. 

    const liftSubmission = () => {
       // exerciseLogCreate({ variables: { input: exerciseLogInput } });
        let repsValue = parseInt(document.getElementById('reps').value)
        let weightValue = parseInt(document.getElementById('weight').value)
        let max = (repsValue * weightValue * 0.033) + weightValue
    }

    // const lazilyExtractExerciseLogs = () => {

    // }

    const calculateGains = () => {
        let exerciseLogsObj = exerciseLogsReturned.ExtractExerciseLogs
        let chestExerciseLogs = exerciseLogsObj.filter(exerciseLog => "Chest" === exerciseLog.MuscleGroup)
        let shouldersExerciseLogs = exerciseLogsObj.filter(exerciseLog => "Shoulders" === exerciseLog.MuscleGroup)
        let bicepsExerciseLogs = exerciseLogsObj.filter(exerciseLog => "Biceps" === exerciseLog.MuscleGroup)

        // For Chest
        let chestMaxs = chestExerciseLogs.map(chestLog => chestLog.Max)
        let chestMax = Math.max(...chestMaxs)
        let chestMin = Math.min(...chestMaxs)
        let chestGain = ( (chestMax - chestMin) / chestMin ) * 100
        setChestGains(Math.round(chestGain))
        // For Shoulders
        let shouldersMaxs = shouldersExerciseLogs.map(shouldersLog => shouldersLog.Max)
        let shouldersMax = Math.max(...shouldersMaxs)
        let shouldersMin = Math.min(...shouldersMaxs)
        let shouldersGain = ( (shouldersMax - shouldersMin) / shouldersMin ) * 100
        setShoulderGains(Math.round(shouldersGain))
        //  For Biceps 
        let bicepsMaxs = bicepsExerciseLogs.map(bicepsLog => bicepsLog.Max)
        let bicepsMax = Math.max(...bicepsMaxs)
        let bicepsMin = Math.min(...bicepsMaxs)
        let bicepsGain = ( (bicepsMax - bicepsMin) / bicepsMin ) * 100
        setBicepGains(Math.round(bicepsGain))


        let repsFromFirstLift = exerciseLogsReturned.ExtractExerciseLogs[0].Reps
        let weightFromFirstLift = exerciseLogsReturned.ExtractExerciseLogs[0].Weight
        let initialMax = (repsFromFirstLift * weightFromFirstLift * 0.033) + weightFromFirstLift
        let repsFromSecondLift = exerciseLogsReturned.ExtractExerciseLogs[1].Reps
        let weightFromSecondLift = exerciseLogsReturned.ExtractExerciseLogs[1].Weight
        let highestMax = (repsFromSecondLift * weightFromSecondLift * 0.033) + weightFromSecondLift
        let percentageIncrease = ( (highestMax - initialMax) / initialMax ) * 100
        setChestGains(percentageIncrease.toString().slice(0, 4))


        // postCreate({ variables: { input: values } });
        // exerciseLogCreate({ variables: { input: exerciseLogInput } });

    }

    useEffect(() => {
        setTimeout(() => {

        }, 3000)
    }, [])

    return (
    <React.Fragment>
        <div className="GainsParentContainer">
            <div className='GainsFrontContainer'>
                <div className='ChestGainsTester'>
                    <p className='ChestGainValueText'>{chestGains + '%'}</p>
                </div>
                <div className='ShoulderParentContainer'>
                <p className='ShouldersLabel'>Shoulders</p>
                <div className='ShoulderGainsTester'>
                    <p className='ShoulderGainsValueText'>{shoulderGains + '%'}</p>
                    </div>
                </div>


                <div className='BicepParentContainer'>
                <p className='BicepsLabel'>Bicepss</p>
                <div className='BicepGainsTester'>
                    <p className='BicepGainValueText'>{bicepGains + '%'}</p>
                </div>
                </div>
                <button style={{ position: 'relative', top: '30px', left: '30px', height: '33px', width: '122px'}} onClick={() => {calculateGains()} }>Calculate</button>
            </div>
            <div className='GainsBackContainer'></div>
        </div>
    </React.Fragment>
    );
}


export default Gains;