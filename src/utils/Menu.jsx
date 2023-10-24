import { dashboard, transactions, trend, expenses } from "./Icons";

const menu = [
  {
    title: "Dashboard",
    icon: dashboard,
    path: "/dashboard",
  },
  {
    title: "View Transactions",
    icon: transactions,
    path: "/transaction",
  },
  {
    title: "Incomes",
    icon: trend,
    path: "/incomes",
  },
  {
    title: "Expenses",
    icon: expenses,
    path: "/expenses",
  },
];

export default menu;
