const List = require("../models/list")

//* Variable were we stock the select list after the selection in the dropdown form
let selectedListDBTemp = [];

module.exports = {
    post: async (req, res) => {
        const nameListDB = req.body.list;

        try {
            const listsInDB = await List.find();

            const listsDB = [];

            for (const list of listsInDB) {
                listsDB.push({
                    "listName": list.fileName,
                    "listData": list.data,
                    "listDate": list.dataDate,
                    "listResume": list.resumeListData
                });
            }

            if (nameListDB) {
                //* clean the variable 
                selectedListDBTemp = [];

                //* Search the list selected from dropForm in the DB
                selectedListDBTemp.push(listsDB.filter(({ listName }) => {
                    if (listName === nameListDB) { return true }
                }));
            }
        } catch (err) {
            res.send({ message: err });
        }

        res.redirect("/")
    },

    get: async (req, res) => {

        if (selectedListDBTemp) {
            const list = selectedListDBTemp[0];
            return res.json(list);
        }

      


    }
}