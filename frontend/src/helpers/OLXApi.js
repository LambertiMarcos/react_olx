import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';


//REQUISIÇÃO POST
const apiFetchPost = async(endpoint, body) => {
// verificar se o token foi enviado na requisição
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
// endpoint + body
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)// objeto enviado
    });
    const json = await res.json();//resposta sempre em json

// Quando o usuário não tem autorização
    if(json.notallowed){
        window.location.href = '/signin';// envia para tele de login
        return;
    }

    return json;
}

//REQUISIÇÃO GET
const apiFetchGet = async (endpoint, body = []) => {
    // verificar se o token foi enviado na requisição
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);//npn install qs --save - transforma o objeto em query string

    const json = await res.json();
    // retorna quando o usuário não tem autorização
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

const olxAPI = {
    login: async (email, password) => {//envia 2 parâmetros
        // fazer consulta ao WB
        const json = await apiFetchPost(
            '/user/signin',
            { email, password }
        );
        return json;
    },

    register: async (name, email, password, stateLoc)=>{
        return apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
    },

    getStatesLoc: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds: async (options) => {
        const json =  await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, other=false) => {
    const json = await apiFetchGet(
        '/ad/item',
        {id, other}
    );
    return json;
    }
};


// cria a função que retorna um objeto
// eslint-disable-next-line import/no-anonymous-default-export
export default () => olxAPI;
