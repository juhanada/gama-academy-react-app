import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

//use effect monitora mudanças nas variaveis

function Repositories() {

    const history = useHistory();
    const [user, setUser] = useState('inicio');
    const [repos, setRepos] = useState([]);
    
    useEffect(() => {
        // usando if para nao executar a função quando abrir o componente
        if (user !== 'inicio')
            console.log('rodando useEffect, sem ser no inicio')
        else 
            console.log('rodando useEffect, no inicio')
        
        return () => {console.log('o componente se foi')}
    }, [user])
    // o segundo parametro sao as variaveis para monitorar (vetor de dependencias)

    // quando iniciar
    useEffect(() => {
        const repositoriesName = localStorage.getItem('repositoriesName');

        if (repositoriesName !== null){
            const repositoriesArray = JSON.parse(repositoriesName);
            setRepos(repositoriesArray); 
            localStorage.clear(); 
        } else {
            history.push('/');
        }

    }, []);

    // quando mudar o repos
    useEffect(() => {
        if (repos.length > 0){
            console.log(repos);
        }
    }, [repos]);

    return(
        <S.Container>
            <S.Title>repositórios</S.Title>
            <S.List>
                { repos.map(repo => {
                    return (
                        <S.ListItem key={repo}> {repo} </S.ListItem>
                    );   
                })}
            </S.List>
            <S.LinkHome to="/">voltar</S.LinkHome>
            <button style={{alignSelf: 'center'}} onClick={() => setUser('qualquer coisa')} > teste de use effect (verifique console) </button>
        </S.Container>

    )
}

export default Repositories