const fs = require("fs");
const filesUpload = require("../services/filesUpload");
const path = require("path");
const parseCsvMain = require("../services/render-csv");
const List = require("../models/list");

const uploadPath = path.join(__dirname, '../', '/uploads', "compte.csv");

module.exports = {
    post: filesUpload,
    get: async (req, res) => {
        //*Verify if the file exists in the uploads folder
        if (!fs.existsSync(uploadPath) || await List.find().length === 0) {
            return res.send({
                listResult: {
                    data: [
                        {
                            description: "Upload a file",
                            date_bank: "Upload a file",
                            date_real: "Upload a file",
                            type_list0: "Upload a file",
                            type_movement: "Upload a file",
                            type_origin: "Upload a file",
                            value: "Upload a file"
                        }
                    ],
                    dataDate: "Upload a file",
                }
            });
        }

        try {
            // const list = await List.findOne({ fileName: "decembre 2022 original.csv" });

            // const selectedListDB = await fetch("http://localhost:3001/selectedListDB");
            // const dataListsDB = await selectedListDB.json();


            //* Find the last entry list in the DB
            const list = await List.find().sort({ _id: -1 }).limit(1);
            return res.send({
                listResult: list[0]
                // listResult: dataListsDB[0]
            });
        } catch (err) {
            return res.send({ message: err })
        }
    }
}