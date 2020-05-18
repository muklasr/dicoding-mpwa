//replace broken image
function imgError(image) {
    image.onerror = "";
    image.src = "/img/na.png";
    return true;
}

function showCompetitionTable(group){
    competitionsHTML += `<div class="card">
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
                                    <tbody>`;
      
    group.table.forEach(function (team) {
        competitionsHTML += `
                                        <tr>
                                            <td>${team.position}</td>
                                            <td>${team.team.name}</td>
                                            <td>${team.playedGames}</td>
                                            <td>${team.won}</td>
                                            <td>${team.draw}</td>
                                            <td>${team.lost}</td>
                                        </tr>`;
    });
      
    competitionsHTML += `
                                    </tbody>
                                </table> 
                            </div>
                        </div>`;
    return competitionsHTML;
}

function showTeamItem(team) {
    return `<div class="col s12 m4">
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
            </div>`;
}

function showDetailTeam(team) {
    return `<div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                        )}" style="width:50%; margin:auto" onerror="imgError(this);" />
                </div>
                <div class="card-content">
                    <span class="card-title">${team.name ? team.name : "N/A"}</span>
                    <table>
                    <tbody>
                        <tr>
                            <td>Short Name</td>
                            <td>${team.shortName ? team.shortName : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Founded</td>
                            <td>${team.founded ? team.founded : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${team.address ? team.address : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>${team.phone ? team.phone : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><a href=${team.website ? team.website : "#"}>${
                                team.website ? team.website : "N/A"
                                }</a></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${team.email ? team.email : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Club Colors</td>
                            <td>${team.clubColors ? team.clubColors : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <td>${team.venue ? team.venue : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
