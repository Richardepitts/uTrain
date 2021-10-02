import React from 'react';

export const SexEvaluator = (MacroInput, SexInput) => {
    if (SexInput === 'male') { 
        return MacroInput * 1.04
    }
    if (SexInput === 'female') { 
        return MacroInput * .7
    }
}
