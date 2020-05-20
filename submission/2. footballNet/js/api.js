const base_url = "https://api.football-data.org/";
const api_token = "e00967e304454ba09f9c141b9af31476";
const id_liga = "2001";
const options = {
  headers: {
    "X-Auth-Token": api_token,
  },
};
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getCompetitions() {
  if ("caches" in window) {
    caches
      .match(`${base_url}v2/competitions/${id_liga}/standings`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var competitionsHTML = "";
            data.standings.forEach(function (group) {
              competitionsHTML += showCompetitionTable(group);
            });
            document.getElementById(
              "competitions"
            ).innerHTML = competitionsHTML;
          });
        }
      });
  }

  fetch(`${base_url}v2/competitions/${id_liga}/standings`, options)
    .then(status)
    .then(json)
    .then(function (data) {
      var competitionsHTML = "";
      data.standings.forEach(function (group) {
        competitionsHTML += showCompetitionTable(group);
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("competitions").innerHTML = competitionsHTML;
    })
    .catch(error);
}

//TEAM

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches
      .match(`${base_url}v2/competitions/${id_liga}/teams`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamsHTML = "";
            data.teams.forEach(function (team) {
              teamsHTML += showTeamItem(team);
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("teams").innerHTML = teamsHTML;
          });
        }
      });
  }

  fetch(`${base_url}v2/competitions/${id_liga}/teams`, options)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += showTeamItem(team);
      });
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${base_url}v2/teams/${idParam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamHTML = showDetailTeam(data);
            document.getElementById("team").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(`${base_url}v2/teams/${idParam}`, options)
      .then(status)
      .then(json)
      .then(function (data) {
        let teamHTML = showDetailTeam(data);
        document.getElementById("team").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    var teamsHTML = "";
    if (teams.length > 0) {
      teams.forEach(function (team) {
        teamsHTML += showTeamItem(team);
      });
    } else {
      teamsHTML = "<br><center>There's no favorite team</center>";
    }

    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    let teamHTML = showDetailTeam(data);

    document.getElementById("team").innerHTML = teamHTML;
  });
}
