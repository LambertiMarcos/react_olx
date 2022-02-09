import styled from 'styled-components';

export const PageArea = styled.div`

display:flex;
margin-top:30px;

.left-side {
    width:250px;
    margin-right: 10px;
    
    .filterName{
        font-size:16px;
        margin-top:10px;
        
    }

    input, select{
        width:100%;
        height:40px;
        border:2px solid #9BB83C;
        border-radius:5px;
        outline:0;
        font-size:15px;
        color: #000;
        padding:10px;
    }

    ul, li {
        margin:0;
        padding:0;
        list-style:none;
    }

    .categoryItem {
        display:flex;
        align-items:center;
        padding:10px;
        border-radius:5px;
        color:#000;
        cursor:pointer;
    }

    .categoryItem:hover,
    .categoryItem.active {
        background-color: #9BB83C;
        color:#fff;
        
        img {
        width:30px;
        height:30px;
        margin-right: 5px;
        }

        span {
        font-size:16px;
        }
    }
    

    img {
        width:25px;
        height:25px;
        margin-right: 5px;
    }

    span {
        font-size:14px;
    }


}

.right-side {
    flex: 1;
    
    h2 {
        margin: 0px 0px 10px 15px;
        font-size:18;
        color:#999;
    }

    .listWarning {
        padding:50px;
        text-align:center;
        font-size:20px;
        color: #999;
    }

    .list {
        display:flex;
        flex-wrap:wrap;

        .adItem {
            width:33%;
        }
    }
}
`;