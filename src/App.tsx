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
  const [users, setUsers] = React.useState<User[] | undefined>(undefined);

  const handleGet = React.useCallback(async () => {
    const userData = await getUsers();
    setUsers(userData.data);
  }, []);

  return (
    <div className="App">
      <p>Hello there!</p>
      <button onClick={postUsers}>Post</button>
      <button onClick={handleGet}>Get</button>
      {users && users.map((user) => <p>Email: {user.email}</p>)}
    </div>
  );
};

export default App;
