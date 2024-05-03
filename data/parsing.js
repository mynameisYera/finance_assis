var previousExpenses = {
    "Food": 20000,
    "Entertainment": 15000,
    "Rent": 25000,
    "Personal Development": 5000,
    "Clothes": 10000
};

function getAdvice() {
    var food = parseFloat(document.getElementById("food").value);
    var entertainment = parseFloat(document.getElementById("entertainment").value);
    var rent = parseFloat(document.getElementById("rent").value);
    var development = parseFloat(document.getElementById("development").value);
    var clothes = parseFloat(document.getElementById("clothes").value);

    if (isNaN(food) || isNaN(entertainment) || isNaN(rent) || isNaN(development) || isNaN(clothes)) {
        alert("Please enter valid numbers for all spending categories.");
        return;
    }

    var categories = {
        "Entertainment": entertainment,
        "Rent": rent,
        "Personal Development": development,
        "Clothes": clothes
    };

    var maxCategory = Object.keys(categories).reduce(function(a, b){ return categories[a] > categories[b] ? a : b });
    var maxExpense = categories[maxCategory];
    var prevExpense = previousExpenses[maxCategory];
    var expenseDifference = maxExpense - prevExpense;

    var adviceText = "You're spending the most money on " + maxCategory + ". ";

    if (maxExpense > prevExpense) {
        adviceText += "Your expenses on " + maxCategory + " increased by " + expenseDifference + " compared to last month.";
    } else if (maxExpense < prevExpense) {
        adviceText += "Your expenses on " + maxCategory + " decreased by " + Math.abs(expenseDifference) + " compared to last month.";
    } else {
        adviceText += "Your expenses on " + maxCategory + " remained the same compared to last month.";
    }

    document.getElementById("adviceText").textContent = adviceText;
    document.getElementById("advice").style.display = "block";
}


