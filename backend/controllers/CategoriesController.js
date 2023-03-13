const fs = require("fs");
const http = require('http');
const path = require("path");
const List = require("../models/list");


const uploadPath = path.join(__dirname, '../', '/uploads', "compte.csv");

module.exports = {
    get: async (req, res) => {

        //*Verify if the file exists in the uploads folder
        if (!fs.existsSync(uploadPath)) {
            console.log("Upload a file first!!!")

            return res.send([{ category: "Upload a file", categoryDescription: "Upload a file", percentage: "Upload a file", total: "Upload a file" }]);
        }

        try {
            // const list = await List.findOne({ fileName: "decembre 2022 original.csv" });
            //* Find the last entry list in the DB
            const list = await List.find().sort({ _id: -1 }).limit(1);

            const allCategories = list[0].resumeListData;


            // const rawData = await fetch("/selectedListDB");

            // const data = await rawData.json();

            // // const allCategories = data;

            // console.log("this is all categories:" + data)

            res.send([
                {
                    "category": "Super Marché",
                    "categoryDescription": "Achat's chez Carrefour, Intermarché, Lidl et autres",
                    "category_type_list0": "super marché",
                    "percentage": allCategories[0].percentagesLists.debit.external.superMarche,
                    "total": allCategories[0].debitLists.superMarcheDebit.sumTotalSuperMarche * -1
                },
                {
                    "category": "Amazon Achat's",
                    "categoryDescription": "Achat's chez amazon",
                    "category_type_list0": "amazon",
                    "category_type_list1": "achat's",
                    "percentage": allCategories[0].percentagesLists.debit.external.amazonAchats,
                    "total": allCategories[0].creditAndDebitLists.amazonAchats.soldeAmazonAchats
                },
                {
                    "category": "Tabac et Dérivés",
                    "categoryDescription": "Achat's relatives au tabac, liquide, resistances, nicotine et autres",
                    "category_type_list0": "tabac",
                    "percentage": allCategories[0].percentagesLists.debit.external.tabac,
                    "total": allCategories[0].debitLists.tabacEtDerivesDebit.sumTotalTabacEtDerives * -1
                },
                {
                    "category": "Santé",
                    "categoryDescription": "Achat's pharmacie, payments maison de santé, etc...",
                    "category_type_list0": "santé",
                    "percentage": allCategories[0].percentagesLists.debit.external.sante,
                    "total": allCategories[0].creditAndDebitLists.santé.soldeSanté
                },
                {
                    "category": "Voiture",
                    "categoryDescription": "Combustible, péages, et parking ",
                    "category_type_list0": "voiture",
                    "percentage": allCategories[0].percentagesLists.debit.external.voiture,
                    "total": allCategories[0].debitLists.voitureDebit.sumTotalVoiture * -1
                },
                {
                    "category": "Abonnements",
                    "categoryDescription": "Amazon Prime, Amazon Musique, Home Assistant - Nabu Casa",
                    "category_type_list0": "abonnement",
                    "percentage": allCategories[0].percentagesLists.debit.external.abonnements,
                    "total": allCategories[0].creditAndDebitLists.abonnements.soldeAbonnements
                },
                {
                    "category": "Assurances",
                    "categoryDescription": "Voiture et autres",
                    "category_type_list0": "assurance",
                    "percentage": allCategories[0].percentagesLists.debit.external.assurances,
                    "total": allCategories[0].creditAndDebitLists.assurance.soldeAssurance
                },
                {
                    "category": "Extra's",
                    "categoryDescription": "Achat's de vêtements, Mc Donald, fleures, domotique, musique, cadeaux et autres",
                    "category_type_list0": "extra",
                    "percentage": allCategories[0].percentagesLists.debit.external.extras,
                    "total": allCategories[0].debitLists.extraDebit.sumTotalExtraList * -1
                },
            ]);
        } catch (err) {
            res.send({ message: err })
        }
    }
}