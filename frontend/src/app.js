{
    /**
     * * Populates a data table with some data
     * 
     * @param {HTMLDivElement} root 
     */

    //*------------------------------Dropdown Form Lists in DB------------------------------
    async function updateOptionsDropForm(root) {
        const form = root.querySelector("form");

        const response = await fetch("/listsDB");
        const dataListsDB = await response.json();
        
        if (dataListsDB) {
            //* Clear Options

            form.querySelector("select").innerHTML = "";

            form.querySelector("select").insertAdjacentHTML("afterbegin",
                `
                    <option value="" name="" class="selectLists-first">-- Select a List --</option>
                `
            );

            //* Populate Options
            for (const option of dataListsDB) {
                form.querySelector("select").insertAdjacentHTML("beforeend",
                    `
                        <option value="${option.listName.toLowerCase()}" name="list" class="selectLists-others">${option.listName}</option>
                    `
                );
            }
        } else {
            form.querySelector("select").innerHTML = "Upload a file first!!!";
        }

    }

    for (const root of document.querySelectorAll(".dropForm-container[data-form-url]")) {
        const dropFormDiv = document.createElement("div");

        dropFormDiv.innerHTML = `
            <form action="http://localhost:3001/selectedListDB" method="post" encType="application/x-www-form-urlencoded" id="listsDB-form">
                <label for="list" class="dropForm-label">Lists in Database</label>
                <select name="list" class="selectLists" id="list">
                    <option value="" name="" class="selectLists-first">-- Select a List --</option>
                 </select>
                 <button type="submit" id="btnUpload" class="submit-list-btn">Show</button>
            </form>
        `

        root.append(dropFormDiv);
        updateOptionsDropForm(root);
    }

    //*------------------------------Date File Title------------------------------
    async function updateDateFileTitle(root) {
        const dateTitle = root.querySelector(".data-file");

        const responseSelectedListDB = await fetch("/selectedListDB");
        const dataSelectedListDB= await responseSelectedListDB.json();

        const data = dataSelectedListDB[0];


        //* Show the data in the frontend
        if (data) {
            dateTitle.querySelector("h2").innerHTML = "";
            dateTitle.querySelector("h3").innerHTML = "";

            dateTitle.querySelector("h2").insertAdjacentHTML("afterbegin", `Name: ${data.listName}`);
            dateTitle.querySelector("h3").insertAdjacentHTML("afterbegin", `Date<br> ${data.listDate}`);
        } else {
            dateTitle.querySelector("h2").innerHTML = "";
            dateTitle.querySelector("h3").innerHTML = "";
        }
    }
    
    for (const root of document.querySelectorAll(".date-file[data-date-url]")) {
        const dateFileTitle = document.createElement("div");

        dateFileTitle.classList.add("data-file");

        dateFileTitle.innerHTML = `
            <h2 id="date-title" class="date-file-title"></h2>
            <h3 id="name-title" class="date-file-title"></h3>
        `;

        root.append(dateFileTitle);
        updateDateFileTitle(root);
    }

    //*--------------------------------List Section-------------------------------
    async function updateTableList(root) {

        const table = root.querySelector(".table-list__table");

        const responseUpload = await fetch("/selectedListDB");
        const dataSelectedListDb = await responseUpload.json();

        const data = dataSelectedListDb[0].listData;

        if (data) {
            //* Clear Table
            table.querySelector("tbody").innerHTML = "";

            //* Populate Rows
            for (const rows of data) {
                table.querySelector("tbody").insertAdjacentHTML("beforeend",
                    `
                        <tr>
                            <td><button class="modal-btn modal-trigger-list">${rows.description}</td>
                            <td>${rows.date_real}</td>
                            <td>${rows.value} €</td>
                        </tr>
                    `
                );
            }
        } else {
            table.querySelector("tbody").innerHTML = "";
        }
        //* create details modal to show the details of each item in the list
        const modalContainerList = document.querySelector(".modal-container-list");

        //* select the buttons internal of modal and list buttons
        const modalTriggersListInternal = document.querySelectorAll(".modal-trigger-list-internal");
        const modalTriggersList = document.querySelectorAll(".modal-trigger-list");

        //* convert NodeList in an array to pick the correct index of the button
        const arrayModalTriggersList = [].slice.call(modalTriggersList)

        //* Internal Modal Buttons
        modalTriggersListInternal.forEach(button => {
            button.addEventListener("click", () => {
                modalContainerList.classList.toggle("active");
            });
        });
        
        //* List Modal Buttons
        modalTriggersList.forEach((button) => {
            button.addEventListener("click", () => {
                modalContainerList.classList.toggle("active");

                //* index nodeList reference to pick the correct list item
                const buttonIndex = arrayModalTriggersList.indexOf(button);

                for (let i = 0; i < data.length; i++) {
                    if (buttonIndex === data.indexOf(data[i])) {
                        modalContainerList.querySelector("#modalTitleList-item").innerHTML = `${data[i].description}`;
                        modalContainerList.querySelector("#dialogDescList-category0").innerHTML = `${data[i].type_list0.charAt(0).toUpperCase() + data[i].type_list0.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-category1").innerHTML = `${data[i].type_list1.charAt(0).toUpperCase() + data[i].type_list1.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-category2").innerHTML = `${data[i].type_list2.charAt(0).toUpperCase() + data[i].type_list2.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-category3").innerHTML = `${data[i].type_list3.charAt(0).toUpperCase() + data[i].type_list3.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-dateBank").innerHTML = `${data[i].date_bank}`;
                        modalContainerList.querySelector("#dialogDescList-dateReal").innerHTML = `${data[i].date_real}`;
                        modalContainerList.querySelector("#dialogDescList-typeMovement").innerHTML = `${data[i].type_movement.charAt(0).toUpperCase() + data[i].type_movement.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-origin").innerHTML = `${data[i].type_origin.charAt(0).toUpperCase() + data[i].type_origin.slice(1)}`;
                        modalContainerList.querySelector("#dialogDescList-value").innerHTML = `${data[i].value} €`;
                    }
                }
            });
        });
    }

    for (const root of document.querySelectorAll(".table-list[data-list-url]")) {
        const listTitle = document.createElement("h2");
        const listModal = document.createElement("div");
        const listTable = document.createElement("table");

        listTitle.classList.add("table-list__title");
        listModal.classList.add("modal-container-list");
        listTable.classList.add("table-list__table");

        listTitle.innerHTML = `List`;

        listModal.innerHTML = ` 
            <div class="overlay modal-trigger-list-internal"></div>
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
                <button 
                aria-label="close modal" class="close-modal modal-trigger-list-internal">X</button>
                <h1 id="modalTitleList-item"></h1>
                <h2 id="modalTitleList-category">Category</h2>
                <p id="dialogDescList-category0"></p>
                <p id="dialogDescList-category1"></p>
                <p id="dialogDescList-category2"></p>
                <p id="dialogDescList-category3"></p>
                <h2 id="modalTitleList-dateBank">Bank Date</h2>
                <p id="dialogDescList-dateBank"></p>
                <h2 id="modalTitleList-dateReal">Real Date</h2>
                <p id="dialogDescList-dateReal"></p>
                <h2 id="modalTitleList-typeMovement">Type Movement</h2>
                <p id="dialogDescList-typeMovement"></p>
                <h2 id="modalTitleList-origin">Origin</h2>
                <p id="dialogDescList-origin"></p>
                <h2 id="modalTitleList-value">Value</h2>
                <p id="dialogDescList-value"></p>
            </div>
            `;

        listTable.innerHTML = `
        <thead>
            <th>Title</th>
            <th>Date</th>
            <th>Value</th>
        </thead>
        <tbody>
        </tbody>
        `;

        root.append(listTitle, listModal, listTable);
        updateTableList(root);
    }

    //*-----------------------------Categories Section----------------------------
    //*---------------------------------------------------------------------------
    async function updateTableCategories(root) {

        const categories = root.querySelector(".table-categories__table");

        const responseCategories = await fetch("/selectedListDB");
        const dataCategories = await responseCategories.json();

        const data = dataCategories[0];

        if (data.listResume[0].categoriesList) {
            //* Clear Table
            categories.querySelector("tbody").innerHTML = "";

            //* Populate Rows
            for (const rows of data.listResume[0].categoriesList) {
                categories.querySelector("tbody").insertAdjacentHTML("beforeend",
                    `
                    <tr>
                        <td><button class="modal-btn modal-trigger-categories">${rows.category}</button></td>
                        <td>${rows.percentage} %</td>
                        <td>${rows.total} €</td>
                    </tr>
                `
                );
            }
        } else {
            categories.querySelector("tbody").innerHTML = "";
        }

        //* create details modal to show the details of each category
        const modalContainerCategories = document.querySelector(".modal-container-categories");

        const modalTriggersCategoriesInternal = document.querySelectorAll(".modal-trigger-categories-internal");
        const modalTriggersCategories = document.querySelectorAll(".modal-trigger-categories");

        //* convert NodeList in an array to pick the correct index of the button
        const arrayModalTriggersCategories = [].slice.call(modalTriggersCategories)

        //* Internal Modal Buttons
        modalTriggersCategoriesInternal.forEach(button => {
            button.addEventListener("click", () => {
                modalContainerCategories.classList.toggle("active");
            });
        });

        //* Categories Modal Buttons
        modalTriggersCategories.forEach(button => {
            button.addEventListener("click", () => {
                modalContainerCategories.classList.toggle("active");

                //* index nodeList reference to pick the correct category
                const buttonIndex = arrayModalTriggersCategories.indexOf(button);

                for (let i = 0; i < data[0].listResume[0].categoriesList.length; i++) {

                    if (buttonIndex === data[0].listResume[0].categoriesList.indexOf(data[0].listResume[0].categoriesList[i])) {
                        modalContainerCategories.querySelector("#modalTitleCategories").innerHTML = `${data[0].listResume[0].categoriesList[i].category}`;
                        modalContainerCategories.querySelector("#dialogDescCategories").innerHTML = `${data[0].listResume[0].categoriesList[i].categoryDescription}`;

                        //* Populate Rows
                        const categoryListSelected = data[0].listData.filter(({ type_list0 }) => {
                            if (
                                type_list0 === data[0].listResume[0].categoriesList[i].category_type_list0) { return true }
                        });

                        //* Clear Table
                        modalContainerCategories.querySelector("tbody").innerHTML = "";

                        for (const rows of categoryListSelected) {
                            modalContainerCategories.querySelector("tbody").insertAdjacentHTML("beforeend",
                                `
                            <tr>
                                <td>${rows.description}</td>
                                <td>${rows.date_real}</td>
                                <td>${rows.date_bank}</td>
                                <td>${rows.type_movement}</td>
                                <td>${rows.type_origin}</td>
                                <td>${rows.value} €</td>
                            </tr>
                            `
                            );
                        }
                    }
                }
            });
        });
    }

    for (const root of document.querySelectorAll(".table-categories[data-categories-url]")) {
        const categoriesTitle = document.createElement("h2");
        const categoriesModal = document.createElement("div");
        const categoriesTable = document.createElement("table");

        categoriesTitle.classList.add("table-categories__title");
        categoriesModal.classList.add("modal-container-categories");
        categoriesTable.classList.add("table-categories__table");

        categoriesTitle.innerHTML = `Categories`;

        categoriesModal.innerHTML = ` 
            <div class="overlay modal-trigger-categories-internal"></div>
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="dialogDesc">
                <button 
                aria-label="close modal" 
                class="close-modal modal-trigger-categories-internal">X</button>
                <h1 id="modalTitleCategories"></h1>
                <p id="dialogDescCategories"></p>
                <table>
                    <thead>
                        <th>Description</th>
                        <th>Real Date</th>
                        <th>Bank Date</th>
                        <th>Type Movement</th>
                        <th>Type Origin</th>
                        <th>Value</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            `;

        categoriesTable.innerHTML = `
            <thead>
                <th>Categories</th>
                <th>Percentage</th>
                <th>Total</th>
            </thead>
            <tbody>
            </tbody>
        `
        root.append(categoriesTitle, categoriesModal, categoriesTable);
        updateTableCategories(root);
    }

    //*--------------------------------Resume Section-----------------------------
    async function updateTableResume(root) {

        const resumeInternal = root.querySelector(".table-resume-internal__body");
        const resumeExternal = root.querySelector(".table-resume-external__body");

        const response = await fetch("/selectedListDB");
        const dataResume = await response.json();

        const data = dataResume[0];

        if (data.listResume) {
            //* Clear Table
            resumeInternal.querySelector(".total-credit-resume-internal__value").innerHTML = "";
            resumeInternal.querySelector(".savings-resume-internal__value").innerHTML = "";
            resumeInternal.querySelector(".savings-resume-internal__value-percentage").innerHTML = "";
            resumeInternal.querySelector(".total-debit-resume-internal__value").innerHTML = "";
            resumeExternal.querySelector(".total-credit-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".savings-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".savings-resume-external__value-percentage").innerHTML = "";
            resumeExternal.querySelector(".total-debit-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".super-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".achats-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".extras-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".sante-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".abonnements-resume-external__value").innerHTML = "";
            resumeExternal.querySelector(".maison-resume-external__value").innerHTML = "";

            //* Populate Rows
            //! rows in the for loop no used??????????????????????
            for (const rows of data.listResume) {
                //* -----------------EXTERNAL-------------------
                resumeExternal.querySelector(".total-credit-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.external.sumTotalGeneralExternalCreditList}€`
                );
                resumeExternal.querySelector(".savings-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.soldeGeneralList}€`
                );
                resumeExternal.querySelector(".savings-resume-external__value-percentage").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.global}%`
                );
                resumeExternal.querySelector(".total-debit-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.sumTotalGeneralDebitList}€`
                );
                resumeExternal.querySelector(".super-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.external.superMarche}%`
                );
                resumeExternal.querySelector(".achats-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.external.amazonAchats}%`
                );
                resumeExternal.querySelector(".extras-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.external.extras}%`
                );
                resumeExternal.querySelector(".sante-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.external.sante}%`
                );
                resumeExternal.querySelector(".abonnements-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.external.abonnements}%`
                );
                resumeExternal.querySelector(".maison-resume-external__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].maison}%`
                );
                //* -----------------INTERNAL-------------------
                resumeInternal.querySelector(".total-credit-resume-internal__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.internal.sumTotalGeneralInternalCreditList}€`
                );
                resumeInternal.querySelector(".savings-resume-internal__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.soldeGeneralInternalList}€`
                );
                resumeInternal.querySelector(".savings-resume-internal__value-percentage").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].percentagesLists.debit.internal}%`
                );
                resumeInternal.querySelector(".total-debit-resume-internal__value").insertAdjacentHTML("afterbegin",
                    `${data.listResume[0].generalLists.internal.sumTotalGeneralInternalDebitList}€`
                );
            }
        } else {
            //* -----------------EXTERNAL-------------------
            resumeExternal.querySelector(".total-credit-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".savings-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".savings-resume-external__value-percentage").innerHTML = "";
            resumeExternal.querySelector(".total-debit-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".super-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".achats-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".extras-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".sante-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".abonnements-resume-external__value").innerHTML = "Upload a file";
            resumeExternal.querySelector(".maison-resume-external__value").innerHTML = "Upload a file";
            //* -----------------INTERNAL-------------------
            resumeInternal.querySelector(".total-credit-resume-internal__value").innerHTML = "Upload a file";
            resumeInternal.querySelector(".savings-resume-internal__value").innerHTML = "Upload a file";
            resumeInternal.querySelector(".savings-resume-internal__value-percentage").innerHTML = "";
            resumeInternal.querySelector(".total-debit-resume-internal__value").innerHTML = "Upload a file";

        }
    }

    for (const root of document.querySelectorAll(".table-resume[data-resume-url]")) {
        const resumeTitleExternal = document.createElement("h2");
        const resumeTitleInternal = document.createElement("h2");
        const resumeExternal = document.createElement("div");
        const resumeInternal = document.createElement("div");

        resumeTitleInternal.classList.add("table-resume-internal__title");
        resumeExternal.classList.add("table-resume__container");
        resumeInternal.classList.add("table-resume__container");

        resumeTitleExternal.innerHTML = `External Resume`;

        resumeTitleExternal.classList.add("table-resume-external__title");

        resumeExternal.innerHTML = `
        <div class="table-resume-external__body">
            <div class="table-resume__body-main-categories">
                <div class="total-credit-resume-external">
                    <h3 class="total-credit-resume__title">Total External Credit</h3>
                    <p class="total-credit-resume-external__value"></p>
                </div>
                <div class="savings-resume-external">
                    <h3 class="savings-resume-external__title">External Savings</h3>
                    <p class="savings-resume-external__value"></p>
                    <p class="savings-resume-external__value-percentage"></p>
                </div>
                <div class="total-debit-resume-external">
                    <h3 class="total-debit-resume-external__title">Total External Debit</h3>
                    <p class="total-debit-resume-external__value"></p>
                </div>
            </div>
            <div class="table-resume__body-sub-categories"> 
                <div class="super-resume-external">
                    <h3 class="super-resume-external__title">Super</h3>
                    <p class="super-resume-external__value"></p>
                </div>
                <div class="achats-resume-external">
                    <h3 class="achats-resume-external__title">Achats</h3>
                    <p class="achats-resume-external__value"></p>
                </div>
                <div class="extras-resume-external">
                    <h3 class="extras-resume-external__title">Extras</h3>
                    <p class="extras-resume-external__value"></p>
                </div>
                <div class="sante-resume-external">
                    <h3 class="sante-resume-external__title">Sante</h3>
                    <p class="sante-resume-external__value"></p>
                </div>
                <div class="abonnements-resume-external">
                    <h3 class="abonnements-resume-external__title">Abonnements</h3>
                    <p class="abonnements-resume-external__value"></p>
                </div>
                <div class="maison-resume-external">
                    <h3 class="maison-resume-external__title">Maison</h3>
                    <p class="maison-resume-external__value"></p>
                </div>
            </div>
        </div>
        `
        resumeTitleInternal.innerHTML = `Internal Resume`;

        resumeInternal.innerHTML = `
        <div class="table-resume-internal__body">
            <div class="table-resume__body-main-categories">
                <div class="total-credit-resume-internal">
                    <h3 class="total-credit-resume-internal__title">Total Internal Credit</h3>
                    <p class="total-credit-resume-internal__value"></p>
                </div>
                <div class="savings-resume-internal">
                    <h3 class="savings-resume-internal__title">Savings Internal</h3>
                    <p class="savings-resume-internal__value"></p>
                    <p class="savings-resume-internal__value-percentage"></p>
                </div>
                <div class="total-debit-resume-internal">
                    <h3 class="total-debit-resume-internal__title">Total Internal Debit</h3>
                    <p class="total-debit-resume-internal__value"></p>
                </div>
            </div>
        </div>
        `
        root.append(resumeTitleExternal, resumeExternal, resumeTitleInternal, resumeInternal);
        updateTableResume(root);
    }
}
