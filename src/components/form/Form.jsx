import React from "react";
import "./form.css";

//dispatch(getIncomes) useEffect

const Form = ({ income, handleInputChange, saveIncome, isLoading }) => {
    const formattedDate = income?.date ? new Date(income?.date).toISOString().split('T')[0] : '';
  return (
    <div>
      <form onSubmit={saveIncome}>
        <h3>Add New Income</h3>
        <div className="input-control">
          <span>Title :</span>
          <input
            type="text"
            name="title"
            value={income?.title}
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
        <div className="input-control">
          <span>Amount :</span>
          <input
            type="text"
            name="amount"
            value={income?.amount}
            onChange={handleInputChange}
            placeholder="amount"
          />
        </div>
        <div className="input-control">
          <span>Date :</span>
          {/* <DatePicker
            selected={new Date(income?.date)}
            onChange={(date) =>
              handleInputChange({ target: { name: "date", value: date } })
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
          /> */}
          {/* <input type="date" name="date" value={income?.date} onChange={handleInputChange} id="" /> */}
          <input type="date" name="date" value={formattedDate} onChange={handleInputChange} />
        </div>
        <div className="selects">
          <select
            required
            value={income?.category}
            name="category"
            id="category"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investiments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">Youtube</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-control">
          <span>Description :</span>
          <textarea
            name="description"
            value={income?.description}
            onChange={handleInputChange}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="btn-form">
          <button>Add Income</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
