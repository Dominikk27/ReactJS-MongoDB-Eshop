export const productDetailSchema = {
    pila: {
        benzin: {
            "Technické parametre": [
                {key: "enginePower", label: "Výkon motora [kW]", type: "number"},
                {key: "cutSpeed", label: "Rezná Rýchlosť [m/s]", type: "number"},
                {key: "maxRotation", label: "Max. otáčky [ot/min]", type: "number"},
                
                {key: "weight", label: "Hmotnosť [kg]", type: "number"},
                {key: "oilCap", label: "Objem nádrže Olej [l]", type: "number"},
                {key: "fuelCap", label: "Objem nádrže Palivo [l]", type: "number"},
                
                {key: "mixOilFuel", label: "Pomer Miešania Palivovej zmesi", type: "text"},
                {key: "chainDiv", label: "Delenie reťaze", type: "text"},
                {key: "size", label: "Rozmer píly", type: "text"},

                {key: "waranty", label: "Záruka [rokov]", type: "number"},
            ],
        },
        
        aku: {
            "Technické parametre": [
                {key: "voltage", label: "Napätie [V]", type: "number"},
                {key: "cutSpeed", label: "Rezná Rýchlosť [m/s]", type: "number"},
                {key: "oilCap", label: "Objem nádrže Olej [l]", type: "number"},
                {key: "maxWorkTime", label: "Dĺžka prevádzky [min]", type: "number"},

                {key: "weight", label: "Hmotnosť [kg]", type: "number"},
                {key: "chainDiv", label: "Delenie reťaze", type: "text"},
                {key: "size", label: "Rozmer píly [cm]", type: "text"},

                {key: "waranty", label: "Záruka [rokov]", type: "number"},
            ],
        },

        elektro: {
            "Technické parametre": [
                {key: "voltage", label: "Napätie [V/Hz]", type: "number"},
                {key: "fuses", label: "Potrebné istenie [A]", type: "number"},
                {key: "cutSpeed", label: "Rezná Rýchlosť [m/s]", type: "number"},
                {key: "oilCap", label: "Objem nádrže Olej [l]", type: "number"},

                {key: "weight", label: "Hmotnosť [kg]", type: "number"},
                {key: "chainDiv", label: "Delenie reťaze", type: "text"},
                {key: "size", label: "Rozmer píly [cm]", type: "text"},

                {key: "waranty", label: "Záruka [rokov]", type: "number"},
            ],
        },
    }
}