import './Breakdown.css'
import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useState, useContext, useEffect, fragment } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { EXERCISE_LOG_CREATE } from '../../graphql/mutations';
import { ALL_USERS } from '../../graphql/queries';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import BreakdownMan from './BreakdownMan.png';


const Breakdown = (props) =>  {
    const isTablet = useMediaQuery({
        query: '(max-width: 1000px)'
      })
    const isPhone = useMediaQuery({
        query: '(max-width: 540px)'
      })
    let history = useHistory();
    const { state, dispatch } = useContext(AuthContext);
    let textForBasics = [`Breakdown: You learn how to use the app, what it does, and the most valuable fitness insights`,
    <br/>,
    'Calculator: You calculate how much of each of the Macros you need and Why.  Without studies and research, it\'s hard to reasonably act',
    <br/>,
    'Gains: You do the most important thing: track your gains after Inputing them.',
    <br/>,
    'Input:  As you workout and hit PRs(personal records), you record them here.  This dynamically updates your gains chart'];
    const [topicText, setTopicText] = useState(textForBasics);

    useEffect(() => {
        // // Code to collapse menu
        // let navbarSupportedContent = document.getElementById('navbarSupportedContent')
        // navbarSupportedContent.style.display = 'flex'
    }, [])

    //  MUTATION
    const [exerciseLogCreate] = useMutation(EXERCISE_LOG_CREATE);

    //  QUERY
    // const { data, loading, error } = useQuery(EXTRACT_EXERCISE_LOGS);
 
    const onTopicSelect = () => {
        let BreakdownTopicSelect = document.getElementById('BreakdownTopicSelect')
        let chosenTopic = BreakdownTopicSelect.value
        switch (chosenTopic) {

            case 'Basics':
                let textForBasics = [`Breakdown: You learn how to use the app, what it does, and the most valuable fitness insights`,
                <br/>,
                'Calculator: You calculate how much of each of the Macros you need and Why.  Without studies and research, it\'s hard to reasonably act',
                <br/>,
                'Gains: You do the most important thing: track your gains after Inputing them.',
                <br/>,
                'Input:  As you workout and hit PRs(personal records), you record them here.  This dynamically updates your gains chart'];
                setTopicText(textForBasics)                 
            break;

            case 'How_uTrain':
                let textForHow_uTrain = ['1.  Twice a week with an alternate strategy each workout is ideal, with only 3-5 sets targeting each muscle group.  On one day, go heavy, with 3-5 sets of 3-5 reps to failure.  On the other do more reps.  This targets both cellular pathways the muscle grows by.  One being mitochondria (reps) and the other being actual actin/myosin (heavy) fibers.',
                <br/>,
                '2.  Worrying about which exercise to hit is the least important factor.  You can grow a fully developed chest with just bench press for example.  Do whatever leads you back into the gym, ensure it\'s fun.',
                <br/>,
                '3.  It is best to get quality food, specifically, the amino acid composition is better and you\'re not missing any.  For example, Pea protein for example lacks key aminos.  This is the very least important factor though.',
                <br/>,
                '4.  Only a bodybuilder on steroids finds doing one muscle, once a week works the best.  That\'s because he can tear down the muscle tissue more.'];
                setTopicText(textForHow_uTrain) 
                break;

            case 'How_youEat':
                let textForHowYouEat = ['1.  It almost doesn\'t when you get your macros in.  Your body can only ingest somewhere around 50 grams of protein at a time, and so two or more meals is a minimum.',
                <br/>,
                '2.  It is better to get this protein in through three meals rather than six.  Why?  Leucine, an amino acid, partially mediates protein synthesis, or how much goes in to your muscles.  The spiking capacities of this amino reset every 4-6 hours.',
                <br/>,
                '3.  It is best to get quality food, specifically, the amino acid composition is better and you\'re not missing any.  For example, Pea protein for example lacks key aminos.  This is the very least important factor though.',
                <br/>,
                '4.  Get fiber (insoluble too).  This keep you not hungry.  Carbs on the other hand, make you feel hungry about 3-5 hours later.  This is why you don\'t feel hungry when fasting.'];
                
                setTopicText(textForHowYouEat) 
                break;

            case 'Good_Pointers':
                let textForGoodPointers = ['1.  Varirety of exercises for a given muscle group is beneficial, but you can absolutely, even as a bodybuilder produce gains from the same thing, like bench press.  Find the one you like the best.',
                <br/>,
                '2.  *Studies have shown that its not the last rep that produces gains.  You can lift the same volume, but stop 3 reps away from failure and still produce the exact same benefit as someone does a few more reps but with less total sets.',
                <br/>,
                '3.  Alternate hypertrophy, of bodybuilding like workouts, with powerlifting workouts.  Twice a week is ideal, where one day you do 5 sets of 3 reps to failure, and another with 5 sets of 10-15 reps.  This targets both cellular mechanisms a muscle grows by.'];
                setTopicText(textForGoodPointers) 
                break;

            case 'How_I_Do_It':

                let textForHowIDoIt = ['1.  I don\'t like going to a gym, it takes too long to commute.',
                <br/>,
                '2.  I do it entirely from home, with literally only 2 dumbells.',
                <br/>,
                '3.  I hit every muscle group, and do it every other day for 3 sets max on whatever muscle.',
                <br/>,
                '4.  This produces bigger gains than anything I have ever tried : )'
            ];

                setTopicText(textForHowIDoIt) 
                break;
        }
    }

    const updateUserName = () => {
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: 'Richard E. Pitts'
        })
    }


    return (
    <React.Fragment>
<div className={isPhone ? "BreakdownsParentContainer" : "BreakdownsParentContainerD"}>
    {/* <p id='breakdownTitle' className="breakdownTitle">{headerPrompt}</p> */}

    <div id='BreakdownTopicSelectionParentContainer' className={isPhone ? 'BreakdownTopicSelectionParentContainerPhone' : 'BreakdownTopicSelectionParentContainer'}>
        <div className='BreakdownTopicSelectionContainer'>
                    <div className={isPhone ? 'BreakdownTopicSelectContainerPhone' : 'BreakdownTopicSelectContainer'}>
                    {/* <div className={isPhone ? 'BreakdownTopicSelectContainerMobile' : 'BreakdownTopicSelectContainer'}> */}
                        <select onChange={() => onTopicSelect()} id={`BreakdownTopicSelect`}>
                            <option value="Basics">Basics of uTrain</option>
                            <option value="How_uTrain">How uTrain</option> 
                            <option value="How_youEat">How you Eat</option>
                            <option value="Good_Pointers">Good Pointers</option>
                            <option value="How_I_Do_It">How I Do It</option> 
                        </select>
                    </div>
                </div>
        </div>
        <div className={isPhone ? 'BreakdownWhiteboardContainerPhone' : 'BreakdownWhiteboardContainer'}>
            <div className='BreakdownTextContainerPhone'>
                <div className='BreakdownTextPhone'>
                    {topicText}
                </div>
                
                </div>
        </div>
            <div className={isPhone ? 'BreakdownManContainerPhone' : 'BreakdownManContainer'}>
                    <img className={isPhone ? 'BreakdownManImgP' : 'BreakdownManImgD'} alt='' src={BreakdownMan} />
                </div>
            </div>

    </React.Fragment>
    );
}


export default Breakdown;

