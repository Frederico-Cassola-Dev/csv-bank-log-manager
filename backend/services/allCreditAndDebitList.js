const percentageList = require("./percentageList");
const sumTotalList = require("./sumTotalList");

module.exports = (data) => {
    const result = [];

    const payslip = data.filter(({ type_movement, description }) => {
        if (type_movement === "credit" && description === "VIREMENT SAS TB INDUSTRIE") { return true }
    });

    //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //* -----------General List's --------------
    //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const generalInternalCreditList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "credit" && type_origin === "internal") { return true }
    });
    const generalExternalCreditList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "credit" && type_origin === "external") { return true }
    });
    const generalInternalDebitList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "debit" && type_origin === "internal") { return true }
    });
    const generalExternalDebitList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "debit" && type_origin === "external") { return true }
    });

    const bankCreditList = data.filter(({ type_movement, type_list0 }) => {
        if (type_movement === "credit" && type_list0 === "bank") { return true }
    });

    const bankDebitList = data.filter(({ type_movement, type_list0 }) => {
        if (type_movement === "debit" && type_list0 === "bank") { return true }
    });
    //* **************** NON IDENTIFY *****************

    const nonIdentifyCreditList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "credit" && type_origin === "NON IDENTIFY") { return true }
    });

    const nonIdentifyDebitList = data.filter(({ type_movement, type_origin }) => {
        if (type_movement === "debit" && type_origin === "NON IDENTIFY") { return true }
    });
    //* *****************************************

    //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //* -----------Specific List's --------------
    //* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    //* --------SUPER MARCHÉ--------
    const superMarcheDebitList = data.filter(({ type_list0 }) => {
        if (type_list0 === "super marché") { return true }
    });
    //* ------- TABAC ET DÉRIVÉS-----------
    const tabacEtDerivesDebitList = data.filter(({ type_list0 }) => {
        if (type_list0 === "tabac") { return true }
    });
    //* --------AMAZON ACHAT'S--------
    //* --------Credit-----------
    const amazonAchatsCreditList = data.filter(({ type_movement, type_list0 }) => {
        if (type_movement === "credit" && type_list0 === "amazon") { return true }
    });
    //* --------Debit-----------
    const amazonAchatsDebitList = data.filter(({ type_movement, type_list0 }) => {
        if (type_movement === "debit" && type_list0 === "amazon") { return true }
    });
    //* ------- VOITURE-----------
    //* ------- COMBUSTIBLE-----------
    const combustibleDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "voiture" && type_list1 === "combustible") { return true }
    });
    //* -------PÉAGES-----------
    const peagesDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "voiture" && type_list1 === "péage") { return true }
    });
    //* -------PARKING-----------
    const parkingDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "voiture" && type_list1 === "parking") { return true }
    });
    //* -------VIGNETTE (Crit'Air 2)-----------
    const vignetteDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "voiture" && type_list1 === "vignette") { return true }
    });
    //*----------------------------------

    //* ------- SANTÉ-----------
    //* --------Credit-----------
    const mutuelleCreditList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "santé" && type_list1 === "mutuelle") { return true }
    });
    //* --------Debit-----------
    //* -------PHARMACIE-----------
    const pharmacieDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "santé" && type_list1 === "pharmacie") { return true }
    });
    //* -------CONSULTATIONS-----------
    const consultationsDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "santé" && type_list1 === "consultation") { return true }
    });
    //* -------EXAMENS-----------
    const examensDebitList = data.filter(({ type_list0, type_list1 }) => {
        if (type_list0 === "santé" && type_list1 === "examen") { return true }
    });
    //*----------------------------------

    //* --------RETRAITS--------
    const retraitsDebitList = data.filter(({ type_list0 }) => {
        if (type_list0 === "retrait") { return true }
    });

    //* --------PRÉLÈVEMENTS--------
    const prelevementsMensuelleDebitList = data.filter(({ type_list3 }) => {
        if (type_list3 === "prélèvement") { return true }
    });

    //* --------ASSURANCES--------
    //* --------Credit-----------
    const assuranceCreditList = data.filter(({ type_movement, type_list0 }) => {
        if (type_movement === "credit" && type_list0 === "assurance") { return true }
    });
    //* --------Debit-----------
    const assuranceDebitMaisonList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "assurance" && type_list1 === "maison") { return true }
    });

    const assuranceDebitVoitureList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "assurance" && type_list1 === "voiture") { return true }
    });
    const assuranceDebitBankList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "assurance" && type_list1 === "bank") { return true }
    });

    //* --------ABONNEMENTS--------
    //* --------Credit-----------
    const abonnementsCreditAmazonList = data.filter(({ type_movement, type_list0, type_list1, value }) => {
        if (type_movement === "credit" && type_list0 === "abonnement" && type_list1 === "amazon" && value > 0
        ) { return true }
    });
    const abonnementsCreditMobileList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "credit" && type_list0 === "abonnement" && type_list1 === "mobile") { return true }
    });
    //* --------Debit-----------
    const abonnementsDebitAmazonMensuelleList = data.filter(({ type_movement, type_list0, type_list1, type_list2 }) => {
        if (type_movement === "debit" && type_list0 === "abonnement" && type_list1 === "amazon" && type_list2 === "mensuelle") { return true }
    });
    const abonnementsDebitAmazonAnnuelleList = data.filter(({ type_movement, type_list0, type_list1, type_list2 }) => {
        if (type_movement === "debit" && type_list0 === "abonnement" && type_list1 === "amazon" && type_list2 === "annuelle") { return true }
    });
    const abonnementsDebitNabucasa_HAList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "abonnement" && type_list1 === "nabucasa") { return true }
    });
    const abonnementsDebitMobileList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "abonnement" && type_list1 === "mobile") { return true }
    });

    //*----------------Extra ----------------
    const extraBoisList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "extra" && type_list1 === "bois") { return true }
    });
    const extraMusiqueList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "extra" && type_list1 === "musique") { return true }
    });
    const extraDomotiqueList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "extra" && type_list1 === "domotique") { return true }
    });
    const extraRestaurantList = data.filter(({ type_movement, type_list0, type_list1 }) => {
        if (type_movement === "debit" && type_list0 === "extra" && type_list1 === "restaurant") { return true }
    });

    //*xxxxxxxxxx SOLDES xxxxxxxxxxx
    const soldeDuCompte = data.filter(({ type_movement }) => { if (type_movement === "solde") { return true } });
    const soldeAmazonAchats = parseFloat((sumTotalList(amazonAchatsCreditList) - sumTotalList(amazonAchatsDebitList)).toFixed(2));
    const soldeSante = parseFloat((sumTotalList(mutuelleCreditList) - (sumTotalList(pharmacieDebitList) + sumTotalList(consultationsDebitList) + sumTotalList(examensDebitList))).toFixed(2));
    const soldeAssurance = parseFloat(((sumTotalList(assuranceCreditList)) - (sumTotalList(assuranceDebitMaisonList) + sumTotalList(assuranceDebitVoitureList) + sumTotalList(assuranceDebitBankList))).toFixed(2));
    const soldeAbonnements = parseFloat(((sumTotalList(abonnementsCreditAmazonList) + sumTotalList(abonnementsCreditMobileList)) - (sumTotalList(abonnementsDebitAmazonMensuelleList) + sumTotalList(abonnementsDebitAmazonAnnuelleList) + sumTotalList(abonnementsDebitNabucasa_HAList) + sumTotalList(abonnementsDebitMobileList))).toFixed(2));
    const soldeGeneralList = parseFloat(((sumTotalList(generalInternalCreditList) + sumTotalList(generalExternalCreditList)) - (sumTotalList(generalInternalDebitList) + sumTotalList(generalExternalDebitList))).toFixed(2))
    const soldeGeneralInternalList = parseFloat((sumTotalList(generalInternalCreditList) - sumTotalList(generalInternalDebitList)).toFixed(2))
    const soldeGeneralExternalList = parseFloat((sumTotalList(generalExternalCreditList) - sumTotalList(generalExternalDebitList)).toFixed(2))
    const soldeBankList = parseFloat((sumTotalList(bankCreditList) - sumTotalList(bankDebitList)).toFixed(2));

    //*xxxxxxxxxx PERCENTAGES xxxxxxxxxxx

    const basePercentage = sumTotalList(generalExternalCreditList);
    const basePercentageInternal = sumTotalList(generalInternalCreditList);
    const basePercentageExternal = sumTotalList(generalExternalCreditList);

    result.push({
        "payslip": payslip,
        "percentagesLists": {
            "global": percentageList(basePercentage, soldeGeneralList),
            "debit": {
                "internal": percentageList(basePercentageInternal, soldeGeneralInternalList),
                "external": {
                    "total": percentageList(basePercentageExternal, soldeGeneralExternalList),
                    "superMarche": percentageList(basePercentage, sumTotalList(superMarcheDebitList)),
                    "amazonAchats": percentageList(basePercentage, soldeAmazonAchats),
                    "tabac": percentageList(basePercentage, sumTotalList(tabacEtDerivesDebitList)),
                    "sante": percentageList(basePercentage, soldeSante),
                    "voiture": percentageList(basePercentage, (sumTotalList(combustibleDebitList) + sumTotalList(peagesDebitList) + sumTotalList(parkingDebitList) + sumTotalList(vignetteDebitList))),
                    "abonnements": percentageList(basePercentage, soldeAbonnements),
                    "assurances": percentageList(basePercentage, soldeAssurance),
                    "extras": percentageList(basePercentage, (sumTotalList(extraBoisList) + sumTotalList(extraMusiqueList) + sumTotalList(extraDomotiqueList) + sumTotalList(extraRestaurantList))),
                }
            }
        },
        "soldeLists": {
            "assurance": soldeAssurance,
            "amazonAchats": soldeAmazonAchats,
            "sante": soldeSante,
            "abonnements": soldeAbonnements,
            "generalList": soldeGeneralList,
            "internalList": soldeGeneralInternalList,
            "externalList": soldeGeneralExternalList,
            "bankList": soldeBankList
        },
        "sumTotalLists": {
            "payslip": sumTotalList(payslip),
            "achatsCredit": sumTotalList(amazonAchatsCreditList),
            "amazonAchatsDebit": sumTotalList(amazonAchatsDebitList),
            "assuranceCredit": sumTotalList(assuranceCreditList),
            "assuranceDebit": sumTotalList(assuranceDebitMaisonList) + sumTotalList(assuranceDebitVoitureList),
            "santeCredit": sumTotalList(mutuelleCreditList),
            "pharmacie": sumTotalList(pharmacieDebitList),
            "consultations": sumTotalList(consultationsDebitList),
            "examens": sumTotalList(examensDebitList),
            "santéDebit": sumTotalList(pharmacieDebitList) + sumTotalList(consultationsDebitList) + sumTotalList(examensDebitList),
            "abonnementsCredit": sumTotalList(abonnementsCreditAmazonList) + sumTotalList(abonnementsCreditMobileList),
            "abonnementsDebit": sumTotalList(abonnementsDebitAmazonMensuelleList) + sumTotalList(abonnementsDebitAmazonAnnuelleList) + sumTotalList(abonnementsDebitNabucasa_HAList) + sumTotalList(abonnementsDebitMobileList),
            "superMarche": sumTotalList(superMarcheDebitList),
            "tabacEtDerives": sumTotalList(tabacEtDerivesDebitList),
            "voiture": (sumTotalList(combustibleDebitList) + sumTotalList(peagesDebitList) + sumTotalList(parkingDebitList) + sumTotalList(vignetteDebitList)),
            "retraits": sumTotalList(retraitsDebitList),
            "prélèvements": sumTotalList(prelevementsMensuelleDebitList),
            "extraList": sumTotalList(extraBoisList) + sumTotalList(extraMusiqueList) + sumTotalList(extraDomotiqueList) + sumTotalList(extraRestaurantList),
            "creditBankList": sumTotalList(bankCreditList),
            "debitBankList": sumTotalList(bankDebitList),
            "generalCreditList": sumTotalList(generalInternalCreditList) + sumTotalList(generalExternalCreditList),
            "generalDebitList": sumTotalList(generalInternalDebitList) + sumTotalList(generalExternalDebitList),
        },
        "soldeDuCompte": soldeDuCompte,
        "nonIdentifyCreditList": nonIdentifyCreditList,
        "nonIdentifyDebitList": nonIdentifyDebitList,
        "generalLists": {
            "internal": {
                "credit": generalInternalCreditList,
                "sumTotalGeneralInternalCreditList": sumTotalList(generalInternalCreditList),
                "debit": generalInternalDebitList,
                "sumTotalGeneralInternalDebitList": sumTotalList(generalInternalDebitList)
            },
            "external": {
                "credit": generalExternalCreditList,
                "sumTotalGeneralExternalCreditList": sumTotalList(generalExternalCreditList),
                "debit": generalExternalDebitList,
                "sumTotalGeneralExternalDebitList": sumTotalList(generalExternalDebitList)
            },
            "sumTotalGeneralCreditList": sumTotalList(generalInternalCreditList) + sumTotalList(generalExternalCreditList),
            "sumTotalGeneralDebitList": parseFloat((sumTotalList(generalInternalDebitList) + sumTotalList(generalExternalDebitList)).toFixed(2)),
            "soldeGeneralInternalList": soldeGeneralInternalList,
            "soldeGeneralExternalList": soldeGeneralExternalList,
            "soldeGeneralList": soldeGeneralList,
        },
        "debitLists": {
            "superMarcheDebit": {
                "list": superMarcheDebitList,
                "sumTotalSuperMarche": sumTotalList(superMarcheDebitList)
            },
            "tabacEtDerivesDebit": {
                "list": tabacEtDerivesDebitList,
                "sumTotalTabacEtDerives": sumTotalList(tabacEtDerivesDebitList)
            },
            "voitureDebit": {
                "combustibleDebit": {
                    "list": combustibleDebitList,
                    "sumTotalCombustible": sumTotalList(combustibleDebitList)
                },
                "péagesDebit": {
                    "list": peagesDebitList,
                    "sumTotalPéages": sumTotalList(peagesDebitList)
                },
                "parkingDebit": {
                    "list": parkingDebitList,
                    "sumTotalPéages": sumTotalList(parkingDebitList)
                },
                "vignetteDebit": {
                    "list": vignetteDebitList,
                    "sumTotalPéages": sumTotalList(vignetteDebitList)
                },
                "sumTotalVoiture": (sumTotalList(combustibleDebitList) + sumTotalList(peagesDebitList) + sumTotalList(parkingDebitList) + sumTotalList(vignetteDebitList))
            },
            "retraitsDebit": {
                "list": retraitsDebitList,
                "sumTotalRetraits": sumTotalList(retraitsDebitList)
            },
            "prélèvementsDebit": {
                "list": prelevementsMensuelleDebitList,
                "sumTotalPrélèvements": sumTotalList(prelevementsMensuelleDebitList)
            },
            "extraDebit": {
                "bois": extraBoisList,
                "sumTotalBoisList": sumTotalList(extraBoisList),
                "musique": extraMusiqueList,
                "sumTotalMusiqueList": sumTotalList(extraMusiqueList),
                "domotique": extraDomotiqueList,
                "sumTotalDomotiqueList": sumTotalList(extraDomotiqueList),
                "restaurant": extraRestaurantList,
                "sumTotalRestaurantList": sumTotalList(extraRestaurantList),
                "sumTotalExtraList": sumTotalList(extraBoisList) + sumTotalList(extraMusiqueList) + sumTotalList(extraDomotiqueList) + sumTotalList(extraRestaurantList)
            }
        },
        "creditAndDebitLists": {
            "amazonAchats": {
                "credit": {
                    "amazonAchatsCreditList": amazonAchatsCreditList,
                    "sumTotalAchatsCredit": sumTotalList(amazonAchatsCreditList),
                },
                "debit": {
                    "amazonAchatsDebit": {
                        "list": amazonAchatsDebitList,
                        "sumTotalAmazonAchatsDebit": sumTotalList(amazonAchatsDebitList),
                    },
                },
                "soldeAmazonAchats": soldeAmazonAchats
            },
            "assurance": {
                "credit": {
                    "assurance": assuranceCreditList,
                    "sumTotalAssuranceCredit": sumTotalList(assuranceCreditList),
                },
                "debit": {
                    "maison": assuranceDebitMaisonList,
                    "voiture": assuranceDebitVoitureList,
                    "bank": assuranceDebitBankList,
                    "sumTotalAssuranceDebit": sumTotalList(assuranceDebitMaisonList) +
                        sumTotalList(assuranceDebitVoitureList) +
                        sumTotalList(assuranceDebitBankList),
                },
                "soldeAssurance": soldeAssurance
            },
            "santé": {
                "credit": {
                    "mutuelle": mutuelleCreditList,
                    "sumTotalSanteCredit": sumTotalList(mutuelleCreditList),
                },
                "debit": {
                    "pharmacieDebit": {
                        "list": pharmacieDebitList,
                        "sumTotalPharmacie": sumTotalList(pharmacieDebitList),
                    },
                    "consultationsDebit": {
                        "list": consultationsDebitList,
                        "sumTotalConsultations": sumTotalList(consultationsDebitList),
                    },
                    "examensDebit": {
                        "list": examensDebitList,
                        "sumTotalExamens": sumTotalList(examensDebitList),
                    },
                    "sumTotalSantéDebit": sumTotalList(pharmacieDebitList) + sumTotalList(consultationsDebitList) + sumTotalList(examensDebitList),
                },
                "soldeSanté": soldeSante
            },
            "abonnements": {
                "credit": {
                    "abonnementsCreditAmazonList": abonnementsCreditAmazonList,
                    "abonnementsCreditMobileList": abonnementsCreditMobileList,
                    "sumTotalAbonnementsCredit": sumTotalList(abonnementsCreditAmazonList) +
                        sumTotalList(abonnementsCreditMobileList)
                },
                "debit": {
                    "abonnementsDebitAmazonMensuelleList": abonnementsDebitAmazonMensuelleList,
                    "abonnementsDebitAmazonAnnuelleList": abonnementsDebitAmazonAnnuelleList,
                    "abonnementsDebitNabucasa_HAList": abonnementsDebitNabucasa_HAList,
                    "abonnementsDebitMobileList": abonnementsDebitMobileList,
                    "sumTotalAbonnementsDebit": sumTotalList(abonnementsDebitAmazonMensuelleList) +
                        sumTotalList(abonnementsDebitAmazonAnnuelleList) +
                        sumTotalList(abonnementsDebitNabucasa_HAList) +
                        sumTotalList(abonnementsDebitMobileList)
                },
                "soldeAbonnements": soldeAbonnements
            },
            "bank": {
                "credit": bankCreditList,
                "sumTotalCreditBankList": sumTotalList(bankCreditList),
                "debit": bankDebitList,
                "sumTotalDebitBankList": sumTotalList(bankDebitList),
                "soldeBankList": soldeBankList
            },
        },
        "categoriesList": [
            {
                "category": "Super Marché",
                "categoryDescription": "Achat's chez Carrefour, Intermarché, Lidl et autres",
                "category_type_list0": "super marché",
                "percentage": "No data",
                "total": sumTotalList(superMarcheDebitList) * -1
            },
            {
                "category": "Amazon Achat's",
                "categoryDescription": "Achat's chez amazon",
                "category_type_list0": "amazon",
                "category_type_list1": "achat's",
                "percentage": "No data",
                "total": soldeAmazonAchats
            },
            {
                "category": "Tabac et Dérivés",
                "categoryDescription": "Achat's relatives au tabac, liquide, resistances, nicotine et autres",
                "category_type_list0": "tabac",
                "percentage": "No data",
                "total": sumTotalList(tabacEtDerivesDebitList) * -1
            },
            {
                "category": "Santé",
                "categoryDescription": "Achat's pharmacie, payments maison de santé, etc...",
                "category_type_list0": "santé",
                "percentage": "No data",
                "total": soldeSante
            },
            {
                "category": "Voiture",
                "categoryDescription": "Combustible, péages, et parking ",
                "category_type_list0": "voiture",
                "percentage": "No data",
                "total": (sumTotalList(combustibleDebitList) + sumTotalList(peagesDebitList) + sumTotalList(parkingDebitList) + sumTotalList(vignetteDebitList)) * -1
            },
            {
                "category": "Abonnements",
                "categoryDescription": "Amazon Prime, Amazon Musique, Home Assistant - Nabu Casa",
                "category_type_list0": "abonnement",
                "percentage": "No data",
                "total": soldeAbonnements
            },
            {
                "category": "Assurances",
                "categoryDescription": "Voiture et autres",
                "category_type_list0": "assurance",
                "percentage": "No data",
                "total": soldeAssurance
            },
            {
                "category": "Extra's",
                "categoryDescription": "Achat's de vêtements, Mc Donald, fleures, domotique, musique, cadeaux et autres",
                "category_type_list0": "extra",
                "percentage": "No data",
                "total": sumTotalList(extraBoisList) + sumTotalList(extraMusiqueList) + sumTotalList(extraDomotiqueList) + sumTotalList(extraRestaurantList) * -1
            },
        ]
    }

    );
    return result
}
