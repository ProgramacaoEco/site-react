import React, { useEffect } from 'react';
import { UseEffect } from 'react';

function Title(){
    useEffect(() => {
        document.title = "Eco Sistemas e Soluções";
    }, []);
}

export default Title;