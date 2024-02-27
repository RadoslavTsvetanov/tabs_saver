import React from 'react';




export const Button: React.FC<{text: string,on_click: () => void}> = ({text,on_click}) => {
    return <button className='className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"' onClick={() => { 
        on_click();
    }}>{ text}</button>
}