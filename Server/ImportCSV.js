import fs from "fs";
import csv from "csv-parser";

export function ImportCSV(fileName) {

    const dataRows=[];
    // read file and insert dayta into the list
    fs.createReadStream(fileName)
    .pipe(csv())
    .on("data",(data)=>{
        //insert as dictionary
        dataRows.push({
            REF_DATE:data["REF_DATE"],
            RentalUnitType:data["Rental unit type"],
            VALUE: data["VALUE"]
        })
    }).on("end",async ()=>{        
        console.log(`Insetered ${dataRows.length} records`);
        return dataRows
    })
}