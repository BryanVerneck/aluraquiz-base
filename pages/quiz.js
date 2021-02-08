import React from 'react';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import db from '../db.json';

function LoadingWidget(){
    return(
        <Widget>
            <Widget.Header>Carregando...</Widget.Header>
            <Widget.Content>
                [Desafio do loading]
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit }){
    const questionId = `question__${questionIndex}`
    return(
        <Widget>
            <Widget.Header>
            {/* <BackLinkArrow href="/" /> */}
                <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
            </Widget.Header>

            <img style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <form
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        onSubmit();
                    }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return(
                            <Widget.Topic as="label"
                                htmlFor={alternativeId}>
                                <input 
                                    // style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"/>
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <Button>
                        Confirmar
                    </Button>
                </form>
            </Widget.Content>
        </Widget>  
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
}

export default function Quiz(){
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const totalQuestions = db.questions.length;
    const question = db.questions[questionIndex]; 

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000)
        
    }, [])

    function handleSubmitQuiz(){
        const nextQuestion = currentQuestion + 1
        if(nextQuestion < totalQuestions){
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        } 
    }

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer style={{backgroundColor: "transparent"}}>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget question={question} 
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                    onSubmit={handleSubmitQuiz}/>
                )}

                {screenState === screenStates.LOADING && <LoadingWidget/>}

                {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}

            </QuizContainer>
        </QuizBackground>
    )
}
