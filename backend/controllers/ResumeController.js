const fs = require("fs");
const http = require('http');
const path = require("path");
const List = require("../models/list");

const uploadPath = path.join(__dirname, '../', '/uploads', "compte.csv");

module.exports = {
    get: async (req, res) => {

        //*Verify if the file exists in the uploads folder
        if (!fs.existsSync(uploadPath)) {
            return res.send([{
                "generalLists": {
                    "internal": {
                        "sumTotalGeneralInternalCreditList": "Upload a file",
                        "sumTotalGeneralInternalDebitList": "Upload a file"
                    },
                    "external": {
                        "sumTotalGeneralExternalCreditList": "Upload a file",
                    },
                    "sumTotalGeneralDebitList": "Upload a file",
                    "soldeGeneralInternalList": "Upload a file",
                    "soldeGeneralList": "Upload a file"
                },
                "percentagesLists": {
                    "global": "Upload a file",
                    "debit": {
                        "internal": "Upload a file",
                        "external": {
                            "superMarche": "Upload a file",
                            "amazonAchats": "Upload a file",
                            "sante": "Upload a file",
                            "abonnements": "Upload a file",
                            "extras": "Upload a file",
                        }
                    }
                },
                "maison": "Upload a file",
            }]);
        }
        try {
            //* Find the last entry list in the DB
            const list = await List.find().sort({ _id: -1 }).limit(1);

            res.send(list[0].resumeListData);
        } catch (err) {
            res.send({ message: err })
        }
    }
}