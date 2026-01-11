import fs from "fs";
import csv from "csv-parser";

export async function ImportCSV(fileName) {
    //do not continue until promise is fufilled
    return new Promise((resolve,reject)=>{
    const dataRows=[];
    // read file and insert dayta into the list
    fs.createReadStream(fileName)
    .pipe(csv({
          mapHeaders: ({ header }) => header.replace(/"/g, '').trim()
    }))
    .on("data",(data)=>{

        //insert as dictionary
        dataRows.push({
            REF_DATE:data[`REF_DATE`],
            RentalUnitType:data["Rental unit type"],
            VALUE: data["VALUE"]
        })
    })
    .on("end", ()=>{       
        resolve(dataRows);
    })
    .on("error", (err) => {
        reject(err);
      });
    })
}