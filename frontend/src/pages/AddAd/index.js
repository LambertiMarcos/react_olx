
import React ,{ useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageArea } from './styled';
import useApi from '../../helpers/OLXApi';


import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';


const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const navigate = useNavigate();

// Criação dos states
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState(   );

    const [disabled, setDisabled] = useState(false);
    const [error, setError ] = useState('');

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);


    //faz a consulta de login
    const handleSubmit = async (e)=>{
    // Não envia as informações do formulário 
        e.preventDefault();
        setDisabled(true);
        setError('');
        let erros = [];

        // envio dos dados e do(s) arquivo(s) para
        if(!title.trim()){
            erros.push('Sem título')
        }

        if (!category) {
            erros.push('Sem categoria')
        }

        if(erros.length === 0){

            const fData = new FormData();
            // informações principais
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);
            // informações das imagens
            if(fileField.current.files.length > 0){
                for(let i=0;i<fileField.current.files.length;i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);
            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return;
            }else{
                setError(json.error);
            }

        }else {
            setError(erros.json("\n"));
        }
        setDisabled(false);
    }

    // objeto para definir propriedade da mascara de preço
    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    return (
        <PageContainer>
            <PageTitle>Postar um Anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}> 
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input 
                            type="text"  
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >
                            <option></option>
                            {categories && categories.map(i=>
                                <option key={i._id} value={i._id}>{i.name}</option>
                            )}
                            </select>
                        </div>
                    </label>                  

                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}//se tiver desabilitado ou price negociável ele desabilita
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Descição</div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Imagens (1 ou +)</div>
                        <div className="area--input">
                            <input
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                miltiple
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>   
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;