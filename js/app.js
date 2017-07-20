/**
 * Main app file.  Initializes app components.
 */


/**
 * The main app object.
 *
 */
var vanillaPress = {

    init: function () {
	    localStorage.setItem('vp_database', JSON.stringify(posts));
    },

    clrPageTitle: function () {
        document.querySelector("#pageTitle").innerHTML = "";
    },

    clrPageContent: function () {
        document.querySelector("#pageContent").innerHTML = "";
    },

    clrPrimary: function () {
        vanillaPress.clrPageTitle();
        vanillaPress.clrPageContent();
    },

    // clrSide: function () {
    //     document.querySelector(".sidebar").innerHTML = "";
    // },

    // clrContent: function () {
    //     vanillaPress.clrPrimary();
    //     vanillaPress.clrSide();
    //
    // },

    displayList: function () {
        var item, curTitle, curLink;

        for (curPost of posts) {

            item = document.createElement("div");

            curTitle = document.createElement("h3");

            curLink = document.createElement("a");
            curLink.innerHTML = curPost.title;
            curLink.setAttribute("href", location.pathname + '#' + curPost.slug);
            curLink.classList.add("post-title");
            curLink.classList.add(curPost.slug);

            curTitle.appendChild(curLink);

            item.appendChild(curTitle);
            item.appendChild(document.createElement("hr"));

            document.querySelector("#pageContent").appendChild(item);
        }
    },

    displayPost: function (hash) {

        for (curPost of posts) {
            if (("#" + curPost.slug) == hash) {
                document.querySelector("#pageTitle").innerHTML = curPost.title;
                document.querySelector("#pageContent").innerHTML = curPost.content;
                return true;
            }
        }

        // document.querySelector("#pageContent").appendChild(document.createTextNode("Displaying " + hash + " page"));
        return false;
    },

    display404: function (hash) {
        var page = hash.replace("#", ""),
            errMsg = document.createElement("p");

        errMsg.innerHTML = 'I\'m sorry, but the <span style="color:red">' + page + '</span> page does not exist!';
        document.querySelector("#pageContent").appendChild(errMsg);
    }

};
// end of vanillaPress object

/******
 * Event handler code to make it look like we're
 * linking to another page
 *
 */
function linkStub(e) {
    var curTitle = e.target,
        hash;

    curTitle.classList.remove("post-title");
    hash = "#" + curTitle.classList[0];
    curTitle.classList.add("post-title");

    vanillaPress.clrPrimary();
    vanillaPress.displayPost(hash);

}

function addLinkStubs() {

    var listTitles = document.querySelectorAll(".post-title");

    for (curTitle of listTitles) {
        curTitle.addEventListener("click", linkStub);
    }
}

function linkToListStub(e) {
    vanillaPress.clrPrimary();
    vanillaPress.displayList();
    addLinkStubs();
}

/******
 * Start of mainline code
 */
vanillaPress.init();

// Add your custom code starting here:

document.querySelector("header").addEventListener("click", linkToListStub);

var hash = location.hash;

vanillaPress.clrPrimary();

if (("" == hash) || "#" == hash) {
    vanillaPress.clrPrimary();
    vanillaPress.displayList();
    addLinkStubs();
} else {
    vanillaPress.clrPrimary();
    if (!vanillaPress.displayPost(hash)) {
        vanillaPress.display404(hash);
    }
}