const list = document.getElementById('transaction-list');
const see = document.getElementById('see');
const tax = document.getElementById('taxcome');

let salary = 0;

async function start() {
    try {
        const response = await fetch('/statistic/kaspi.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.length > 0 && data[0].hasOwnProperty('salary')) {
            salary = data[0].salary;
        }

        see.onclick = function(){
            renderTransactions(data);
            see.style.display = "none";
            tax.style.display = "block"
        }
    } catch (error) {
        list.innerHTML = `<p style="font-size:20px; color: red">Error occurred: ${error}</p>`;
    }
}

function renderTransactions(transactions = []) {
    let incomes = 0;
    let color = "";
    let outcomes = 0;
    let enjoys = 0;
    let minuses = 0;
    let credis = 0;
    let taxin = 0
   
    for (let i = 1; i < transactions.length; i++) {
        const transaction = transactions[i];
        const amount = Number(transaction.Amount);
        const date = transaction.Date;
        const details = transaction.Details;
        const id = transaction.id;
        const array = details.split("");
        
        if(array[array.length - 1] !== "."){
            enjoys = amount + enjoys
        }

        if(details == 'Credit'){
            credis = amount + credis
        }

        if (amount > 0) {
            incomes = incomes + amount;
            color = "green";
        }else if(amount < 0 && array[array.length - 1] == "."){
            minuses = amount + minuses
        }else {
            outcomes = outcomes + amount;
            color = "red";
        }








        
        if(salary >= 0 && salary <= 60000){
            life = salary * 90 / 100;
            save = salary * 10 / 100;
            enjoy = 0;
            inves = 0;
        } else if(salary >= 60000 && salary <= 100000){
            life = salary * 85 / 100;
            save = salary * 5 / 100;
            enjoy = salary * 5 / 100;
            inves = salary * 5 / 100;
        } else if(salary >= 100000 && salary <= 175000){
            life = salary * 70 / 100;
            save = salary * 10 / 100;
            enjoy = salary * 10 / 100;
            inves = salary * 10 / 100;
        } else if(salary >= 175000 && salary <= 250000){
            life = salary * 50 / 100;
            save = salary * 20 / 100;
            enjoy = salary * 15 / 100;
            inves = salary * 15 / 100;
        } else if(salary >= 250000 && salary <= 1000000){
            life = salary * 35 / 100;
            save = salary * 30 / 100;
            enjoy = salary * 15 / 100;
            inves = salary * 20 / 100;
        } else {
            life = salary * 25 / 100;
            save = salary * 25 / 100;
            enjoy = salary * 25 / 100;
            inves = salary * 25 / 100;
        }



        






        
        const transactionHTML = `
            <div style="max-height: 150px; ">
                <li style="font-weight: bold;" class="listok">
                    <div style="margin-bottom: -40px" class="numeration">
                        <p>${id}</p>
                        <h1 style="color: ${color};">Amount: ${amount}</h1>
                    </div>
                    <p>Date: ${date}</p>
                    <p>Details: ${details}</p>
                </li>
                <hr>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', transactionHTML);
    }

    const blockone = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <h1>Your salary: ${salary}tg</h1>
            <h1>Incomes: ${incomes}</h1>
            <h1 style="background-color: green; padding: 20px;">Total: ${incomes + taxin + salary}</h1>
        </div>
        <hr>
    `
    const blocktre = `
        <div style="display: flex; justify-content: space-between;">
            <h1>Your salary after TAXES: ${salary-(salary * 16 / 100)}</h1>
            <a style="color: red;" href="https://mybuh.kz/useful/nalogi-s-zarplaty-v-2022-g-kakie-nalogi-platit-i-kak-schitat.html" target="_blank"><button style="font-size: 20px;width: 190px;border-radius: 0; height: 50px; ">See why?</a>
        </div>
        <hr>
    `

    const blocktre2 = `
        <div style="display: flex; justify-content: space-between;">
            <h1>Your salary after TAXES: ${taxin}</h1>
            <a href="https://mybuh.kz/useful/nalogi-s-zarplaty-v-2022-g-kakie-nalogi-platit-i-kak-schitat.html" target="_blank"><button style="font-size: 20px;width: 190px;border-radius: 0; height: 50px; ">See why?</a>
        </div>
        <hr>
    `


    const blocktwo = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <h1>For enjoy: ${enjoys - credis}</h1>
            <h1>For other people: ${minuses}</h1>
            <h1 style="background-color: red; padding: 20px;">Total: ${outcomes + minuses}</h1>
        </div>
        <h1 style="background-color: red;">Credit: ${credis}</h1>
        <hr>
    `

    const blockthre = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1 style="font-size: 50px;">In your balance: ${(incomes + (salary-(salary * 16 / 100))) + (outcomes + minuses)}</h1>
            <a href="/data/index.html"><button style="font-size: 30px;">Give me hint</button></a>
        </div>
        <hr>
    `

    const penaltyEnj = `
        <div style="background-color: red;">
            <h1>Your normal is: ${enjoy * 86 / 100}</h1>
            <h1>But you spend: ${-(enjoys - credis)}</h1>
        </div>
    `
    const aftertax = `
        <div style="background-color: red;">
            <h1>Your salary after tax: ${salary-(salary * 21 / 100)}</h1>
            <h1>Total: ${incomes + salary-(salary * 21 / 100)}</h1>
        </div>
    `
    
    
    list.insertAdjacentHTML('beforeend', blockone);
    
    list.insertAdjacentHTML('beforeend', blocktwo);
    list.insertAdjacentHTML('beforeend', blockthre);

    if((enjoy * 86 / 100) <= -(enjoys-credis)){
        list.insertAdjacentHTML('beforeend', penaltyEnj);
    }

    tax.onclick = function(){
        taxin = salary-(salary * 14 / 100)
        list.insertAdjacentHTML('beforeend', aftertax);
           
}}
start()



