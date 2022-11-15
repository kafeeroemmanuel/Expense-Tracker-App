// import { useContext } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// // import { dummyExpenses } from "../data/dummy-expenses";
// import { ExpenseContext } from "./contexts/ExpenseContext";

// const ExpenseList = () => {
//   const { expense } = useContext(ExpenseContext);

//   const PressHandler = () => {};

//   return (
//     <View>
//       <FlatList
//         data={expense}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <TouchableOpacity onPress={PressHandler}>
//               <View style={styles.itemContainer}>
//                 <Text style={styles.item}>
//                   {item.todo} <Text style={styles.itemcost}>${item.cost}</Text>
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             {/* <Text style={styles.item}>{item.time}</Text> */}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default ExpenseList;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   itemContainer: {
//     marginLeft: 1,
//   },
//   item: {
//     display: "flex",
//     flexDirection: "row",
//     backgroundColor: "#6d3d6d",
//     border: 3,
//     padding: 10,
//     //marginHorizontal: 8,
//     //paddingLeft: 25,
//     marginBottom: 7,
//     color: "white",
//     width: "100%",
//   },
//   itemcost: {
//     marginRight: -40,
//     // Left: 40,
//   },
// });
