import styled from 'styled-components';

export const Fake = styled.div`
    background-color:#DDD;
    height:${props=>props.height || 20}px;
`;

export const PageArea = styled.div`

display:flex;
margin: 20px;

.box {
    background-color: #FFF;
    border-radius: 5px;
    box-shadow:0px 0px 4px #999;
    margin-bottom: 20px;
}
.box--padding {
    padding: 10px;
}
.leftSide {
    flex:1;
    margin-right:20px;

    .box {
        display:flex;
    }

    .adImage {
        width:320px;
        height:320px;
        margin-right:20px;

        .each-slide img {
            display:flex;
            align-items:center;
            justify-content:center;
            background-size:cover;
            height:320px;
        }

        
    }

    .adInfo { 
        flex:1;
        color:#063141;

        .adName {
            margin-bottom:20px;

            h2 {
                margin: 20px 0 0 0;
            }

            small {
                color:#2b5969;
            }
        }
        .adIDescription {
            small {
                color:#2b5969;
            }
        }
    }
}
.rightSide {
    width: 250px;
    .price {
        color:#2b5969;
    }
    .price span {
    color: #1646e4;
    display:block;
    font-size:27px;
    font-weight:bold;
    }

    .contactSellerLink {
        background-color:#1646e4;
        color:#FFF;
        height:30px;
        border-radius:5px;
        box-shadow:0px 0px04px #999;
        display:flex;
        justify-content:center;
        align-items:center;
        text-decoration:none;
        margin-bottom:20px;
    }

    .createdBy small {
        display:block;
        color:#2b5969;
        margin-top:10px;
    }

}


`;

export const OthersArea = styled.div`

    h2 {
        font-size:20px;
        color:#2b5969;
    }

    .list {
        display:flex;

        .adItem {
            flex-wrap: wrap;
            width:25%;
        }
    }
`;

export const BreadChumb = styled.div`
    font-size:15px;
    margin-top:20px;
    color:#2b5969;

    a {
        display:inline-block;
        margin: 0px 5px;
        text-decoration:underline;
    }

`;