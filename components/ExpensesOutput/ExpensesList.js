import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

// function renderExpenseItem(itemData) {
//   //itemData also has the index parameter
//   return <Text>{itemData.item.description}</Text>;
// }

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => {
        // or <ExpenseItem description={description} amount={amount} date={date}/>
        return <ExpenseItem {...item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
