import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../../redux/transaction/transactionSlice";

const Transaction = () => {
  const dispatch = useDispatch();
  const { history, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );
  //console.log(history)
  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {message}</p>}
      {!isLoading && !isError && history.length === 0 && (
        <p>No transactions to display.</p>
      )}
      {!isLoading && !isError && history.length > 0 && (
        <div>
          <h1>Transaction History</h1>
          <ul>
            {history.map((transaction) => {
              //console.log("Transaction:", transaction);
              return (
                <li key={transaction?._id}>
                  <div className="history-item">
                    <h2
                      style={{
                        color:
                          transaction?.type === "expense" ? "red" : "green",
                      }}
                    >
                      Title: {transaction?.title}
                    </h2>
                    <h2
                      style={{
                        color:
                          transaction?.type === "expense" ? "red" : "green",
                      }}
                    >
                      {transaction?.type === "expense"
                        ? `-${transaction?.amount <= 0 ? 0 : transaction?.amount}`
                        : `+${transaction?.amount <= 0 ? 0 : transaction?.amount}`}
                      {/* Amount: ${transaction?.amount} */}
                    </h2>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Transaction;
