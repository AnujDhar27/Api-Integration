import React,{ useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";

export default function App() {
  const [id, setID] = useState(2);
  const [getName, setGetName] = useState("");
  const [getSalary,setGetSalary]=useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  const [showMethod, setShowMethod] = useState(null);

  const fetchUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
      .then((response) => response.json())
      .then((json) =>
        {setGetName(json.data.employee_name); setGetSalary(json.data.employee_salary);
          console.log(json.data.employee_name);}
      );
  };

  const AddUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/create`, {
      method: "POST",
      body: {
        name: name,
        salary: salary,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        ToastAndroid.show(
          "Created object at id: " + json.id,
          ToastAndroid.SHORT
        );
      });
  };

  const UpdateUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/update/` + id, {
      method: "PUT",
      body: {
        name: name,
        salary: salary,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show("Updated object", ToastAndroid.SHORT);
      });
  };

  const DeleteUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/delete/` + id, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
    });
  };

  return (
    <View style={styles.container}>
      {showMethod === null && <Text style={styles.header}>API</Text>}
      {showMethod === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>GET:</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Retrieve"
            style={styles.button}
            onPress={fetchUser}
            color="#A4907C"
          />
          <Text>Employee Name: {getName}</Text>
          <Text>Salary: {getSalary}</Text>
        </View>
      )}
      {showMethod === "POST" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>POST:</Text>
          <TextInput
            placeholder="Employee Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <Button
            title="Create"
            style={styles.button}
            onPress={AddUser}
            color="#A4907C"
          />
        </View>
      )}

      {showMethod === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>PUT:</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <TextInput
            placeholder="Employee Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <Button
            title="Update"
            style={styles.button}
            onPress={UpdateUser}
            color="#A4907C"
          />
        </View>
      )}
      {showMethod === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>DELETE:</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="remove"
            style={styles.button}
            onPress={DeleteUser}
            color="#A4907C"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          style={styles.button}
          onPress={() => setShowMethod("GET")}
          color="#C8B6A6"
        />

        <Button
          title="POST"
          style={styles.button}
          onPress={() => setShowMethod("POST")}
          color="#C8B6A6"
        />

        <Button
          title="PUT"
          style={styles.button}
          onPress={() => setShowMethod("PUT")}
          color="#C8B6A6"
        />

        <Button
          title="DELETE"
          style={styles.button}
          onPress={() => setShowMethod("DELETE")}
          color="#C8B6A6"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#8D7B68",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: 20,
    padding: 10,
  },

  optionsButton: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    bottom: 60,
    
  },
  methodContainer: {
    position: "absolute",
    top: 70,
  },
});
