let search = location.search.replace("?", "").split("&");
var scheduledAnimationFrame;

//Check if search params contain the js thingy
for (item of search) {
    let key = item.split("=")[0];
    let value = item.split("=")[1];
    if (key === "js") {
        window.js = (value === "true");
        if (!window.js) throw new Error();
    }
}

/*
Add mapping function.
Example:

let foo = 5;
let bar = foo.map(0, 10, 0, 100);
console.log(bar);  // 50
*/
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//Event listener for "load" that makes the page ugly if JS is enabled. Only users with good browser settings shall see the good stuff
window.addEventListener("load", () => {
    // JS is poop image
    document.getElementsByTagName('main')[0].style.backgroundImage = "url('poop.png')";
    
    //Change the text color
    document.getElementsByTagName('main')[0].style.color = "black";

    //Change the font family to something... idk regular
    document.getElementsByTagName('main')[0].style.fontFamily = "'Times New Roman', Times, serif";

    //Remove the C:\ > from the title
    document.getElementsByClassName("modtitle")[0].innerHTML = "fgenesis sein mega geiler Blog";
});


// Scrolling handle function
function scrollHandler(e) {

    //Gets the current scroll value
    let currentScroll = window.scrollY;

    //Creates an element for easier usage
    let element = document.documentElement;

    //Max height equals to the maximum scrollable height, so the "complete document height"
    let maxHeight = element.scrollHeight;

    //Calculate the percent of how much the page is scrolled
    let percent = currentScroll.map(0, maxHeight, 0, 90);

    // Set the transform property
    document.getElementsByTagName("main")[0].style.transform = `rotate(${percent}deg)`;
    //console.log(`rotate(${percent}deg)`);
    scheduledAnimationFrame = false;
};

//On scroll function
function onscroll(e) {
    if(scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;
    requestAnimationFrame(scrollHandler);
}

//Attach the handler to the event.
document.addEventListener("scroll", onscroll);
