import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

// import logo from "../assets/Svg/Logo";
import { SvgXml } from "react-native-svg";

import { useEffect, useState } from "react";

import { database } from "../../firebase-config";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

var sideMargin = 20;

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function attemptLogin() {
    navigation.navigate("HomePage", { userID: "Ky0lVuXZJbTZhp9kAj5vkTZOa8T2" });
    // const auth = getAuth(database);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     let uniqueUserID = user.uid;
    //     navigation.navigate("HomePage", { userID: uniqueUserID });
    //     // navigation.navigate("Home", uniqueUserID);
    //   })
    //   .catch((error) => {
    //     if (error.code === "auth/wrong-password") {
    //       Alert.alert("Incorrect Login Details!", "Wrong password", [
    //         {
    //           text: "OK",
    //         },
    //       ]);
    //     } else if (error.code === "auth/invalid-email") {
    //       Alert.alert("Incorrect Login Details!", "Invalid email", [
    //         {
    //           text: "OK",
    //         },
    //       ]);
    //     } else if (error.code === "auth/user-not-found") {
    //       Alert.alert(
    //         "Incorrect Login Details!",
    //         "No account for provided email",
    //         [
    //           {
    //             text: "OK",
    //           },
    //         ]
    //       );
    //     } else {
    //       Alert.alert("Incorrect Login Details!", "Please try again", [
    //         {
    //           text: "OK",
    //         },
    //       ]);
    //     }
    //   });
  }

  return (
    <View style={{ marginTop: 35 }}>
      {/* <SvgXml xml={logo} width="45" height="45" style={styles.svg} /> */}
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.inputHeading}>Email</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={setEmail}
          value={email}
          placeholder="example123@gmail.com"
        />
      </SafeAreaView>
      <View style={styles.spaceBetweenInputs}></View>
      <Text style={styles.inputHeading}>Password</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="*********"
        />
      </SafeAreaView>
      <View style={styles.loginButton}>
        <Pressable
          onPress={() => {
            attemptLogin();
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    marginTop: 100,
    marginLeft: sideMargin,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginLeft: sideMargin,
    marginTop: 30,
    marginBottom: sideMargin,
  },
  inputHeading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: sideMargin,
  },
  dropdown1ButtonStyle: {
    width: "" + 100 - sideMargin + 10 + "%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginLeft: sideMargin,
    marginRight: sideMargin,
    textAlign: "center",
  },
  loginButton: {
    width: "30%",
    alignSelf: "center",
    margin: sideMargin,
    marginTop: 40,
    padding: 10,
    backgroundColor: "#2BD928",
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  spaceBetweenInputs: {
    paddingTop: 20,
  },
});

export default Login;
