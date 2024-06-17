import './App.css'
import styled, { css } from 'styled-components'

function App() {
  const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
  `;

  return (
    <>
      <h1>HOLA</h1>
      <Button>Normal Button</Button>
    </>
  )
} 

export default App
