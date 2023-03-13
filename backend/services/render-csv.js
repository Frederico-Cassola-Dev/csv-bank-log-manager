const fs = require("fs");
const Papa = require("papaparse");
const path = require("path");

const uploadPath = path.join(__dirname, '../', '/uploads', "compte.csv");

const parseCsv = async () => {
    //* Read the file in the server
    const csvFile = fs.createReadStream(uploadPath);

    return new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
            delimiter: ";",
            downloadRequestBody: true,
            complete: results => {
                const dataRaw = results.data;

                const dataFiltered = dataRaw.map(e => e.filter(Boolean));
                const dataCsvResult = turningArrayInObjectWithKeyNames(dataFiltered);

                resolve(dataCsvResult)
            }
        })
    })
}

const parseCsvMain = async () => {
    try {
        const csvResults = await parseCsv();

        return csvResults
    } catch (err) {
        console.error('Could not parse csv', err)
    }
}

//* To clean and transform the array in an array of object's
function turningArrayInObjectWithKeyNames(data) {
    const date = new Date();
    const result = [];
    for (let i = 0; i < data.length; i += 1) {

        const value = parseFloat(data[i][1].toString().replace(",", "."));

        //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        //* -------------CREDIT------------------
        //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        if (value > 0) {
            //* ---------Assurance ---------------
            if (data[i].length === 3 && (
                data[i][2].substring(0, 18) === "CB  AMAZON EU SARL"
            )) {
                result.push({
                    date_real: `${data[i][2].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][2].replace(data[i][2].slice(-8), "").trimEnd(),
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "amazon",
                    type_list1: "achat's",
                    type_list2: "",
                    type_list3: ""
                });

                //* ---------Mobile ---------------
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT SFR")) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "abonnement",
                    type_list1: "mobile",
                    type_list2: "",
                    type_list3: ""
                });

                //* --------PERSONAL INTERNAL CREDIT-----------
                //* ------- compte principal-----------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "006581X") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Principal",
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "compte principal",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Compte Commun-----------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "006793B") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Commun",
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "compte commun",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- compte principal Épargne-----------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "111930V") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Livret - A",
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "Livret A",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- compte principal Cerise-----------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "047615G") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Cerise",
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "Cerise",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Transfer de mes Comptes-----------
            } else if (data[i].length === 4 && data[i][3] === "VIREMENT M CARLOS FREDERICO DUA") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "Livret A ou Cerise",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
                //* ------- Transfer Compte Commun (006793B)-----------
            } else if (data[i].length === 4 && data[i][3] === "VIREMENT MR DUARTE CASSOLA OU M") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "internal",
                    type_list0: "compte commun",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
                //* --------PERSONAL EXTERNAL CREDIT-----------
                //* ------- Santé -----------
                //* -------Mutuelle-----------
            } else if (data[i].length === 4 &&
                (
                    data[i][3] === "VIREMENT NOVEOCARE" ||
                    data[i][3] === "VIREMENT GESTION FORMAT PREVOYA"
                )
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "santé",
                    type_list1: "mutuelle",
                    type_list2: "",
                    type_list3: ""

                });

                //* ------- TORBEL -----------
            } else if (data[i].length === 4 && (
                data[i][3] === "VIREMENT SAS TB INDUSTRIE" ||
                data[i][3] === "VIREMENT SARL TORBEL RHONE"
            )
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "torbel",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT MARIA ADILIA FRANCO DU")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "Adilia",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT C.P.A.M. DE L'ISERE")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "CPAM",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT INNOV EDUC")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "WCS",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT PAYPAL (EUROPE) S.A.R.")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "paypal",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });

                //* --------Bank internal transactions---------
                //* ----------------Assurance------------------
            } else if (data[i].length === 4 && (data[i][3] === "VIREMENT ASSURANCE LCL")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "assurance",
                    type_list1: "bank",
                    type_list2: "",
                    type_list3: ""
                });
            } else if (data[i].length === 4 && (data[i][3] === "REMISE FIDELITE TENUE DE COMPTE")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "bank",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
            } else if (data[i].length === 3 && data[i][2] === "LCL A LA CARTE") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][2],
                    type_movement: "credit",
                    type_origin: "external",
                    type_list0: "bank",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });

                //* -------------Solde du Compte--------------
            } else if (data[i].length === 3 && data[i][2] === "01014 006581X") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: "Solde du compte principal",
                    type_movement: "solde",
                });
            } else {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description0: data[i][2],
                    description1: data[i][3],
                    type_movement: "credit",
                    type_origin: "NON IDENTIFY",
                    type_list0: "NON IDENTIFY",
                    type_list1: "NON IDENTIFY",
                    type_list2: "NON IDENTIFY",
                    type_list3: "NON IDENTIFY"
                });
            }
        } else {
            //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            //* -------------DEBIT------------------
            //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            //* ------- Abonnements-----------
            if (data[i].length === 6 && (data[i][3].substring(0, 19) === "CB  AMAZON PRIME FR")) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "abonnement",
                    type_list1: "amazon",
                    type_list2: "annuelle",
                    type_list3: ""
                });
            } else if (data[i].length === 6 && (data[i][3].substring(0, 18) === "CB  AMAZON DIGITAL")) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "abonnement",
                    type_list1: "amazon",
                    type_list2: "mensuelle",
                    type_list3: ""
                });
            } else if (data[i].length === 6 && (data[i][3].substring(0, 20) === "CB  NABU CASA - HA C")) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "abonnement",
                    type_list1: "nabucasa",
                    type_list2: "mensuelle",
                    type_list3: ""
                });
            } else if (data[i].length === 4 && (
                data[i][3] === "PRLV SEPA Bouygues Telecom"
            )) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "abonnement",
                    type_list1: "mobile",
                    type_list2: "mensuelle",
                    type_list3: "prélèvement"
                });
                //* ------- Super Marché-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 13) === "CB  CARREFOUR" ||
                data[i][3].substring(0, 8) === "CB  LIDL" ||
                data[i][3].substring(0, 9) === "CB  VIVAL" ||
                data[i][3].substring(0, 15) === "CB  INTERMARCHE" ||
                data[i][3].substring(0, 16) === "CB  INTER BRIORD"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "super marché",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Amazon Achat's-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 18) === "CB  AMAZON EU SARL" ||
                data[i][3].substring(0, 19) === "CB  AMAZON PAYMENTS"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "amazon",
                    type_list1: "achat's",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Tabac et Dérivés-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 15) === "CB  TABAC SAULT" ||
                data[i][3].substring(0, 18) === "CB  SNC ATOULEPRIX" ||
                data[i][3].substring(0, 13) === "CB  LA BARAKA" ||
                data[i][3].substring(0, 17) === "CB  L'EXCENTRIQUE" ||
                data[i][3].substring(0, 20) === "CB  www.lepetitvapot" ||
                data[i][3].substring(0, 10) === "CB  ESPRIT" ||
                data[i][3].substring(0, 16) === "CB  TABAC PRESSE"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "tabac",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Voiture -----------
                //* ------- Combustible -----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 17) === "CB  DAC CARREFOUR" ||
                data[i][3].substring(0, 20) === "CB  STAT INTER BRIOR"

            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "voiture",
                    type_list1: "combustible",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Péages-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 20) === "CB  AREA SAINT EXUPE" ||
                data[i][3].substring(0, 18) === "CB  APRR AUTOROUTE"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "voiture",
                    type_list1: "péage",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Parking-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 20) === "CB  CAISSE AUT P GHE" ||
                data[i][3].substring(0, 18) === "CB  BARRIERE OUDOT" ||
                data[i][3].substring(0, 16) === "CB  PIERRE OUDOT"
            )
            ) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "voiture",
                    type_list1: "parking",
                    type_list2: "",
                    type_list3: ""
                });
                //* --------- Vignette(Crit'Air 2)-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 20) === "CB  IMPRIMERIE NATIO"
            )
            ) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "voiture",
                    type_list1: "vignette",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------- Santé -----------
                //* -------Pharmacie-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 20) === "CB  PHARMACIE BRISON" ||
                data[i][3].substring(0, 20) === "CB  PHARMACIE DE MON"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "santé",
                    type_list1: "pharmacie",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Consultations-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 19) === "CB  HOPITALPRIVEAIN" ||
                data[i][3].substring(0, 7) === "CB  HCL" ||
                data[i][3].substring(0, 15) === "CB  ROSET LAURA" ||
                data[i][3].substring(0, 17) === "CB  MALIDIN MARIE" ||
                data[i][3].substring(0, 18) === "CB  DR MILLIASSEAU" ||
                data[i][3].substring(0, 14) === "CB  DR BRONNER"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "santé",
                    type_list1: "consultation",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Examens-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 18) === "CB  RADIOLOGIE MEX"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "santé",
                    type_list1: "examen",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Bois-----------

            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 20) === "CB  WWW.TOSCANO-FRER"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "extra",
                    type_list1: "bois",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Extras-----------
                //* -------Restaurant-----------
            } else if (data[i].length === 6 && (
                data[i][3].substring(0, 17) === "CB  MC DONALDS SC" ||
                data[i][3].substring(0, 14) === "CB  MC DONALDS" ||
                data[i][3].substring(0, 18) === "CB  MC DO AMBERIEU" ||
                data[i][3].substring(0, 10) === "CB  MC BEC" ||
                data[i][3].substring(0, 16) === "CB  KFC BOURGOIN" ||
                data[i][3].substring(0, 15) === "CB  KFC TIGNIEU" ||
                data[i][3].substring(0, 13) === "CB  CHEZ MEMO" ||
                data[i][3].substring(0, 12) === "CB  KB HOUSE" ||
                data[i][3].substring(0, 15) === "CB  HOSTELLERIE" ||
                data[i][3].substring(0, 16) === "CB  MedianceF184" ||
                data[i][3].substring(0, 12) === "CB  PROD'JET" ||
                data[i][3].substring(0, 16) === "CB  SOUS LA DENT" ||
                data[i][3].substring(0, 18) === "CB  SAS O NUMERO 4"
            )) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "extra",
                    type_list1: "restaurant",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Musique-----------
            } else if (data[i].length === 6 && (data[i][3].substring(0, 13) === "CB  Woodbrass")) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "extra",
                    type_list1: "musique",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Domotique-----------
            } else if (data[i].length === 6 && (data[i][3].substring(0, 19) === "CB  SHELLYFRANCE.FR")) {
                result.push({
                    date_real: `${data[i][3].slice(-8, -2)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-8), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "extra",
                    type_list1: "domotique",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------Retrait-----------
            } else if (data[i].length === 5 && data[i][2] === "Retrait DAB") {
                result.push({
                    date_real: `${data[i][3].slice(-5)}${date.getFullYear()}`,
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3].replace(data[i][3].slice(-9), "").trimEnd(),
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "retrait",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });

                //* ----------------Assurance------------------
            } else if (data[i].length === 4 && value > -50 && data[i][3] === "PRLV SEPA ASSURANCE LCL") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "assurance",
                    type_list1: "maison",
                    type_list2: "mensuelle",
                    type_list3: "prélèvement",
                });
            } else if (data[i].length === 4 && value < -50 && data[i][3] === "PRLV SEPA ASSURANCE LCL") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "assurance",
                    type_list1: "voiture",
                    type_list2: "mensuelle",
                    type_list3: "prélèvement",
                });
                //* ----------Payments Entities-------------
            } else if (data[i].length === 4 && data[i][3] === "VIR SEPA CPAM DE L ISERE") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "CPAM",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""

                });
                //* ---------------compte principal-----------------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "006581X") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Principal",
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "compte principal",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* -------------Compte Commun---------------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "006793B") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Commun",
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "compte commun",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* -----------compte principal Épargne-------------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "111930V") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Livret - A",
                    type_movement: "debit",
                    type_origin: "internal",
                    type_list0: "Livret A",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* ------------compte principal Cerise-------------
            } else if (data[i].length === 4 && data[i][3].substring(15, 22) === "047615G") {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3] + " Cerise",
                    type_movement: "debit",
                    type_origin: "internal",
                    type_list0: "Cerise",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
                //* --------Bank internal transactions---------
            } else if (data[i].length === 4 &&
                (
                    data[i][3] === "COTISATION MENSUELLE CARTE 9623" ||
                    data[i][3] === "TENUE DE COMPTE"
                )
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][3],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "bank",
                    type_list1: "",
                    type_list2: "",
                    type_list3: ""
                });
            } else if (data[i].length === 3 && (data[i][2] === "ASSURANCE MOYEN DE PAIEMENT")
            ) {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][2],
                    type_movement: "debit",
                    type_origin: "external",
                    type_list0: "assurance",
                    type_list1: "bank",
                    type_list2: "",
                    type_list3: ""
                });

            } else {
                result.push({
                    date_real: data[i][0],
                    date_bank: data[i][0],
                    value: value,
                    description: data[i][2],
                    description1: data[i][3],
                    type_movement: "debit",
                    type_origin: "NON IDENTIFY",
                    type_list0: "NON IDENTIFY",
                    type_list1: "NON IDENTIFY",
                    type_list2: "NON IDENTIFY",
                    type_list3: "NON IDENTIFY"
                });
            }
        }
    }
    return result;
}


module.exports = parseCsvMain;