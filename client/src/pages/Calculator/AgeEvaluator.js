import React from 'react';

export const AgeEvaluator = (MacroInput, AgeInput) => {
    if (AgeInput === 'Adolescent') { 
        return MacroInput * .7
    }
    if (AgeInput === 'Young_Adult') { 
        return MacroInput * 1.01
    }
    if (AgeInput === 'Middle_Aged') { 
        return MacroInput * 1.03
    }
    if (AgeInput === 'Elderly') { 
        return MacroInput * .7
    }
}
