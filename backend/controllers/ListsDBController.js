const List = require("../models/list");

module.exports = {
    // post: (req, res) => {
    //     // console.log(req)
    //     // res.end(JSON.stringify(req.body))
    //     // res.json(selectedList)
    // },
    get: async (req, res) => {
        try {
            //* Find all lists in DB and send to /listsDB
            const listsInDB = await List.find();

            const listsDB = [];

            for (const list of listsInDB) {
                listsDB.push({
                    listName: list.fileName,
                    listData: list.data,
                    listResume: list.resumeListData
                });
            }
            res.send(listsDB);
        } catch (err) {
            res.send({ message: err });
        }
    }
}