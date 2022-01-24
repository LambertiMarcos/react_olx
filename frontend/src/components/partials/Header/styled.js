import styled from 'styled-components';

export const HeaderArea = styled.div`

background-color: #FFF;
border-bottom: solid 1px #999;
padding-bottom: 1rem;

.container {
    max-width:1000px;
    margin: auto;
    display:flex;
    }

a {
    text-decoration:none;
}

.logo {
    flex:1;
    display:flex;
    align-items:center;
    height:60px;

    .logo1,.logo2,.logo3 {
        font-size:27px;
        font-Weight:bold;
    }
    .logo1 { color:#FF0000; }
    .logo2 { color:#00FF00; }
    .logo3 { color:#0000FF; }
    }

nav {
    padding:10px 0;

    ul, li {
        margin:0;
        padding:0;
        list-style:none;
    }

    ul {
        display:flex;
        align-items:center;
        height:40px;   
    }
    li {
        margin: 0 20px;   

    a, button {
        border:0;
        background:none;
        cursor:point;
        outline:0;
        color:#000;
        font-size:14px;
        text-decoration:none;

        &:hover {
            color:#777;
        }

        &.button {
            background-color:#FF8100;
            border-radius:4px;
            color:#FFF;
            padding:5px 10px;
            }
        
            &.button:hover {
                background-color:#E57706;
            }
        }
    }


}
`;