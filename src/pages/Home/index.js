import React, {useState} from 'react';
import axios from 'axios'; // ./ significa q eh arquivo no diretorio. sem é pacote no node modules
import * as S from './styled';
import { useHistory } from 'react-router-dom';

//props é um objeto com os parametros
const objeto = {
  nome: "nome",
  idade: 10
}

const {nome, idade} = objeto

function Home(/*props desestruturado->*/{title, id}) {
  //recebe o valor desestruturado
  const [usuario, setUsuario] = useState('')
  const [contador, setContador] = useState(0)
  const [erro, setErro] = useState(false);

  const history = useHistory();

  function soma() {
    setContador(contador+1)
  }

  function handleChange(e) {
    //console.log(e.target.value)
    //console.log(e)
    setUsuario(e.target.value)
  }

  async function handleClick() {
    console.log(usuario)
    try {
      const repos = await axios.get(`https://api.github.com/users/${usuario}/repos`)
      //console.log(repos.data)
      const repositories = repos.data;
      const repositoriesName = [];
      
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });

      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
    } catch (err) {
      console.log(err);
      setErro(true);
    }
  }

  return (
    // tag sem nada: fragment
    // value pegando o valor do estado de usuario = controled components
    <>
    <S.HomeContainer>
      <S.Content>
        <h1>{title}</h1>
        <S.Input placeholder="Usuário" name="usuario" id="usuario" className="usuarioInput" onChange={handleChange} value={usuario}/>
        <S.Button type="button" onClick={handleClick}> Pesquisar </S.Button>
      </S.Content>
        {erro ? <S.ErrorMessage>usuário não encontrado</S.ErrorMessage>: ''}
    </S.HomeContainer>
      <div>
        <span style={{marginRight: 10}}>teste de estados - o valor do contador é: {contador}</span>  
        <button type="button" onClick={soma}> somar contador </button>
      </div>
    </>
  );
}

export default Home; 

/* Use State retorna um array
  com valor do estado e uma função para alterar
  [usuario, setUsuario]

 */