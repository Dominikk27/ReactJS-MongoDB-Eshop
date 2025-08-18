import React, { useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form';

import config from '../../../../../utils/config.js';

import {TranslateDay, DAYS_NAME} from '../../../../../utils/dates/dateTranslate.js';

import "./businessDays.css";
import "./slider.css";

//const DAYS = ["Pondelok", "Útorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"];

const WorkingDays = () => {

  const businessDaysMethods = useForm({
    defaultValues: {
      days: DAYS_NAME.map(() => ({
        enabled: false,
        openTime: '',
        closeTime: ''
      }))
    }
  })

  const { register, watch, reset, handleSubmit, formState } = businessDaysMethods;
  const watchedDays = watch("days");
  const isDirty = formState.isDirty; // check dirty form data (next State - current State) = COMPARE!

  useEffect(() =>{
    const getBusinessDays = async () =>{
      try{
        const res = await fetch(`${config.API_URL}/adminpanel/businessDays/getBusinessDays`, {
          method: "GET",
          credentials: "include"
        });

        if (!res.ok){
          throw new Error(`Failed to fetch business days data ${res.status}`);
        }
        const data = await res.json();

        if(!data){
          console.error("Failed to get business data!");
          return;
        }

        const convertedDays = DAYS_NAME.map((SK) =>{
          const ENG = TranslateDay(SK);
          const convData = data[0]?.days.find(dayData =>  dayData.day === ENG);
          return{
            enabled: convData?.isOpen || false,
            openTime: convData?.openTime || "",
            closeTime: convData?.closeTime || ""
          };
        });

        reset({days: convertedDays});

        console.log("RECIEVED DATA:", data);
        console.log("CONVERTED DATA:", convertedDays);

      }catch(e){
        console.error("Server error! failed to get business days! error: ", e);
      }
    }
    getBusinessDays();
  }, [reset]);

  const onSubmit = async(data) => {
    const payload = data.days.map((day, index) =>({
      day: TranslateDay(DAYS_NAME[index]),
      isOpen: day.enabled,
      openTime: day.openTime,
      closeTime: day.closeTime
    }));

    try{
      const res = await fetch(`${config.API_URL}/adminpanel/businessDays/updateBusinessDays`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if(!data){
        console.error("Failed to update Business days!");
        return;
      }
      console.log("Business days has been successfully updated!");
    }catch(e){
      console.error("Failed to update Business Days! error: ",e);
    }
  }

  const onCancel = () => {
    reset();
  }

  return (
    <FormProvider {...businessDaysMethods}>
      <form className="workingDaysBox" onSubmit={handleSubmit(onSubmit)}>
        <h4 className='categoryName'>Pracovné dni</h4>
        <div className="workingDaysContent">
          {DAYS_NAME.map((day, index) => (
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
                  {watchedDays[index].enabled &&
                  <div className="timeInputContainer">
                    <div className="timeField">
                      <label htmlFor={`openTime-${index}`} className='timeLabel'>Od:</label>
                      <input type="time" 
                        name="openTime" 
                        id={`openTime-${index}`} 
                        {...register(`days.${index}.openTime`)}
                        disabled={!watchedDays[index]?.enabled}
                        placeholder='Pracovná doba od'/>
                    </div>
                    <div className="timeField">
                      <label htmlFor={`closeTime-${index}`} className='timeLabel'>Do:</label>
                      <input type="time" 
                        name="closeTime" 
                        id={`closeTime-${index}`} 
                        {...register(`days.${index}.closeTime`)}
                        disabled={!watchedDays[index]?.enabled} 
                        placeholder='Pracovná doba do'/>
                    </div>
                  </div>
                  }
              </div>
          ))}
        </div>
        {isDirty && (
          <div className={`ap_ActionButtonsBox ${isDirty ? "visible" : ""}`}>
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