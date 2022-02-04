
import React, { useState, useEffect } from 'react';
import { SearchArea, PageArea } from './styled';
import useApi from '../../helpers/OLXApi';
import { Link } from 'react-router-dom';

import { PageContainer} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useApi();

    const [stateListLoc, setStateListLoc] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ adList, setAdList] = useState([]);


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

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'asc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
        <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O quê você procura?" />
                            <select name="state">
                                <option></option>
                                {stateListLoc.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>   
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div> 
                </PageContainer>
        </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i, k) => 
                            <AdItem key={i} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver Todos</Link>

                    <hr/>

                    Lorem Ipsum is simply  dummy text of the printing.
                </PageArea>
            </PageContainer>
        </>


    );
}

export default Page;