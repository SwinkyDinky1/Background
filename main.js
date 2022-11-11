var bg;
var settings = {};

function onLoad() {
    try {
        if(settings == null) {
            settings = {
                fillType : "max",
                whitespace : "#000000"
            };
        }
        var data = localStorage.getItem('BACKGROUND:::imgData');
        if(data) {
            bg = document.getElementById('bg');
            bg.src = data;
            document.getElementById("log").innerHTML = document.getElementById("bg").style.backgroundImage;
        }
        settings = JSON.parse(localStorage.getItem('BACKGROUND:::settings'));
        applyStyles();
    } catch (error) {
        document.getElementById("log").innerHTML = error;
    }
}

function applyStyles() {
    try {
        if(settings) {
            switch(settings.fillType) {
                case "width":
                    bg.style["min-width"] = "100%";
                    bg.style["width"] = "auto";
                    bg.style["height"] = "auto";
                    break;
                case "height":
                    bg.style["min-height"] = "100%";
                    bg.style["width"] = "auto";
                    bg.style["height"] = "auto";
                    break;
                case "max":
                    bg.style["min-width"] = "100%";
                    bg.style["min-height"] = "100%";
                    bg.style["width"] = "auto";
                    bg.style["height"] = "auto";
                    break;
                case "cover":
                    bg.style["width"] = "100%";
                    bg.style["height"] = "100%";
                    break;
                case "min":
                    if(window.innerWidth / bg.width > window.innerHeight / bg.height) {
                        bg.style["height"] = "100%";
                        bg.style["width"] = "auto";
                    } else {
                        bg.style["width"] = "100%";
                        bg.style["height"] = "auto";
                    }
                    break;
                default:
                    break;
            }
            document.body.style["background-color"] = settings.whitespace;
        } else {
            if(window.innerWidth / bg.width > window.innerHeight / bg.height) {
                bg.style["height"] = "100%";
                bg.style["width"] = "auto";
            } else {
                bg.style["width"] = "100%";
                bg.style["height"] = "auto";
            }
        }
    } catch (error) {
        document.getElementById("log").innerHTML = error;
    }
}
