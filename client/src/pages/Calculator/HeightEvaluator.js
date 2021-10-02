import React from 'react';

export const HeightEvaluator = (MacroInput, HeightInput) => {
    if (HeightInput === 'Short') { 
        return MacroInput * 1.1
    }
    if (HeightInput === 'Average') { 
        return MacroInput * 1
    }
    if (HeightInput === 'Tall') { 
        return MacroInput * .98
    }
    if (HeightInput === 'Very_Tall') { 
        return MacroInput * .96
    }
}
