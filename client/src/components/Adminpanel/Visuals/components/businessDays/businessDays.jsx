import React, { useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form';

import "./businessDays.css";
import "./slider.css";

  const DAYS = ["Pondelok", "Útorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"];

const WorkingDays = () => {
  const defaultValues = useMemo(() => ({
    days: DAYS.map(() => ({
      enabled: false,
      openTime: '',
      closeTime: ''
    }))
  }),[]);

  const methods = useForm({ defaultValues });
  const { register, watch, reset, handleSubmit, formState } = methods;
  const watchedDays = watch("days");

  const isDirty = formState.isDirty; // check dirty form data next state - current State

  //console.log("Watched days: ", watchedDays);
  //console.log("Default days: ", defaultValues);

  

  const onSubmit = data => {
    reset(data);
  }

  const onCancel = () => {
    reset();
  }


  return (
    <FormProvider {...methods}>
      <form className="workingDaysBox" onSubmit={handleSubmit(onSubmit)}>
        <h4 className='categoryName'>Pracovné dni</h4>
        <div className="workingDaysContent">
          {DAYS.map((day, index) => (
              <div className="daySetupContainer" key={day}>
                  <div className="dayRow">
                      <p className='dayName'>{day}</p>
                      <label className="switch">
                          <input type="checkbox"
                            {...register(`days.${index}.enabled`)}
                          />
                          <span className="slider"></span>
                      </label>
                  </div>
                  <div className="timeInputContainer">
                    <label htmlFor={`openTime-${index}`} className='timeLabel'>Od:</label>
                      <input type="time" 
                        name="openTime" 
                        id={`openTime-${index}`} 
                        {...register(`days.${index}.openTime`)}
                        disabled={!watchedDays[index]?.enabled}
                        placeholder='Pracovná doba od'/>
                    <label htmlFor={`closeTime-${index}`} className='timeLabel'>Do:</label>
                      <input type="time" 
                        name="closeTime" 
                        id={`closeTime-${index}`} 
                        {...register(`days.${index}.closeTime`)}
                        disabled={!watchedDays[index]?.enabled} 
                        placeholder='Pracovná doba do'/>
                  </div>
              </div>
          ))}
        </div>
        {isDirty && (
          <div className="ap_ActionButtonsBox">
            <button className="cancelChangesBTN BTN" type="button" onClick={() => onCancel()}>
                Cancel Changes
            </button>
            <button className="submitChangesBTN BTN" type="submit">
                Submit Changes
            </button>
        </div>
        )}
      </form>
    </FormProvider>
  );
};

export default WorkingDays