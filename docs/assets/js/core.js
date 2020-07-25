// for standings
var loadStandings = () => {
    runLoading();
    var standings = get_standings()
    standings.then(data => {
        var st  = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
        data    = JSON.parse(st);

        var html = ''
        data.standings.forEach(stdg => {
            var card = ''
            stdg.table.forEach(res =>{
                card += `
                <div class="col s12 m6 l6">
                    <div class="card blue-grey lighten-5">
                        <div class="card-content">
                                <div class="row">
                                    <div class="col s12 m12 pos-value center-align">
                                        <b>Position ${res.position}</b>
                                    </div>
                                </div>
                                <div class="pos-v2">
                                    <div class="center-align">
                                        <p>
                                            <b>${res.team.name}</b>
                                        </p><br>
                                        <img class="responsive-img" width="50" style="height:50px!important" src="${res.team.crestUrl || 'img/no-pict-01.png'}">
                                    </div>
                                    <div class="pos-value2">
                                        <p>Played (${res.playedGames})</p>
                                        <p>Won (${res.won})</p>
                                        <p>Draw (${res.draw})</p>
                                        <p>Lost (${res.lost})</p>
                                        <p>Points (${res.points})</p>
                                        <p>GF (${res.goalsFor})</p>
                                        <p>GA (${res.goalsAgainst})</p>
                                        <p>GD (${res.goalDifference})</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>`
            })
            html += `
                <div class="card-content">
                <div class="card blue-grey">
                    <span class="title-page">
                        <h6 class="center-align header">${stdg.stage}</h6>
                        <div class="center-align after-type">:: ${stdg.type} ::</div>
                    </span>
                </div>
                <div class="row">
                `+card+`
                </div>
                </div>`
            })
        document.getElementById("hd-title").innerHTML = '<div class="card orange lighten-2"><h5 class="title-page">STANDINGS</h5></div>';
        document.getElementById("content").innerHTML = html;
        hideLoading()
    })
}

var teamIsData;

// for teams
var loadTeams = () => {
    runLoading()
    var teams = get_teams()
    teams.then(data => {
        var st  = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
        data    = JSON.parse(st);

        teamIsData = data
        var html = ''
        html += '<div class="row"><div class="col s12 m12 l12"><ul class="collapsible">'
            data.teams.forEach(team =>{
                html += `
                <li class="active">
                    <div class="collapsible-header">${team.name}</div>
                    <div class="collapsible-body">
                        <div class="row">
                            <div class="col s12"><div class="center-align"><img width="70" height="70" src="${team.crestUrl || 'img/no-pict-01.png'}"></div></div>
                            <div class="col s12"><div class="center-align">Short Name : ${team.shortName}</div></div>
                            <div class="col s12"><div class="center-align">Area Name : ${team.area.name}</div></div>
                            <div class="col s12"><div class="center-align">Phone : ${team.phone}</div></div>
                            <div class="col s12"><div class="center-align">Email : ${team.email}</div></div>
                            <div class="col s12"><div class="center-align">Address : ${team.address}</div></div>
                            <div class="col s12"><div class="center-align">Founded : ${team.founded}</div></div>
                            <div class="col s12"><div class="center-align">Club Color : ${team.clubColors}</div></div>
                            <div class="col s12"><div class="center-align">Tla : ${team.tla}</div></div>
                            <div class="col s12"><div class="center-align">Venue : ${team.venue}</div></div>
                            <div class="col s12"><div class="center-align">Website : <a href="${team.website}" target="_blank">${team.website}</a></div></div>
                            <div class="col s12">
                                <div class="card-action center-align m20">
                                    <div id="fav${team.id}">
                                        <a class="waves-effect waves-light btn-small light-blue lighten-2" onclick="inTeamListener(${team.id})">Add to Favorite</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `
            })
        html += "</ul></div></div>"
        document.getElementById("hd-title").innerHTML = '<div class="card teal"><h5 class="title-page">TEAMS</h5></div>';
        document.getElementById("content").innerHTML = html;
        hideLoading()
        initCollapsible()

        // for init favorited
        var idb = getFavTeams();
        idb.then(data => {
            for(team of data){
                console.log(`${team.id}`)
                document.getElementById(`fav${team.id}`).innerHTML = `<div class="grey lighten-4">Favorited</div>`
            }
        })
    })
}

// for fav. teams
var loadFavTeams = () => {
    runLoading()
    var teams = getFavTeams()
    teams.then(data => {
        teamIsData = data
        var html = ''
        html += '<div class="row">'
        data.forEach(team =>{
        html += `
            <div class="col s12 m6 l6">
                <div class="card">
                    <div class="card-content teal lighten-5">
                        <div class="center"><img width="70" height="70" src="${team.crestUrl || 'img/no-pict-01.png'}"></div>
                        <div class="center flow-text">${team.name}</div>
                        <div class="center">${team.area.name}</div>
                    </div>
                    <div class="my-border"></div>
                    <div class="row">
                        <div class="col s12"><div class="center-align">Short Name : ${team.shortName}</div></div>
                        <div class="col s12"><div class="center-align">Area Name : ${team.area.name}</div></div>
                        <div class="col s12"><div class="center-align">Phone : ${team.phone}</div></div>
                        <div class="col s12"><div class="center-align">Email : ${team.email}</div></div>
                        <div class="col s12"><div class="center-align">Address : ${team.address}</div></div>
                        <div class="col s12"><div class="center-align">Founded : ${team.founded}</div></div>
                        <div class="col s12"><div class="center-align">Club Color : ${team.clubColors}</div></div>
                        <div class="col s12"><div class="center-align">Tla : ${team.tla}</div></div>
                        <div class="col s12"><div class="center-align">Venue : ${team.venue}</div></div>
                        <div class="col s12"><div class="center-align">Website : <a href="${team.website}" target="_blank">${team.website}</a></div></div>
                    </div>
                    <div class="card-action center-align"><a class="waves-effect waves-light btn-small orange" onclick="delTeamListener(${team.id})">Delete From Favorite</a></div>
                </div>
            </div>`
        })

        if(data.length === 0) html+= '<h6 class="center-align">Not found :(</h6>'
        html += "</div>"

        document.getElementById("hd-title").innerHTML = '<div class="card cyan darken-2"><h5 class="title-page">FAVORITES TEAM</h5></div>';
        document.getElementById("content").innerHTML = html;

        hideLoading()
        initCollapsible()
    })
}

// dbx oprtions
var dbx = idb.open('aidb-football', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('teams', {'keyPath': 'id'})
    }
})

// insert team
var inTeam = (team) => {
    dbx.then(db => {
        var trx = db.transaction('teams', 'readwrite');
        var store = trx.objectStore('teams')
        team.createdAt = new Date().getTime()
        store.put(team)
        return trx.complete;
    })
    .then(() => {
        M.toast({ html: `${team.name}\n  has been saved.`})
        console.log('Team has been saved');
    })
    .catch(err => {
        console.error('Team failed to save.', err);
    });
}

// get favorites team
var getFavTeams = () => {
    return dbx.then(db => {
        var trx = db.transaction('teams', 'readonly');
        var store = trx.objectStore('teams');
        return store.getAll();
    })
}

// delete team
var delTeam = (teamId) => {
    dbx.then(db => {
        var trx = db.transaction('teams', 'readwrite');
        var store = trx.objectStore('teams')
        store.delete(teamId)
        return trx.complete;
    })
    .then(() => {
        M.toast({ html: `Team has been deleted.`})
        console.log('Team has been deleted')
        loadFavTeams();
    })
    .catch(err => {
        console.error('Failed to delete: ', err);
    });
}

// listener insert
var inTeamListener = teamId => {
    document.getElementById(`fav${teamId}`).innerHTML = `<div class="grey lighten-4">Favorited</div>`;
    var tm = teamIsData.teams.filter(el => el.id === teamId)[0]
    inTeam(tm);
}

// listener delete
var delTeamListener = teamId => {
    var cfr = confirm("Are you sure to delete this Favorite team?")
    if(cfr === true){
        delTeam(teamId);
    }
}

// proses loading
var runLoading = () => {
    var html = `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>`
    document.getElementById("loading-process").innerHTML = html;    
}

// hide loading
var hideLoading = () => {
    document.getElementById("loading-process").innerHTML = '';
}

// init collapsible
var initCollapsible = () => {
    const collaps = document.querySelectorAll('.collapsible')
    M.Collapsible.init(collaps)
}