const list = document.getElementById('transaction-list');
const see = document.getElementById('see');
const chart = document.getElementById('canv')

let salary = 0;
let mal = 0;



async function start() {
    
    try {
        const response = await fetch('kaspi.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.length > 0 && data[0].hasOwnProperty('salary')) {
            mal = data[0].salary;
        }

        see.onclick = function(){
            see.style.display = "none";
            chart.style.display = 'block'
            renderTransactions(data);
        }
    } catch (error) {
        list.innerHTML = `<p style="font-size:20px; color: red">Error occurred: ${error}</p>`;
    }
}

function renderTransactions(transactions = []) {
    
    let life, save, enjoy, inves;

    for (let i = 1; i < transactions.length; i++) {
        const transaction = transactions[i];
        // Do something with each transaction if needed
    }
    salary = mal-(mal * 14 / 100)
    
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
    const blockthre = `
    <div>
        <h1 style="font-size: 40px; color: purple;">Your salary before taxes: ${mal}</h1>
        <h1 style="font-size: 50px;">Your salary: ${salary}</h1>
        <p style="color: red; font-size: 20px; margin-top: -30px;">(after taxes)</p>
    </div>
    `

    const blockone = `
        <div>
            <h1>На жизнь: ${life}</h1>
            <h1>Отклад: ${save}</h1>
            <h1>Инвестиция: ${inves}</h1>
            <h1>Развлечение: ${enjoy}</h1>
        </div>
    `;



    const ctx = document.getElementById('myChart');

    const data = [
        {
            "salar": 400000
        },
        {
            "id": 1,
            "Amount": -300,
            "Date": "30.04.24",
            "Details": "The First"
        },
        
    ];
    const salar = data[0].salar;
    
    
            new Chart(ctx,{
              type: 'pie',
              data: {
                labels: ['На жизнь','Развлечение', 'Откаладывать', 'Инвестиция'],
                datasets: [{
                  label: 'Your ideal spending money system',
                  data: [life, enjoy, save, inves],
                  borderWidth: 5
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
    list.insertAdjacentHTML('beforeend', blockthre);
    list.insertAdjacentHTML('beforeend', blockone);
}



start()

