import styled from 'styled-components';

export const QuizContainer = styled.div`
  border-radius: 5px;
  padding: 20px;
  background-color: #00000050;
  width: 100%;
  max-width: 350px;
  margin: 25px 10%;
  @media screen and (max-width: 500px) {
    margin: 10% auto;
    padding: 15px;
  }
`;

export default QuizContainer;