import React, { useState } from 'react';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer'
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import { useRouter } from 'next/router';
import db from '../db.json';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  
  return(
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        
        <Widget>
          <Widget.Header>
            <h1>Programing</h1>
          </Widget.Header> 
          <Widget.Content>
            <form onSubmit={function (infoDoEvento) {
              infoDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input onChange={(infosDoEvento) => {
                setName(infosDoEvento.target.value) 
              }} 
              placeholder="Nome"
              value={name}/>
              <Button type="submit" disabled={!name}>Jogar</Button><br/>
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
      <p style={{textAlign:"center", color: "yellow", position: "absolute", bottom: 0, width: "100%", fontSize: 20}}>Work in progress</p>
    </QuizBackground>
  ); 
}
