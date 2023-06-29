import React from "react";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
interface UserData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const getUsers = (): Promise<UserData> => {
  return fetch("https://reqres.in/api/users")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Nope");
      }
    })
    .then((data) => data)
    .catch((error) => console.log("ERROR"));
};

const postUser = (): Promise<boolean> => {
  return fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "User 1",
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Nope");
        return false;
      }
    })
    .then((data) => {
      console.log(JSON.stringify(data));
      return true;
    })
    .catch((error) => {
      console.log("ERROR");
      return false;
    });
};

const App = (): React.ReactElement => {
  const [users, setUsers] = React.useState<User[] | undefined>(undefined);
  const [postOutcome, setPostOutcome] = React.useState<boolean | undefined>(
    undefined
  );

  // An alternative to these methods is to set the state variables in the fetch.then()
  // functions themselves, instead of returning a promise from fetch and awaiting the
  // called function
  const handleGet = React.useCallback(async () => {
    const userData = await getUsers();
    setUsers(userData.data);
  }, []);

  const handlePost = React.useCallback(async () => {
    const outcome = await postUser();
    setPostOutcome(outcome);
  }, []);

  return (
    <div className="App">
      <p>Hello there!</p>
      <button onClick={handlePost}>Post</button>
      {postOutcome !== undefined && (
        <p>{postOutcome ? "Success!" : "Failure!"}</p>
      )}
      <button onClick={handleGet}>Get</button>
      {users && users.map((user) => <p>Email: {user.email}</p>)}
    </div>
  );
};

export default App;
