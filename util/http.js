import axios from "axios";

//Helper function to avoid repeating ourselves
const BACKEND_URL =
  "https://react-native-course-9a347-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  //post request for sending new data to a db. check official docs for @method and respective action
  //expenses is a node/folder that will contain the expenses that we add in future. json is a db must-have
  //sec. arg is the data we want to send. also db generates a unique id for each piece of data
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  //we can get our id when we send a request to firebase. FYI, id is called name in db
  const id = response.data.name;
  return id;
}

//this code transforms the data i get from the db into an array of objs that hyave our desired format
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  //console.log(response.data);
  const expenses = [];
  //axios avails a data property on response for fetching our data from the db
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

//updating and deleting an expense from firebase
export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
