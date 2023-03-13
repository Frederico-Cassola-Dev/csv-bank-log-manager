const path = require("path");
const List = require("../models/list");
const allCreditAndDebitList = require("./allCreditAndDebitList");
const parseCsvMain = require("./render-csv");


module.exports = async (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were selected!!!');
    }  
    //* The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;

    //* Define the directory and the file name
    uploadPath = path.join(__dirname, '../', '/uploads', "compte.csv");

    //* Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const data = await parseCsvMain();
        const resumeListData = allCreditAndDebitList(data);

        const dataDate = data[0].date_bank + " to " + data[data.length - 1].date_bank;

        //* Create list Schema to save in the DB
        const list = new List({
            fileName: sampleFile.name,
            fileSize: sampleFile.size,
            fileType: sampleFile.mimetype,
            data: data,
            resumeListData: resumeListData,
            dataDate: dataDate,
            uploadDate: Date.now()
        });

        //* Save uploaded list on DB
        list.save(async (err, data) => {
            console.log('Analyzing Data...');
            if (data) {
                console.log(`The file ${sampleFile.name} has been successfully saved in Database.`);
                
                //* Showing files in DB
                const listOfListsInDB = await List.find();

                for (const item of listOfListsInDB) {
                    console.log(`Item in DB: ==> ${item.fileName} <==`)
                }
            }
            else {
                if (err.code === 11000) {
                    console.log(`The file ${sampleFile.name} already exists in Database`);

                    //* Showing files in DB
                    const listOfListsInDB = await List.find();

                    for (const item of listOfListsInDB) {
                        console.log(`Item in DB: ==> ${item.fileName} <==`)
                    }
                } else {
                    console.log('Something went wrong while saving data.');
                    console.log(err);
                }
            }
        });

        console.log({
            name: sampleFile.name,
            size: sampleFile.size,
            type: sampleFile.mimetype,
            message: "The file was uploaded!!!"
        });
    });

    res.redirect("/");
}
