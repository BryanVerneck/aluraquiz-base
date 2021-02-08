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

function QuestionWidget({ question, questionIndex, totalQuestions }){
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

                <form>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return(
                            <label htmlFor={alternativeId}>
                                {alternative}
                                <input id={alternativeId}
                                type="radio"/>
                            </label>
                        );
                    })}
                </form>

                <Button>
                    Confirmar
                </Button>
            </Widget.Content>
        </Widget>  
    )
}

export default function Quiz(){
    const questionIndex = 0;
    const totalQuestions = db.questions.length;
    const question = db.questions[questionIndex]; 

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuestionWidget question={question} 
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}/>
                <LoadingWidget/>  
            </QuizContainer>
        </QuizBackground>
    )
}