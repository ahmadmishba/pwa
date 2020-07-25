document.addEventListener("DOMContentLoaded", function() {
    // Active sidenav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status != 200) return;

                // get dftar tautan
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // register evnt listner untuk stiap tautan
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // close sidebar
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // get konten halaman yg dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "sidnav.html", true);
        xhttp.send();
    }

    // Load pg content
    var page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page){
        if(page === "home"){
            loadStandings()
        }else if(page === "teams"){
            loadTeams()
        }else if(page === "favTeam"){
            loadFavTeams()
        }
    }
})