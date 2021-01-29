import styled from 'styled-components';

export const QuizContainer = styled.div`
  border-radius: 5px;
  padding: 20px;
  background-color: #00000070;;
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: 50px 10%;
  @media screen and (max-width: 500px) {
    margin: 25% auto;
    padding: 15px;
  }
`;

export default QuizContainer;