import styled from 'styled-components';

export const Cursive = styled.span`
    font-style: italic;
`;

export const Bold = styled.span`
    font-weight: bold;
`;

export const Flexed = styled.div`
    display: flex;    
    ${props => props.direction ? `flex-direction: ${props.direction};` : ''}
    ${props => props.halign ? `justify-content: ${props.halign};` : ''}
    ${props => props.valign ? `align-items: ${props.valign};` : ''}
    ${props => props.height ? `height: ${props.height};`: ''}
`;

export const Margined = styled.div`
    ${props => props.margins ? `margins: ${props.margins}` : ''}
    ${props => props.left ? `margin-left: ${props.left}` : ''}
    ${props => props.right ? `margin-right: ${props.right}` : ''}
    ${props => props.top ? `margin-top: ${props.top}` : ''}
    ${props => props.bottom ? `margin-bottom: ${props.bottom}` : ''}
`;

export const Clickable = styled.span`
    &:hover {
        cursor: pointer;
    }
`;