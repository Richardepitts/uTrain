import React from 'react';

export const ActivityLevelEvaluator = (MacroInput, ActivityLevelInput) => {
        if (ActivityLevelInput === 'Sloth') { 
            return MacroInput * .7
        }
        if (ActivityLevelInput === 'Semi_Active') { 
            return MacroInput * 1.02
        }
        if (ActivityLevelInput === 'Regular') { 
            return MacroInput * 1.2
        }
        if (ActivityLevelInput === 'Olympian') { 
            return MacroInput * 1.3
    }
}
