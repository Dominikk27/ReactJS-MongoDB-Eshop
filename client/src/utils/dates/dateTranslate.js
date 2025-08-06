export const DAYS_NAME = ["Pondelok", "Útorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"];

export const DAYS_TRANSLATE = {
    "Pondelok": "Monday", 
    "Útorok": "Tuesday", 
    "Streda": "Wednesday", 
    "Štvrtok": "Thursday", 
    "Piatok": "Friday", 
    "Sobota": "Saturday", 
    "Nedeľa": "Sunday"
}

export const TranslateDay = (EN) => {
    console.log("recieved DAY: ", EN);
    return DAYS_TRANSLATE[EN] || EN
}