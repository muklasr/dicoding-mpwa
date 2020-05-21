const dbPromised = idb.open("footballNet", 1, function (upgradeDb) {
   upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");

      const newTeam = {
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

      store.put(newTeam);
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
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
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
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
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
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      console.log("Item deleted");
    });
}
