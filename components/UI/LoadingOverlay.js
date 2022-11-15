import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverLay() {
  return (
    <View style={styles.container}>
      {/* //loading spinner, visual feedback that app is loading data */}
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverLay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
