// Requires to modify htaccess file to make sure index.html is the main file for the server

const urlPageTitle = "Routing Tutorial";

document.addEventListener("click", (e)=> {
    const {target} = e;
    if(!target.matches("#navbar li a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
})

const urlRoutes = {
    404: {
        template: "../templates/404.html",
        title: urlPageTitle + " | 404",
        description: "Page not found.",
    },
    "/": {
        template: "../templates/home.html",
        title: urlPageTitle,
        description: "This is the homepage.",
    },
    "/about": {
        template: "../templates/about.html",
        title: urlPageTitle + " | About",
        description: "This is the about page.",
    },
    "/contact": {
        template: "../templates/contact.html",
        title: urlPageTitle + " | Contact",
        description: "This is the contact page.",
    },
};

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHander();
};

const urlLocationHander = async () => {
    const location = window.location.pathname;
    if(location.length == 0) {
        location = "/"
    }

    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
};

window.onpopstate = urlLocationHander;
window.route = urlRoute;

urlLocationHander();