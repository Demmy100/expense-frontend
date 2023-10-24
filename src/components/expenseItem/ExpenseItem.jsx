import React from "react";
import { useDispatch } from "react-redux";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import { dateFormat } from "../../utils/dateFormat";
import "./expenseItem.css"

const ExpenseItem = ({
  id,
  type,
  title,
  amount,
  description,
  category,
  date,
  deleteExpense,
}) => {
  const dispatch = useDispatch();
  const handleDeleteExpense = async () => {
   try {
    await dispatch(deleteExpense({id, amount}));
   } catch(error) {
    console.error("Error deleting expense:", error)
   }
  };
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };
  return (
    <div className="expense-content">
      <div className="item-icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="item-expense">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <button onClick={handleDeleteExpense}>{trash}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
