import React, { useState, useContext } from 'react';
import { useQuery, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import './Calendar.css';

const Calendar = () => {
 
  return (
    <div className="CalendarParentContainer">
      <div className="CalendarContentContainer">
            <p>This is the Calendar</p>
         </div>
    </div>
  );
};

export default Calendar;
