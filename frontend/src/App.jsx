import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi, adress } from './config';
import { getTodos } from './services/todoServices';
import { Todos } from './components/Todos';
import { CreateTodo } from './components/CreateTodo';

if (!window.ethereum) {
  alert('Please connect Web3 wallet');
}

function App() {
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (readContract && writeContract) return;

    const contractSetup = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const read = new ethers.Contract(adress, abi, provider);

      const signer = await provider.getSigner();
      const write = new ethers.Contract(adress, abi, signer);

      setReadContract(read);
      setWriteContract(write);
    };

    contractSetup();
  }, [readContract, writeContract]);

  // get todos id
  const getTodosFromChain = async () => {
    const todos = await getTodos(readContract);
    setTodos(todos);
  };
  return (
    <>
      <section className='box'>
        <header>
          <h1>BlockMissions</h1>
        </header>
        <Todos
          todos={todos}
          getTodos={getTodosFromChain}
          writeContract={writeContract}
        />
        <CreateTodo
          getTodos={getTodosFromChain}
          writeContract={writeContract}
        />
        <button onClick={getTodosFromChain}>{'Get missions from chain'}</button>
      </section>
    </>
  );
}

export default App;
