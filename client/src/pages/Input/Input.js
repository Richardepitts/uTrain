import './Input.css'
import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { EXERCISE_LOG_CREATE } from '../../graphql/mutations';
import { } from '../../graphql/queries';
import InputAnatomy from './InputAnatomy.png';
import InputCommentCloudImg from './InputCommentCloud.png';
import { useMediaQuery } from 'react-responsive'


const Input = (props) =>  {
    const [exercise, setExercise] = useState('')
    const [muscleGroup, setMuscleGroup] = useState('')
    const [maxValue, setMaxValue] = useState(0)
    const [commentCloudVisible, setCommentCloudVisible] = useState(false)
    const { state, dispatch } = useContext(AuthContext);

    const isPhone = useMediaQuery({
        query: '(max-width: 540px)'
      })

    let headerPrompt = 'Input your best lifts for the Gains page to track 😎'

    useEffect(() => {
        setTimeout(() => {
            setCommentCloudVisible(false)
        }, 3300)
    }, [commentCloudVisible])

    //  MUTATION
    const [exerciseLogCreate] = useMutation(EXERCISE_LOG_CREATE);

    //  QUERY
    // const { data, loading, error } = useQuery(EXTRACT_EXERCISE_LOGS);

    const exerciseLogSubmit = () => {
        let MuscleGroupSelect = document.getElementById('MuscleGroupSelect')
        let repsValue = parseInt(document.getElementById('reps').value)
        let weightValue = parseInt(document.getElementById('weight').value)
        let muscleGroupSelectValue = MuscleGroupSelect.value
        let maxValue = parseInt((repsValue * weightValue * 0.033) + weightValue)
        if (exercise === '') { var defaultExercise = document.getElementById('ExerciseSelect').value }
        let exerciseLogInput = { 
            MuscleGroup: muscleGroupSelectValue,
            Exercise: exercise === '' ? defaultExercise : exercise,
            Reps: repsValue,
            Weight: weightValue,
            Max: maxValue
        }
        setMaxValue(maxValue)
        console.log(exerciseLogInput)
        exerciseLogCreate({ variables: { input: exerciseLogInput } });
        setCommentCloudVisible(true)
    }
    
    // Exercise Arrays
    let ChestExercises = ['Flat Bench', 'Incline Bench', 'Decline Bench', 'Dumbell Bench', 'Pec Fly']
    let ShoulderExercises = ['Overhead Press', 'Lateral Raise', 'Frontal Raise']
    let BicepExercises = ['Seated Curl', 'Standing Curl', 'Close-grip Curl']
    let QuadsExercises = ['Leg Extensions']
    let AbsExercises = ['Leg Lift', 'Suitcase Crunch', 'Crunch']
    let TricepsExercises = ['Tricep Pushdown', 'Tricep Dips', 'Overhead Pushdown']
    let LatsExercises = ['Lat Pulldown', 'Dumbell Row', 'Chinups']
    let HamstringExercises = ['Seated Leg Curl', 'Laying Leg Curl']
    let GlutesExercises = ['Deadlifts', 'Leg Press', 'Barbell Squats', 'Hack Squat']
    let CalvesExercises = ['Weighted Raise', ' Calf Raise', 'Seated Raise']

    const onSelectMuscleGroup = () => {
        let ExerciseSelect = document.getElementById('ExerciseSelect')
        let MuscleGroupSelect = document.getElementById('MuscleGroupSelect')
        ExerciseSelect.innerHTML = ''
        let chosenMuscleGroup = MuscleGroupSelect.value
        setMuscleGroup(chosenMuscleGroup)
        switch (chosenMuscleGroup) {
            case 'Chest':
                ChestExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = ChestExercises[i]
                    option.innerText = ChestExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Shoulders':
                ShoulderExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = ShoulderExercises[i]
                    option.innerText = ShoulderExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Biceps':
                BicepExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = BicepExercises[i]
                    option.innerText = BicepExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Quads':
                QuadsExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = QuadsExercises[i]
                    option.innerText = QuadsExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Abs':
                AbsExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = AbsExercises[i]
                    option.innerText = AbsExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Triceps':
                TricepsExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = TricepsExercises[i]
                    option.innerText = TricepsExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Lats':
                LatsExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = LatsExercises[i]
                    option.innerText = LatsExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Hamstrings':
                HamstringExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = HamstringExercises[i]
                    option.innerText = HamstringExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Glutes':
                GlutesExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = GlutesExercises[i]
                    option.innerText = GlutesExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;

            case 'Calves':
                CalvesExercises.forEach(((ex, i) => {
                    let option = document.createElement('option')
                    option.value = CalvesExercises[i]
                    option.innerText = CalvesExercises[i]
                    ExerciseSelect.appendChild(option)
                }))
                break;
        }
    }

    const onSelectExercise = () => {
        let ExerciseSelect = document.getElementById('ExerciseSelect')
        setExercise(ExerciseSelect.value)
    }


    return (
    <React.Fragment>
<div className={isPhone ? 'InputsParentContainerP' : 'InputsParentContainerD'} >

    <div className={isPhone ? "MuscleGroupAndExerciseContainerP" : "MuscleGroupAndExerciseContainerD"}>

        <div className='MuscleGroupParentContainer'>
            {/* <div className='MuscleGroupLabelContainer'>
                        <p>Muscle Group</p>
                    </div> */}

                    <div className='MuscleGroupSelectContainer'>
                        <select onChange={() => onSelectMuscleGroup()} id={`MuscleGroupSelect`} className={isPhone ? 'MuscleGroupSelectP' : 'MuscleGroupSelectD'}>
                            <option value="Chest">Chest</option>
                            <option value="Shoulders">Shoulders</option> 
                            <option value="Biceps">Biceps</option>
                            <option value="Quads">Quads</option>
                            <option value="Abs">Abs</option> 
                            <option value="Triceps">Triceps</option>
                            <option value="Lats">Lats</option>
                            <option value="Hamstrings">Hamstring</option> 
                            <option value="Glutes">Glutes</option>
                            <option value="Calves">Calves</option>
                        </select>
                    </div>
                </div>

            <div className='ExerciseGroupParentContainer'>
        {/* <div className='ExerciseLabelContainer'>
                    <p>{exercise}</p>
                </div> */}

                <div className='ExerciseSelectContainer'>
                    <select onChange={() => onSelectExercise()} id={`ExerciseSelect`} className={isPhone ? 'ExerciseSelectP' : 'ExerciseSelectD'}>
                        <option value="Flat Bench">Flat Bench</option>
                        <option value="Incline Bench">Incline Bench</option> 
                        <option value="Decline Bench">Decline Bench</option>
                    </select>
                </div>
            </div>
        </div>

        <div className={isPhone ? 'RepsAndWeightInputContainerP' : 'RepsAndWeightInputContainerD'}>

            <div className='RepsInputContainer'>
                <input type='text' id='reps' className={isPhone ? 'RepsInputP' : 'RepsInputD'} placeholder='Rep #'></input>
            </div>

            <div className='WeightInputContainer'>
                <input type='text' id='weight' className={isPhone ? 'WeightInputP' : 'WeightInputD'} placeholder='Weight'></input>
            </div>

        </div>
                <br/>
            <div className={isPhone ? 'InputSubmitButtonContainerP' : 'InputSubmitButtonContainerD'}>
                    <button onClick={()=> {exerciseLogSubmit()}} className='InputSubmit'>Submit</button>         
            </div> 
            {commentCloudVisible ? <div className='InputCommentCloudContainer'>

                <span className='InputCommentText'>Saved!  Your Max is: &nbsp;
                    { maxValue }

                
                </span>
                <img className='InputCommentCloudImg' src={InputCommentCloudImg} ></img>
            </div> : ''}

            <div className={isPhone ? 'InputAnatomyContainerP' : 'InputAnatomyContainerD'}>
                    <img className='InputLadyImg' alt='' src={InputAnatomy}  />
                </div>
            </div>
            {isPhone ? '' : <div className='GainsMarbleContainer'>
                <div className='GainsMarbleImg'></div>
        </div>}

    </React.Fragment>
    );
}


export default Input;

