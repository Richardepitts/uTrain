import './Breakdown.css'
import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { EXERCISE_LOG_CREATE } from '../../graphql/mutations';
import { } from '../../graphql/queries';
// import ApolloClient from 'apollo-client';
// import { gql } from 'apollo-server-core';

const Input = (props) =>  {
    const [exercise, setExercise] = useState('Exercise')
    let headerPrompt = 'Input best lifts => gains page Tracks Yo gains 😎'

    //  MUTATION
    const [exerciseLogCreate] = useMutation(EXERCISE_LOG_CREATE);

    //  QUERY
    // const { data, loading, error } = useQuery(EXTRACT_EXERCISE_LOGS);

    const exerciseLogSubmit = () => {
        let ExerciseSelect = document.getElementById('ExerciseSelect')
        let MuscleGroupSelect = document.getElementById('MuscleGroupSelect')
        let repsValue = parseInt(document.getElementById('reps').value)
        let weightValue = parseInt(document.getElementById('weight').value)
        let exerciseValue = ExerciseSelect.value
        let muscleGroupSelectValue = MuscleGroupSelect.value
        let maxValue = parseInt((repsValue * weightValue * 0.033) + weightValue)
        let exerciseLogInput = { 
            MuscleGroup: muscleGroupSelectValue,
            Exercise: exerciseValue,
            Reps: repsValue,
            Weight: weightValue,
            Max: maxValue
        }
        console.log(exerciseLogInput)
    exerciseLogCreate({ variables: { input: exerciseLogInput } });
    }
    
    // Exercise Arrays8
    let ChestExercises = ['Flat Bench', 'Incline Bench', 'Decline Bench', 'Dumbell Bench', 'Pec Fly']
    let ShoulderExercises = ['Overhead Press', 'Lateral Raise', 'Frontal Raise']
    let BicepExercises = ['Seated Curl', 'Standing Curl', 'Close-grip Curl']

    const onSelectMuscleGroup = () => {
        let ExerciseSelect = document.getElementById('ExerciseSelect')
        let MuscleGroupSelect = document.getElementById('MuscleGroupSelect')
        ExerciseSelect.innerHTML = ''
        let chosenMuscleGroup = MuscleGroupSelect.value
        setExercise(chosenMuscleGroup)
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
        }
    }


    return (
    <React.Fragment>
<div className="weightsParentContainer">
    <p className="comingSoon">{headerPrompt}</p>

    <div className="MuscleGroupAndExerciseContainer">

        <div className='MuscleGroupParentContainer'>
            <div className='MuscleGroupLabelContainer'>
                        <p>Muscle Group</p>
                    </div>

                    <div className='MuscleGroupSelectContainer'>
                        <select onChange={() => onSelectMuscleGroup()} id={`MuscleGroupSelect`}>
                            <option value="Chest">Chest</option>
                            <option value="Shoulders">Shoulders</option> 
                            <option value="Biceps">Biceps</option>
                        </select>
                    </div>
                </div>

            <div className='ExerciseGroupParentContainer'>
        <div className='ExerciseLabelContainer'>
                    <p>{exercise}</p>
                </div>

                <div className='ExerciseSelectContainer'>
                    <select onChange={() => onSelectMuscleGroup()} id={`ExerciseSelect`}>
                        <option value="Flat_Bench">Flat Bench</option>
                        <option value="Incline_Bench">Incline Bench</option> 
                        <option value="Decline_Bench">Decline Bench</option>
                    </select>
                </div>
            </div>
        </div>

                
            <div className='RepsInputContainer'>
                <input style={{textAlign: 'center'}} type='text' id='reps' className='RepsInput' placeholder='Number of Reps'></input>
            </div>

            <div className='WeightInputContainer'>
                <input style={{textAlign: 'center'}} type='text' id='weight' className='WeightInput' placeholder='Number of Weight'></input>
            </div>

                <br/>
            <div className='SubmitButtonContainer'>
                    <button onClick={()=> {exerciseLogSubmit()}} className='SubmitButton'>Submit</button>         
            </div> 

            <div className='LadySittingContainer'>
                    <div className='LadySitting'></div>       
            </div> 

            
        </div>
    </React.Fragment>
    );
}


export default Input;

