

import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OLXApi';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';


const Page = () => {
    const api = useApi();

    // Criação dos states
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [stateListLoc, setStateListLoc] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getStatesLoc = async () =>{
            const slist = await api.getStatesLoc();
            setStateListLoc(slist);
        }
        getStatesLoc();
    }, [api]);

    //faz a consulta de login
    const handleSubmit = async (e) => {
        // Não envia as informações do formulário 
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword){
            setError('As senhas devem ser iguais!');
            setDisabled(false);
            return;
        }
        // Usa a função do OLXApi
        const json = await api.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
            
        } else {
            // doLogin função do AuthHandler        
            doLogin(json.token);//salva o cookie
            window.location.href = '/'; //atualiza a página logado
        }
        
        setDisabled(false);
    }


    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select 
                            value={stateLoc}
                            onChange={e =>setStateLoc(e.target.value)}
                            required
                            >
                            <option></option>
                            {stateListLoc.map ((i, k) =>
                            <option key={k} value={i._id}>{i.name}</option>
                            )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password"
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;