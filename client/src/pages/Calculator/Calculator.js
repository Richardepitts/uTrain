// import './Calculator3.css'
import './Calculator.css'
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { } from '../../graphql/queries';
import LadyLyingDown from '../../assets/LadyLyingDown.png';
import Wood from '../../assets/Wood.jpg';
import Marble from '../../assets/Marble.jpg';
import { DIET_CALCULATION_CREATE } from '../../graphql/mutations';


const Calculator = (props) =>  {
    const [age, setAge] = useState('Age')
    const [carbGrams, setCarbGrams ] = useState(66)
    const [fatGrams, setFatGrams ] = useState(62)
    const [proteinGrams, setProteinGrams ] = useState(16)
    const [carbCalories, setCarbCalories] = useState(167)
    const [fatCalories, setFatCalories] = useState(176)
    const [proteinCalories, setProteinCalories] = useState(178)
    const [sexChosen, setSexChosen] = useState('Male')
    const [activityLevelText, setActivityLevelText] = useState('Activity Level')
    const [height, setHeight] = useState('Height')
    // const [weight, setWeight] = useState('Weight')
    const [activityLevel, setActivityLevel] = useState('')
    const [heightValue, setHeightValue] = useState(-1)
    const [ageValue, setAgeValue] = useState(-1)
    const [weightValue, setWeightValue] = useState(-1)
    let headerPrompt = 'Give me your info => I tell you not only what to eat, but why 🔍'

    //     let exerciseLogInput = { 
//         MuscleGroup: muscleGroupSelectValue,
//         Exercise: exerciseValue,
//         Reps: repsValue,
//         Weight: weightValue,
//         Max: maxValue
//     }
//     console.log(exerciseLogInput)
// exerciseLogCreate({ variables: { input: exerciseLogInput } });
    
    //  MUTATION
    const [dietCalculationCreate] = useMutation(DIET_CALCULATION_CREATE);

    //  QUERY
    // const { data, loading, error } = useQuery(EXTRACT_EXERCISE_LOGS);

    const onSelectAgeRange = () => {
        let AgeRangeSelect = document.getElementById('CalculatorAgeRangeSelect');
        let AgeRangeChosen = AgeRangeSelect.value
        setAgeValue(AgeRangeChosen)
        switch (AgeRangeChosen) {
            case 'Adolescent': 
                setAge(`12- 17`);
                break;
            case 'Young_Adult': 
                setAge(`18- 39`);
                break;
            case 'Middle_Aged': 
                setAge(`40- 75`);
                break;
            case 'Elderly': 
                setAge(`76-`);
                break;
        }
    }

    const onSelectActivityLevel = () => {
        let ActivityLevelSelect = document.getElementById('CalculatorActivityLevelSelect');
        let ActivityLevelChosen = ActivityLevelSelect.value
        setActivityLevel(ActivityLevelChosen)
        switch (ActivityLevelChosen) {
            case 'Sloth': 
                setActivityLevelText(`1 > hrs/week`);
                break;
            case 'Semi_Active': 
                setActivityLevelText(`2-3 hrs/week`);
                break;
            case 'Regular': 
                setActivityLevelText(`3-5 hrs/week`);
                break;
            case 'Olympian': 
                setActivityLevelText(`6+ hrs/week`);
                break;
        }
    }

    const onSelectHeight = () => {
        let HeightSelect = document.getElementById('CalculatorHeightSelect');
        let HeightChosen = HeightSelect.value
        setHeightValue(HeightChosen)
        switch (HeightChosen) {
            case 'Short': 
                setHeight(`below 5'5''`);
                break;
            case 'Average': 
                setHeight(`5'6'' - 6'`);
                break;
            case 'Tall': 
                setHeight(`6' - 6'4''`);
                break;
            case 'Very_Tall': 
                setHeight(`6'4'' and up`);
                break;
        }
    }

   const onSexChecked = (sexChosen) => {
       let CalculatorMaleCheckbox = document.getElementById('CalculatorMaleCheckbox');
       let CalculatorFemaleCheckbox = document.getElementById('CalculatorFemaleCheckbox');
    if (sexChosen === 'male') {
        setSexChosen('male')
        CalculatorMaleCheckbox.checked = true
        CalculatorFemaleCheckbox.checked = false
    } else if (sexChosen === 'female') {
        setSexChosen('female')
        CalculatorMaleCheckbox.checked = false
        CalculatorFemaleCheckbox.checked = true
    }
   }

   const CalculatorSubmit = () => {
        let WeightInput = document.getElementById('CalculatorWeightInput')
        let WeightValue = WeightInput.value
        let dietCalculationInput = {
            Age: ageValue,
            Sex: sexChosen,
            ActivityLevel: activityLevel,
            Weight: parseInt(WeightValue),
            Height: height
        }
        
                //  alert(`sex is: ${sexChosen}`)
        // alert(`age: ${typeof ageValue} and activityLevel: ${typeof  activityLevel} and heightValue: ${typeof heightValue} and ageValue: ${typeof ageValue} and WeightValue: ${typeof WeightValue}`)
        dietCalculationCreate({ variables: { input: dietCalculationInput } });

   }

    return (
    <React.Fragment>
        <div  className='CalculatorParentContainer'>
            <div  className='CalculatorContentContainer'>
                <div className='CalculatorInstructionsContainer'>
                    <p className='CalculatorInstructions'><strong>Not just Macros, but a Macro understanding🕵️‍♂️</strong></p>
                </div>
                <div  style={{width: '100%', height: '8vh'}} className='CalculatorSexCheckboxContainer'>
                    <div className='CalculatorSexCheckboxMale'> 
                        <p className='CalculatorMaleSexLabel'>Man</p>
                        <input
                                type="checkbox"
                                className={``}
                                id={`CalculatorMaleCheckbox`}
                                onChange={() => onSexChecked('male') }/>
                            </div>
                    <div className='CalculatorSexCheckboxFemale'> 
                        <p className='CalculatorFemaleSexLabel'>Woman</p>
                        <input
                                type="checkbox"
                                className={``}
                                id={`CalculatorFemaleCheckbox`}
                                onChange={() => onSexChecked('female') }/>
                        </div>
                    </div>
                <div className='CalculatorDropdownContainer'>
                    
                        <div className='CalculatorAgeRangeContainer'>
                        <div className='CalculatorAgeRangeLabelContainer'>
                                <p>{age}</p>
                            </div>
                        <div className='CalculatorAgeRangeSelectContainer'>
                            <select onChange={() => onSelectAgeRange()} id={`CalculatorAgeRangeSelect`}>
                                <option value="Adolescent">Adolescent</option>
                                <option value="Young_Adult">Young Adult</option> 
                                <option value="Middle_Aged">Middle Aged</option>
                                <option value="Elderly">Elderly</option>
                            </select>
                        </div>
                    </div>

                    <div className='CalculatorActivityLevelContainer'>
                        <div className='CalculatorActivityLevelLabelContainer'>
                                <p>{activityLevelText}</p>
                            </div>
                        <div className='CalculatorActivityLevelSelectContainer'>
                            <select onChange={() => onSelectActivityLevel()} id={`CalculatorActivityLevelSelect`}>
                                <option value="Sloth">Sloth</option>
                                <option value="Semi_Active">Semi_Active</option> 
                                <option value="Regular">Regular</option>
                                <option value="Olympian">Olympian</option>
                            </select>
                        </div>
                    </div>

                    <div className='CalculatorHeightContainer'>
                        <div className='CalculatorHeightLabelContainer'>
                                <p>{height}</p>
                            </div>
                        <div className='CalculatorHeightSelectContainer'>
                            <select onChange={() => onSelectHeight()} id={`CalculatorHeightSelect`}>
                                <option value="Short">Short</option>
                                <option value="Average">Average</option> 
                                <option value="Tall">Tall</option>
                                <option value="Very_Tall">Very Tall</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='CalculatorSignatureContainer'>
                    <div className='CalculatorSignature'>
                            <label for='CalculatorSignature'/>
                           {/* // style={{fontFamily: 'orpheus-pro'}} */}
                            <input  className='CalculatorSignatureInput' type='text' name='CalculatorSignature' placeholder='Your Signature?'></input>
                            {/* // <input placeholder="Specify start line" id="modalLogsStartInput" className="modalLogsStartInput"></input> */}
                    </div>
                </div>
                <div className='CalculatorMacrosContainer'>
                    <div className='CalculatorCarbsContainer'>
                        <p className='CalculatorMacroLabel'>Carbs </p>
                        <p className='CalculatorGramsLabel'><strong>{carbGrams}</strong> Grams</p>
                        <p><strong>{carbGrams * 4}</strong> Calories</p>
                        
                        </div>
                    <div className='CalculatorFatsContainer'>
                    <p className='CalculatorMacroLabel'>Fats </p>
                    <p className='CalculatorGramsLabel'><strong>{fatGrams}</strong> Grams</p>
                        <p><strong>{fatCalories * 9}</strong> Calories</p>
                    </div>
                    <div className='CalculatorProteinContainer'>
                    <p className='CalculatorMacroLabel'>Protein </p>
                    <p className='CalculatorGramsLabel'><strong>{proteinGrams}</strong> Grams</p>
                        <p><strong>{proteinCalories * 4} Calories</strong></p>
                    </div>
                </div>
                <div className='CalculatorTotalCaloriesContainer'>
                    <div className='CalculatorTotalCaloriesLabel'>{(carbGrams * 4) + (fatGrams * 9) + (proteinGrams * 4)} Calories</div>
                </div>
                <div  className='CalculatorWeightEntryContainer'>
                    <div className='CalculatorWeightInputContainer'>
                        <input  type='text' id='CalculatorWeightInput' className='CalculatorWeightInput' placeholder='Weight in Lbs'></input>
                    </div>
                </div>
                <div className='CalculatorSubmitContainer'>
                    <div className='CalculatorSubmit'>
                        <button onClick={() => CalculatorSubmit()} type='text' id='CalculatorSubmit' className='CalculatorSubmit'>Submit</button>
                    </div>
                </div>
                <div className='CalculatorLadyContainer'>
                    <div className='CalculatorLady'>
                        <img className='CalculatorLadyImg' alt='' src={LadyLyingDown}  />
                    </div>
                </div>

                <div className='CalculatorMarbleContainer'>
                    {/* <div className='CalculatorWood'> */}
                        <div className='CalculatorMarbleImg'></div>
                    {/* </div> */}
                </div>
            </div>
</div>
    </React.Fragment>
    );
}


export default Calculator;

