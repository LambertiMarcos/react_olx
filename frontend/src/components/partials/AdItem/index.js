import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Preço negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }


    return (
        <Item className="adItem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div clasName="itemName">{props.data.title}</div>
                <div clasName="itemPrice">R$:{price}</div>
            </Link>
        </Item>
    );
}