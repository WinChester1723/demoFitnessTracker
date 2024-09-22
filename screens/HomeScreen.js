import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";
import Button from "../components/Button";

const HomeScreen = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    // Проверка наличия Pedometer
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(result ? "available" : "unavailable");
      },
      (error) => {
        setIsPedometerAvailable("unavailable");
      }
    );

    // Подписываемся на шаги
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    // Отписываемся при демонтировании компонента
    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Tracker</Text>
      <Text>Шагомер доступен: {isPedometerAvailable}</Text>
      <Text>Количество шагов: {stepCount}</Text>
      <Button
        title="Start Tracking"
        onPress={() => alert("Tracking Started")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
