import React from 'react';




export const Button: React.FC<{text: string,on_click: () => void}> = ({text,on_click}) => {
    return <button onClick={() => { 
        on_click();
    }}>{ text}</button>
}