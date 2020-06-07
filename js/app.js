budgetFeedback = document.getElementById("budget-feedback");
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
expenseIcons = document.querySelectorAll("expense-icons");
itemList = [];
itemID = 0;



function showBalance(){
    const value = budgetAmount.textContent;
    const expense = expenseAmount.textContent;
    console.log(expense);
    if(itemList.length == 0){
        total = value;
    }
    
    else{
        var total = value - expense;
        if(total < 0){
            this.balance.classList.remove("showGreen", "showBlack");
            this.balance.classList.add("showRed");
        }
        else if(total > 0){
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
        }
        if(total == 0){
            this.balance.classList.remove("showGreen", "showRed");
            this.balance.classList.add("showBlack");
        }
    }
        this.balanceAmount.textContent = total;
}


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
    showBalance();
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
        expenseInput.value = "";
        amountInput.value = "";

        let expenseListItems = {
            id:itemID,
            title:expenseValue,
            amount:amount,
        }
        itemID++;
        itemList.push(expenseListItems);
        addExpense(expenseListItems);
        
        var expense = itemList.reduce(function(accumulator, currentValue){
            return accumulator + currentValue.amount;
        }, 0);
        expenseAmount.textContent = expense;
        showBalance();

    }
    
}
function addExpense(expenseListItems){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expenseListItems.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expenseListItems.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expenseListItems.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expenseListItems.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`;
   expenseList.appendChild(div);
}

function editExpense(element){
    let id = parseInt(element.dataset.id);
    const expenseTitle = itemList[id].title;
    const expenseAMount = parseInt(itemList[id].amount);
    const balanceAMount = parseInt(balanceAmount.textContent);
    const expenseAMOunt = parseInt(expenseAmount.textContent);
    
    let parent = element.parentElement.parentElement.parentElement;
    expenseList.removeChild(parent);
    delete itemList[id];
    balanceAmount.textContent = balanceAMount + expenseAMount;
    expenseAmount.textContent = expenseAMOunt - expenseAMount;
    expenseInput.value = expenseTitle;
    amountInput.value = expenseAMount;
}

function deleteExpense(element){
    let id = parseInt(element.dataset.id);
    const expenseAMount = parseInt(itemList[id].amount);
    const balanceAMount = parseInt(balanceAmount.textContent);
    const expenseAMOunt = parseInt(expenseAmount.textContent);
    
    let parent = element.parentElement.parentElement.parentElement;
    expenseList.removeChild(parent);
    delete itemList[id];
    balanceAmount.textContent = balanceAMount + expenseAMount;
    expenseAmount.textContent = expenseAMOunt - expenseAMount;
}


budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();
        submitBudgetForm();
});
    
expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        submitExpenseForm();
});

expenseList.addEventListener("click", function(event){
    console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains('edit-icon')){
            editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
           deleteExpense(event.target.parentElement);
    }
});




    