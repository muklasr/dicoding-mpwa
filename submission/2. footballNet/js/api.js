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
//replace broken image
function imgError(image) {
  image.onerror = "";
  image.src = "/img/na.png";
  return true;
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
              competitionsHTML += `
              <div class="card">
              <div class="card-content">
              <div class="card-title">
                <span class="left">${group.group.replace("_", " ")}</span>
                <span class="new badge left ${
                  group.type == "HOME"
                    ? "green"
                    : group.type == "AWAY"
                    ? "red"
                    : "blue"
                }" data-badge-caption="${group.type}"></span>
              </div>
              <table>
                  <thead>
                      <th>#</th>
                      <th>Team</th>
                      <th>M</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                  </thead>
                  <tbody>        
              `;
      
              group.table.forEach(function (team) {
                competitionsHTML += `
                <tr>
                    <td>${team.position}</td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                </tr>
                `;
              });
      
              competitionsHTML += `
              </tbody>
              </table> 
               
              </div>
              </div>
              `;
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
        competitionsHTML += `
        <div class="card">
        <div class="card-content">
        <div class="card-title">
          <span class="left">${group.group.replace("_", " ")}</span>
          <span class="new badge left ${
            group.type == "HOME"
              ? "green"
              : group.type == "AWAY"
              ? "red"
              : "blue"
          }" data-badge-caption="${group.type}"></span>
        </div>
        <table>
            <thead>
                <th>#</th>
                <th>Team</th>
                <th>M</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
            </thead>
            <tbody>        
        `;

        group.table.forEach(function (team) {
          competitionsHTML += `
          <tr>
              <td>${team.position}</td>
              <td>${team.team.name}</td>
              <td>${team.playedGames}</td>
              <td>${team.won}</td>
              <td>${team.draw}</td>
              <td>${team.lost}</td>
          </tr>
          `;
        });

        competitionsHTML += `
        </tbody>
        </table> 
         
        </div>
        </div>
        `;
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
              teamsHTML += `
                    <div class="col s12 m4">
                      <div class="card">
                        <a href="./team.html?id=${team.id}">
                          <div class="card-image waves-effect waves-block waves-light custom-img">
                            <img src="${
                              team.crestUrl
                                ? team.crestUrl.replace(
                                    /^http:\/\//i,
                                    "https://"
                                  )
                                : "img/na.png"
                            }" class="responsive-img" onerror="imgError(this);" />
                          </div>
                        </a>
                        <div class="card-content">
                          <span class="card-title truncate">${team.name}</span>
                          <p class="truncate">${team.venue}</p>
                        </div>
                      </div>
                    </div>
                    `;
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
      // Menyusun komponen card artikel secara dinamis
      var teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
        <div class="col s12 m4">
            <a href="./team.html?id=${team.id}">
              <div class="card">
                  <div class="card-image waves-effect waves-block waves-light custom-img">
                    <img src="${
                      team.crestUrl
                        ? team.crestUrl.replace(/^http:\/\//i, "https://")
                        : "img/na.png"
                    }" class="responsive-img" onerror="imgError(this);"/>
                  </div>
                <div class="card-content">
                  <span class="card-title truncate">${team.name}</span>
                  <p class="truncate">${team.venue}</p>
                </div>
              </div>
            </a>
            </div>
            `;
      });
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${base_url}v2/teams/${idParam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )}" style="width:50%; margin:auto" onerror="imgError(this);" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name ? data.name : "N/A"}</span>
                <table>
                  <tbody>
                    <tr>
                      <td>Short Name</td>
                      <td>${data.shortName ? data.shortName : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Founded</td>
                      <td>${data.founded ? data.founded : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>${data.address ? data.address : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>${data.phone ? data.phone : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td><a href=${data.website ? data.website : "#"}>${
              data.website ? data.website : "N/A"
            }</a></td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>${data.email ? data.email : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Club Colors</td>
                      <td>${data.clubColors ? data.clubColors : "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>${data.venue ? data.venue : "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
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
        console.log(data);
        var teamHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" style="width:50%; margin:auto" onerror="imgError(this);"/>
          </div>
          <div class="card-content">
            <span class="card-title">${data.name ? data.name : "N/A"}</span>
            <table>
              <tbody>
                <tr>
                  <td>Short Name</td>
                  <td>${data.shortName ? data.shortName : "N/A"}</td>
                </tr>
                <tr>
                  <td>Founded</td>
                  <td>${data.founded ? data.founded : "N/A"}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>${data.address ? data.address : "N/A"}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>${data.phone ? data.phone : "N/A"}</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td><a href=${data.website ? data.website : "#"}>${
          data.website ? data.website : "N/A"
        }</a></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>${data.email ? data.email : "N/A"}</td>
                </tr>
                <tr>
                  <td>Club Colors</td>
                  <td>${data.clubColors ? data.clubColors : "N/A"}</td>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>${data.venue ? data.venue : "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
        document.getElementById("team").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function (team) {
      teamsHTML += `
      <div class="col s12 m4">
          <a href="./team.html?id=${team.id}">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light custom-img">
                  <img src="${team.crestUrl.replace(
                    /^http:\/\//i,
                    "https://"
                  )}" class="responsive-img" onerror="imgError(this);"/>
                </div>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                <p class="truncate">${team.venue}</p>
              </div>
            </div>
          </a>
          </div>
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    teamHTML = "";
    var teamHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl.replace(
          /^http:\/\//i,
          "https://"
        )}" style="width:50%; margin:auto" onerror="imgError(this);" />
      </div>
      <div class="card-content">
        <span class="card-title">${data.name ? data.name : "N/A"}</span>
        <table>
          <tbody>
            <tr>
              <td>Short Name</td>
              <td>${data.shortName ? data.shortName : "N/A"}</td>
            </tr>
            <tr>
              <td>Founded</td>
              <td>${data.founded ? data.founded : "N/A"}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${data.address ? data.address : "N/A"}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${data.phone ? data.phone : "N/A"}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td><a href=${data.website ? data.website : "#"}>${
      data.website ? data.website : "N/A"
    }</a></td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${data.email ? data.email : "N/A"}</td>
            </tr>
            <tr>
              <td>Club Colors</td>
              <td>${data.clubColors ? data.clubColors : "N/A"}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>${data.venue ? data.venue : "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

    document.getElementById("team").innerHTML = teamHTML;
  });
}
