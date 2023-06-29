import React from "react";
import logo from "./logo.svg";
import "./App.css";

const getUsers = (): void => {
  fetch("https://reqres.in/api/users", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        console.log("SUCCESS");
        return res.json();
      } else {
        console.log("Nope");
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.log("ERROR"));
};

const postUsers = (): void => {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "User 1",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("ERROR"));
};

const App = (): React.ReactElement => {
  React.useEffect(() => {
    getUsers();
    postUsers();
  }, []);

  return (
    <div className="App">
      <p>Hello there!</p>
    </div>
  );
};

export default App;
