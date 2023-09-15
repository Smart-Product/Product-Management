import styled from 'styled-components';

export const ProductFormContainer = styled.form`

    
    display: block;
    justify-content: center;
    gap: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;

    textarea {
        width: 480px;
        border-radius: 5px;
        resize: none;
        padding-left: 10px;
        font-family: 'Ubuntu', 'sans-serif';
    }
`

export const ColumnWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem 0;
    gap: 1rem;
    width: 50%; /* Each column takes up 50% of the available width */
`;
