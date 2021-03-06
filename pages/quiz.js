import React from 'react';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from "../src/components/AlternativesForm";
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import db from '../db.json';

function ResultWidget({ results }){
    return(
        <Widget>
            <Widget.Header>Resultados</Widget.Header>
            <Widget.Content>
                Você acertou
                {' '}
                {/* {results.reduce((somatorioAtual, resultAtual) => {
                    const isAcerto = resultAtual == true;
                    if(isAcerto){
                        return somatorioAtual + 1
                    }
                    return somatorioAtual;
                }, 0)} */}
                {results.filter((x) => x).length}
                {' '}
                perguntas
                <ul>
                    {results.map((result, index) => (
                        <li>
                            {index + 1} {' '} Resultado: {result === true ? 'Acertou' : 'Errou'}
                        </li>
                    ))}
                    
                </ul>
            </Widget.Content>
        </Widget>
    )
}

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

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, addResult }){
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer;
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const hasAlternativeSelected = selectedAlternative !== undefined;

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

                <AlternativesForm
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                          addResult(isCorrect);
                          onSubmit();
                          setIsQuestionSubmited(false);
                          setSelectedAlternative(undefined);
                        }, 3 * 1000);
                      }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;                   
                        return(
                            <Widget.Topic as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}>
                                <input
                                    style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    type="radio"/>
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>
                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
                </AlternativesForm>
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
    const [results, setResults] = React.useState([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const totalQuestions = db.questions.length;
    const question = db.questions[questionIndex]; 

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

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
                    onSubmit={handleSubmitQuiz}
                    addResult={addResult}/>
                )}

                {screenState === screenStates.LOADING && <LoadingWidget/>}

                {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
                <GitHubCorner projectUrl="https://github.com/bryanverneck"/>
            </QuizContainer>
            <p style={{textAlign:"center", color: "yellow", position: "absolute", bottom: 0, width: "100%", fontSize: 20}}>Work in progress</p>
        </QuizBackground>
    )
}
