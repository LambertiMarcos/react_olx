

import React ,{ useState } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OLXApi';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';


const Page = () => {
    const api = useApi();

// Criação dos states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError ] = useState('');

    //faz a consulta de login
    const handleSubmit = async (e)=>{
    // Não envia as informações do formulário 
        e.preventDefault();
        setDisabled(true);
        setError('');

    // Usa a função do OLXApi
        const json = await api.login(email, password);

        if(json.error){
            setError(json.error);
        } else {
    // doLogin função do AuthHandler        
            doLogin(json.token, rememberPassword);//salva o cookie
            window.location.href = '/'; //atualiza a página logado
        }
        setDisabled(false);
    }


    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}> 
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
                            onChange={e => setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>                  

                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="">
                            <input type="checkbox" 
                            disabled={disabled}
                            checked={rememberPassword}
                            onChange={() => setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>   
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;