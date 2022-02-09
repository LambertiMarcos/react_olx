
import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OLXApi';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageContainer} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

let timer;

const Page = () => {
    const api = useApi();
    const navigate = useNavigate();

    // retorna o item "categoria" da queryString depois da "?"
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();
    //alert( query.get('cat'));

    // criação da states
    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');

    const [stateListLoc, setStateListLoc] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ adList, setAdList] = useState([]);
    
    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Função para criar a requisição
    const getAdsList = async () => {
        setLoading(true);
        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state
        });
        setAdList(json.ads);
        setResultOpacity(1);
        setLoading(false);
    }



    // monitora a mudança da url de Ads
    useEffect(() => {
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`)
        }
        if (cat) {
            queryString.push(`cat=${cat}`)
        }
        if (state) {
            queryString.push(`state=${state}`)
        }
        navigate(`?${queryString.join('&')}`,{replace:true});

        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1500);
        setResultOpacity(0.3);
    },[q, cat, state]);


    useEffect(() => {
        const getStatesLoc = async () => {
            const slist = await api.getStatesLoc();
            setStateListLoc(slist);
        }
        getStatesLoc();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

/*
    useEffect(() => {  
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);
*/

    return (
        <PageContainer>
            <PageArea>
                <div className="left-side">
                    <form method="GET">
                        <input 
                            type="text" 
                            name="q" 
                            placeholder="O que voce procura?"
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado :</div>
                        <select name="state" value={state} onChange={e => setState(e.target.value)}>
                            <option></option>
                            {stateListLoc.map((i, k) =>
                                <option key={k} value={i._id}>{i.name}</option>
                            )}
                        </select>
                        <div className="filterName">Categoria :</div>
                        <ul>
                            {categories.map((i, k)=>
                                <li key={k} className={cat===i.slug ? 'categoryItem active' : 'categoryItem'}
                                onClick={e => setCat(i.slug)}
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}   
                        </ul>
                    </form>
                </div>
                <div className="right-side">
                    <h2>Resultado da pesquisa:</h2>

                    {loading &&             
                    <div className="listWarning">Carregando..</div>
                    }
                    {!loading && adList.length ===0 &&
                        <div className="listWarning">Nenhum resultado encontrado!</div>
                    }
                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map((i,k)=>
                        <AdItem key={k} data={i} />  
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;