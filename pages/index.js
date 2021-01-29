import React, { useState } from 'react';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  
  return(
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1>Programing</h1>
          </Widget.Header> 
          <Widget.Content>
            <form onSubmit={function (infoDoEvento) {
              infoDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <input onChange={function(infosDoEvento){
                setName(infosDoEvento.target.value);
              }} 
              placeholder="Nome"></input>
              <button type="submit" disabled={!name}>Jogar</button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>Turning code into coffee...</p>
          </Widget.Content>
        </Widget>
        <Footer/>
        <GitHubCorner projectUrl="https://github.com/bryanverneck"/>
      </QuizContainer>
    </QuizBackground>
  ); 
}
