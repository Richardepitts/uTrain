import './Calculator.css'
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { DIET_CALCULATION_CREATE } from '../../graphql/mutations';
import { AgeEvaluator } from './AgeEvaluator';
import { ActivityLevelEvaluator } from './ActivityLevelEvaluator';
import { HeightEvaluator } from './HeightEvaluator';
import { SexEvaluator } from './SexEvaluator';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import '../../Global/animatedCSSCheckbox.scss';

const Calculator = (props) =>  {
    const isPhone = useMediaQuery({
        query: '(max-width: 540px)'
      })
    const [age, setAge] = useState('Age?')
    const [carbGrams, setCarbGrams ] = useState(``)
    const [fatGrams, setFatGrams ] = useState(``)
    const [proteinGrams, setProteinGrams ] = useState(``)
    const [sexChosen, setSexChosen] = useState('male')
    const [activityLevelText, setActivityLevelText] = useState('Activity Level?')
    const [height, setHeight] = useState('Height?')
    const [activityLevel, setActivityLevel] = useState('')
    const [heightValue, setHeightValue] = useState(-1)
    const [ageValue, setAgeValue] = useState(-1)
    let headerPrompt = 'Give me your info => I tell you not only what to eat, but why 🔍'

    useEffect(() => {

    }, [])

    //  MUTATION
    const [dietCalculationCreate] = useMutation(DIET_CALCULATION_CREATE);

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
       let CalculatorMaleCheckbox = document.querySelector('.CalculatorMaleCheckbox');
       let CalculatorFemaleCheckbox = document.querySelector('.CalculatorFemaleCheckbox');
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
        let ProteinGrams; 
        let CarbGrams;
        let FatGrams;
        let WeightInput = document.getElementById('CalculatorWeightInput')
        let GoalWeightInput = document.getElementById('CalculatorGoalWeightInput')
        let WeightValue = WeightInput.value
        let GoalWeightValue = GoalWeightInput.value
        if (WeightValue) {
            var RefinedCarb; 
            CarbGrams = Math.round(parseInt(WeightValue) * 1.23)
            RefinedCarb = AgeEvaluator(CarbGrams, ageValue)
            RefinedCarb = ActivityLevelEvaluator(RefinedCarb, activityLevel)
            HeightEvaluator(RefinedCarb, height)
            SexEvaluator(RefinedProtein, sexChosen)
            setCarbGrams(Math.round(RefinedCarb))

            var RefinedFat; 
            FatGrams = Math.round(parseInt(WeightValue) * .28)
            RefinedFat = AgeEvaluator(FatGrams, ageValue)
            RefinedFat = ActivityLevelEvaluator(RefinedFat, activityLevel)
            HeightEvaluator(RefinedFat, height)
            SexEvaluator(RefinedProtein, sexChosen)
            setFatGrams(Math.round(RefinedFat))
                        
            var RefinedProtein; 
            ProteinGrams = Math.round(parseInt(WeightValue) * .76)
            RefinedProtein = AgeEvaluator(ProteinGrams, ageValue)
            RefinedProtein = ActivityLevelEvaluator(RefinedProtein, activityLevel)
            HeightEvaluator(RefinedProtein, height)
            SexEvaluator(RefinedProtein, sexChosen)
            setProteinGrams(Math.round(RefinedProtein))
        }
        let dietCalculationInput = {
            Age: ageValue,
            Sex: sexChosen,
            ActivityLevel: activityLevel,
            Weight: parseInt(WeightValue),
            GoalWeight: parseInt(GoalWeightValue),
            Height: height,
            Carbs: Math.round(RefinedCarb),
            Fats: Math.round(RefinedFat),
            Protein: Math.round(RefinedProtein)
        }
      dietCalculationCreate({ variables: { input: dietCalculationInput } });
   }

    return (
    <React.Fragment>
        <div  id='CalculatorParentContainer' className={isPhone ? 'CalculatorParentContainerPhone' : 'CalculatorParentContainer'}>
            <div id='CalculatorContentContainer' className='CalculatorContentContainer'>
                <div  style={{width: '100%', height: '8vh'}} className={isPhone ? 'CalculatorSexCheckboxContainerMobile' : 'CalculatorSexCheckboxContainerD'}>
                    <div className='CalculatorSexCheckboxMale'> 
                        <p className='CalculatorMaleSexLabel'>Man</p>
                        <input onChange={() => onSexChecked('male')} className='CalculatorMaleCheckbox' type="checkbox" id="CalculatorMaleCheckbox" />
                        <label for="CalculatorMaleCheckbox" className="check-box"></label> 
                            </div>
                    <div className='CalculatorSexCheckboxFemale'> 

                        <p className='CalculatorFemaleSexLabel'>Woman</p>
                        <input onChange={() => onSexChecked('female')} className='CalculatorFemaleCheckbox' type="checkbox" id="CalculatorFemaleCheckbox" />
                        <label for="CalculatorFemaleCheckbox" className="check-box"></label> 
                        </div>
                    </div>
                <div className='CalculatorDropdownContainer'>
                        <div className={isPhone ? 'CalculatorAgeRangeContainerMobile' : 'CalculatorAgeRangeContainerD'}>
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

                    <div className={isPhone ? 'CalculatorActivityLevelContainerMobile' : 'CalculatorActivityLevelContainerD'}>
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

                    <div className={isPhone ? 'CalculatorHeightContainerMobile' : 'CalculatorHeightContainerD'}>
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
                <div className={isPhone ? 'CalculatorMacrosContainerMobile' : 'CalculatorMacrosContainerD'}>
                    <div className='CalculatorCarbsContainer'>
                        <p className='CalculatorMacroLabel'>Carbs </p>
                        <p className='CalculatorGramsLabel'><strong>{carbGrams}</strong> Grams</p>
                        <p><strong>{carbGrams > 0 ? carbGrams * 4 : ''}</strong> Calories</p>
                        
                        </div>
                    <div className='CalculatorFatsContainer'>
                    <p className='CalculatorMacroLabel'>Fats </p>
                    <p className='CalculatorGramsLabel'><strong>{fatGrams}</strong> Grams</p>
                        <p><strong>{fatGrams > 0 ? fatGrams * 9 : ''}</strong> Calories</p>
                    </div>
                    <div className='CalculatorProteinContainer'>
                    <p className='CalculatorMacroLabel'>Protein </p>
                    <p className='CalculatorGramsLabel'><strong>{proteinGrams}</strong> Grams</p>
                        <p><strong>{proteinGrams > 0 ? proteinGrams * 4 : ''}</strong> Calories</p>
                    </div>
                </div>
                <div className={isPhone ? 'CalculatorTotalCaloriesContainerMobile' : 'CalculatorTotalCaloriesContainerD'}>
                    <div className='CalculatorTotalCaloriesLabel'>
                        {carbGrams > 0 && fatGrams > 0 && proteinGrams > 0 ? (carbGrams * 4) + (fatGrams  * 9) + (proteinGrams * 4 ) + ' ' + 'Calories' : 'Calories'}
                        </div>
                </div>
                <div  className={isPhone ? 'CalculatorWeightEntryContainerMobile' : 'CalculatorWeightEntryContainerD'}>
                    <div className='CalculatorWeightInputContainer'>
                        <input type='text' id='CalculatorWeightInput' className='CalculatorWeightInput' placeholder='Current Weight'></input>
                    </div>
                </div>
                <div  className={isPhone ? 'CalculatorGoalWeightEntryContainerMobile' : 'CalculatorGoalWeightEntryContainerD' }>
                    <div className='CalculatorGoalWeightInputContainer'>
                        <input  type='text' id='CalculatorGoalWeightInput' className='CalculatorGoalWeightInput' placeholder='Goal Weight'></input>
                    </div>
                </div>
                <div className={isPhone ? 'CalculatorSubmitContainerMobile' : 'CalculatorSubmitContainerD'}>
                    <div className='CalculatorSubmit'>
                        <button onClick={() => CalculatorSubmit()} type='text' id='CalculatorSubmit' className='CalculatorSubmit'>Submit</button>
                    </div>
                </div>
                </div>
            </div>

    </React.Fragment>
    );
}

const mapStateToProps = state => ({
    chosenOrientation: state.chosenOrientation.items
})

export default connect(mapStateToProps, {})(Calculator);

