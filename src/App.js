import React, { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [data, dataSet] = useState([]);

  const searchUser = event => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

  useEffect(() => {
    async function fetchUSers() {
      setLoading(true);
      let response = await fetch(
        `http://www.mocky.io/v2/5ba8efb23100007200c2750c`
      );
      response = await response.json();
      dataSet(response);
      //console.log(response);
      setLoading(false);
    }

    fetchUSers();
  }, []);

  const items = data.filter(userData => {
    if (search === null) return userData;
    else if (
      userData.name.toLowerCase().includes(search.toLowerCase()) ||
      userData.address.toLowerCase().includes(search.toLowerCase()) ||
      userData.pincode.toLowerCase().includes(search.toLowerCase()) ||
      userData.id.toLowerCase().includes(search.toLowerCase())
    ) {
      return userData;
    }
  });

  return (
    <div className="App_users">
      <input
        type="text"
        id="App__searchlist"
        placeholder="Search for users.."
        onChange={e => searchUser(e)}
      />

      <h3>List of Users</h3>
      <div>
        {loading ? (
          <span className="App__loader">loading...</span>
        ) : (
          <div>
            {items.length > 0 ? (
              items.map(user => {
                return (
                  <div className="App__userlist" key={user.id}>
                    <strong>{user.id}</strong>
                    <br />
                    <strong>
                      <i>{user.name}</i>
                    </strong>
                    <br />
                    <span>
                      Address: {user.address}, {user.pincode}
                    </span>
                    <br />
                  </div>
                );
              })
            ) : (
              <h3 style={{ textAlign: "center", color: "red" }}>No results</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
