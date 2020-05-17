const dbPromised = idb.open("footballNet", 1, function (upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  // teamsObjectStore.createIndex("name", "name", {
  //   unique: false,
  // });
  // teamsObjectStore.createIndex("id", "id", {
  //   unique: true,
  // });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);

      let newTeam = {
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        crestUrl: team.crestUrl,
        address: team.address,
        email: team.email,
        website: team.website,
        phone: team.phone,
        founded: team.founded,
        clubColors: team.clubColors,
        venue: team.venue,
      };

      store.add(newTeam);
      return tx.complete;
    })
    .then(function () {
      console.log("Team saved successfully.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function (team) {
        if (team == undefined) {
          reject(undefined);
        } else {
          resolve(team);
        }
      });
  });
}

function deleteById(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      console.log("Item deleted");
    });
}
