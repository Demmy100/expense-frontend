import moment from "moment";

export const dateFormat = (date) => {
  //console.log("Original Date:", date);
  const formattedDate = moment(date).format("DD/MM/YYYY");
  //console.log("Formatted Date:", formattedDate);
  return formattedDate;
};
