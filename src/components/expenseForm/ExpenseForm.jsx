import React from "react";

const ExpenseForm = ({
  expense,
  handleInputChange,
  saveExpense,
  isLoading,
}) => {
  const formattedDate = expense?.date
    ? new Date(expense?.date).toISOString().split("T")[0]
    : "";
  return (
    <div>
      <form onSubmit={saveExpense}>
        <h3>Add New Expense</h3>
        <div className="input-control">
          <span>Title :</span>
          <input
            type="text"
            name="title"
            value={expense?.title}
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
        <div className="input-control">
          <span>Amount :</span>
          <input
            type="text"
            name="amount"
            value={expense?.amount}
            onChange={handleInputChange}
            placeholder="amount"
          />
        </div>
        <div className="input-control">
          <span>Date :</span>
          <input
            type="date"
            name="date"
            value={formattedDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="selects">
          <select
            required
            value={expense?.category}
            name="category"
            id="category"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-control">
          <span>Description :</span>
          <textarea
            name="description"
            value={expense?.description}
            onChange={handleInputChange}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="btn-form">
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
