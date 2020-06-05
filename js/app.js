budgetFeedback = document.getElementById(".budget-feedback");
expenseFeedback = document.getElementById("expense-feedback");
budgetForm = document.getElementById("budget-form");
budgetInput = document.getElementById("budget-input");
budgetAmount = document.getElementById("budget-amount");
expenseAmount = document.getElementById("expense-amount");
balance = document.getElementById("balance");
balanceAmount = document.getElementById("balance-amount");
expenseForm = document.getElementById("expense-form");
expenseInput = document.getElementById("expense-input");
amountInput = document.getElementById("amount-input");
expenseList = document.getElementById("expense-list");
itemList = [];
itemID = 0;

function submitBudgetForm(){
    const value = budgetInput.value;
    
    if(value == "" || value < 0){
        budgetFeedback.classList.add("showItem");
        budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
        setTimeout(function(){
            budgetFeedback.classList.remove("showItem");
        },4000);
    } else {
        budgetAmount.textContent = value;
        budgetInput.value = "";
    }

}

function submitExpenseForm(){
    const expenseValue = expenseInput.value;
    const amountValue = amountInput.value;
   
    if(expenseValue == "" || amountValue == "" || amountValue < 0){
        expenseFeedback.classList.add("showItem");
        expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
        setTimeout(function(){
            expenseFeedback.classList.remove("showItem");
        },4000);
    } 

    else{
        let amount = parseInt(amountValue);
        expenseInput = "";
        amountInput = "";

        let expense = {
            id:itemID,
            title:expenseValue,
            amount:amount,
        }
        itemID++;
        itemList.push(expense);
        // addExpense(expense);
        console.log(itemList);
    }
}

budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();
        submitBudgetForm();
});
    
expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        submitExpenseForm();
});
    