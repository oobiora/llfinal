import React, { Component } from 'react';
// import React, { useState } from 'react';
import { Zoom } from "react-awesome-reveal";
import { AuthenticateUserPage } from '../assets/auth';
import {submit} from '../assets/submithandler'


class Quiz extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0, 
            questions: [] , 
            length: '', 
            _focus: '', 
            intensity: '',
            categoryIcons: ['fas fa-clock fa-2x quiz-category-icon-class', 'fas fa-bullseye fa-2x quiz-category-icon-class', 'fas fa-dumbbell fa-2x quiz-category-icon-class'],
            questionProgressBarWidths: ['33vw', '66vw', '100vw'],
            questionTexts: ['Workout Length', 'Muscle Group', 'Intensity Level']
        }

        this.PrevQuestionHandler = this.PrevQuestionHandler.bind(this);
        this.AnswerClickHandler = this.AnswerClickHandler.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
        // this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    }

    SubmitHandler = async () => {
        let {currentQuestion, questions, length, _focus, intensity} = this.state
        
        if (length == '20 minutes'){
            length = 1;
        }
        else if (length == '30 minutes'){
            length = 2;
        }
        else if (length == '40 minutes'){
            length = 3;
        }
        else {
            length = 4;
        }

        let data = {
            focus: _focus,
            length: length,
            intensity: intensity
        }
        
        
        document.getElementById("quiz-full-container").style.display = "none";
        document.getElementById("quiz-loader").style.display = "block";
        let response = await submit(data).then(response => {this.props.history.push({
            pathname: '/results',
            state: {items : response}
        })}
        )
        // alert(`Submit Triggered with ${x}`)

    }

    PrevQuestionHandler = (event) => {
        let prevQ = this.state.currentQuestion-1 > -1 ? this.state.currentQuestion-1 : this.state.currentQuestion
        this.setState({currentQuestion: prevQ})
    }
    
    AnswerClickHandler = (event) => {
        
        this.setState({[event.target.name]: event.target.value}, () => {
            let nextQ = (this.state.currentQuestion+1 < 3 ? this.state.currentQuestion+1 : this.SubmitHandler())
            this.setState({currentQuestion: nextQ})
        })
        
        
        
        
        
        document.getElementById("quiz-progress-bar-inner").setAttribute("style", "background-color: #97c266; width:" + this.state.questionProgressBarWidths[this.state.currentQuestion]);


        // TRANSITIONS
        function fade(element) {
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.01){
                    clearInterval(timer);
                    element.style.display = 'none';
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, 1);
        }

        function hide(element) {
            element.style.opacity = '0.02'
        }
    
        function unfade(element) {
            var op = 0.01;  // initial opacity
            element.style.display = 'flex';
            var timer = setInterval(function () {
                if (op >= 1){
                    clearInterval(timer);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.06;
            }, 1);
        }
        // Transition between questions
        var fadeTarget = document.getElementById("quiz-card-holder");
        hide(fadeTarget);
        setTimeout(function() {
            unfade(fadeTarget);
        }, 200);
    }



    componentDidMount() {
        let questions = [
            {
                _id: 1,
                questionText: 'Workout Length',
                answerOptions: [
                    { answerText: '20 minutes', query: 'length'  },
                    { answerText: '30 minutes', query: 'length' },
                    { answerText: '40 minutes', query: 'length' },
                    { answerText: '60 minutes', query: 'length' }
                ]
            },
            {
                _id: 2,
                questionText: 'Workout Focus',
                answerOptions: [
                    { answerText: 'Cardio', query: '_focus' },
                    { answerText: 'Strength', query: '_focus' },
                    { answerText: 'Slim', query: '_focus' },
                    { answerText: 'Tone', query: '_focus' },
                    { answerText: 'General', query: '_focus' }
                ]
            },
            {
                _id: 3,
                questionText: 'Intensity Level',
                answerOptions: [
                    { answerText: 'Low', query: 'intensity' },
                    { answerText: 'Medium', query: 'intensity' },
                    { answerText: 'High', query: 'intensity' }
                ]
            }
            
        ];

        this.setState({questions: questions})
    }

    

   
    render() {
        if (this.state.currentQuestion != 0){
            document.getElementById("quiz-nav-back").style.opacity = "1";
            document.getElementById("quiz-nav-back").style.cursor = "pointer";
        }

        var questions = this.state.questions;

        const List = questions.map( element => (
                <React.Fragment >
                    {element.answerOptions.map((option, i) => (
                        <input key={i} value={option.answerText} type='button' className="quiz-answer-button" id="quiz-btn" name={option.query} onClick={this.AnswerClickHandler}  style={option.answerText in Object.values(this.state[option.query]) ? {textDecoration : 'underline'} : {color : 'black'} } />
                    ))}              
                </React.Fragment>   
            )
         );


    
        // const handleAnswerButtonClick = () =>  {
        //     // Transition between questions
        //     var fadeTarget = document.getElementById("quiz-card-holder");
        //     var fadeTargetIcon = document.getElementById("quiz-category-icons");
        //     fade(fadeTarget);
        //     fade(fadeTargetIcon);
        //     setTimeout(function() {
        //         unfade(fadeTarget);
        //         unfade(fadeTargetIcon);
        //     }, 200);
            
        //     //your code to be executed after 200 milliseconds with fade functions
        //     setTimeout(function() {
        //         // Progress Bar at Tp[]
        //         document.getElementById("quiz-progress-bar-inner").setAttribute("style", "background-color: #97c266; width:" + questionProgressBarCounter[this.state.currentQuestion]);
        //         // Iterate through FA icons
        //         document.getElementById("quiz-category-icons").className = categoryIcons[this.state.currentQuestion];
    
        //         // Go to next question
        //         const nextQuestion = this.state.currentQuestion + 1;
        //         if (nextQuestion < questions.length){
        //             // this.setState({ nextQuestion: this.state})
        //         } else {
        //                 document.getElementById("quiz-full-container").style.display = "none";
        //                 document.getElementById("quiz-loader").style.display = "block";
    
        //             // PUT THE SUBMIT/RESULTS FUNCTION HERE
        //         }
        //     }, 200);
        // }

         


    return (
        <div className="Quiz">
            <div className="quiz-progress-bar" id="quiz-progress-bar-outer"></div>
            <div className="quiz-progress-bar" id="quiz-progress-bar-inner"></div>
            <Zoom triggerOnce>
                <div className="container" id="quiz-full-container">


                    <div className="quiz-category-container">
                        <i className={this.state.categoryIcons[this.state.currentQuestion]} id="quiz-category-icons"></i>
                    </div>

                    <Zoom triggerOnce>
                        <div className="quiz-card-holder" id="quiz-card-holder">
                            <div className="quiz-q-and-a-container">
                                
                                <div className='quiz-question-section'>
                                    <div className='quiz-question-text'>{this.state.questionTexts[this.state.currentQuestion]}</div>
                                </div>

                                <form className='quiz-answer-section' method="" onSubmit="">
                                    
                                    {List[this.state.currentQuestion < 3 ? this.state.currentQuestion : 2]}
                                    
                                </form>
                            </div>
                        </div>
                    </Zoom>
                    
                    <div className='quiz-question-count'>
                        <span onClick={this.PrevQuestionHandler}><i class="fas fa-chevron-left" id="quiz-nav-back"></i></span>
                        <span>{this.state.currentQuestion + 1}/{questions.length}</span>
                        <i class="fas fa-chevron-right"></i>
                        {/* <span onClick={this.PrevQuestionHandler}><i class="fas fa-chevron-left"></i></span><span>{this.state.currentQuestion + 1}</span>/{questions.length}<i class="fas fa-chevron-right"></i> */}
                    </div>
                </div>
            </Zoom>

            <div className="quiz-loader" id="quiz-loader">
                <div className="quiz-loader-container">
                    <div className="quiz-loader-dot quiz-loader-dot-1"></div>
                    <div className="quiz-loader-dot quiz-loader-dot-2"></div>
                    <div className="quiz-loader-dot quiz-loader-dot-3"></div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
                    </filter>
                    </defs>
                </svg>
            </div>

        </div>
    );
    }
}

export default Quiz;