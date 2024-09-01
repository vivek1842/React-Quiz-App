import { useRef, useState } from 'react';
import './index.css'
import { data } from './data';

const Quiz = () => {
    let [index, setIndex] = useState(0);    //to set index of quetion
    let [quetion, setQuetion] = useState(data[index]);  //to set quetion of that particular index
    let [lock, setLock] = useState(false); //lock the option when option is selected
    let [score, setScore] = useState(0); //to store score of user
    let [result, setResult] =useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let options_array = [option1,option2,option3,option4];

    const checkAnswer = (e, ans) =>{
        if(lock === false) {
            if(quetion.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);  //other options now can't be selected
                // setScore(prev => prev+1);
                setScore(++score);
            } else {
                e.target.classList.add("wrong");
                setLock(true); //other options now can't be selected
                options_array[quetion.ans-1].current.classList.add("correct"); //quetion.ans will give correct option number but arrays start from 0 so in array correct option is situated at que.ans-1
            }
        }
    }

    const next = () =>{
        if(lock) {
            if(index === data.length - 1){
                setResult(true);
                return 0; //nothing will execute after this
            }
            setIndex(++index);
            setQuetion(data[index]); //to update new que from updated index
            setLock(false); //to access options
            options_array.map((option) => { //to remove all classes of options array we need go through all array and remove it
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuetion(data[0]);
        setLock(false);
        setResult(false);
        setScore(0);
    }

    return(
        <div className='container'>
        <h1>Quiz App</h1> 
        <hr />
        {/* {result?<></>:<></>} Ternary operator - condtion?true:false */}
        {result?<></>:<>

        <h2>{index+1}. {quetion.que}</h2>  {/* array starts from zero so to get right index we add +1 to it */}
        <ul>
            <li ref={option1} onClick={(e) => {checkAnswer(e,1)}}>{quetion.option1}</li>
            <li ref={option2} onClick={(e) => {checkAnswer(e,2)}}>{quetion.option2}</li>
            <li ref={option3} onClick={(e) => {checkAnswer(e,3)}}>{quetion.option3}</li>
            <li ref={option4} onClick={(e) => {checkAnswer(e,4)}}>{quetion.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {data.length} quetions</div>
        </>}
        {result?
        <>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
        </>:<></>}
        </div>
    );
}

export default Quiz;

/*
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        <h2>1. Which lang you prefer?</h2>
        <ul>
            <li>Java</li>
            <li>Python</li>
            <li>JS</li>
            <li>CPP</li>
        </ul>
        <button>Next</button>
        <div className="index">1 of 5 quetions</div>
    </div>
*/