document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');

  // Load expenses from localStorage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Render expenses
  function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(function(expense, index) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${expense.name} - $${expense.amount}</span>
        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  renderExpenses();

  // Add expense
  expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    if (expenseName && expenseAmount) {
      const expense = {
        name: expenseName,
        amount: expenseAmount
      };
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      expenseForm.reset();
    }
  });

  // Edit expense
  window.editExpense = function(index) {
    const newName = prompt('Enter new name:');
    const newAmount = parseFloat(prompt('Enter new amount:'));
    if (newName && newAmount) {
      expenses[index].name = newName;
      expenses[index].amount = newAmount;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    }
  };

  // Delete expense
  window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  };
});
