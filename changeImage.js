var settings = {
    fillType : "",
    whitespace : ""
};

function onLoad() {
    displayImage();
    settings = JSON.parse(localStorage.getItem('BACKGROUND:::settings'));
    if(settings) {
        document.getElementById("fillType").value = settings.fillType;
        document.getElementById("whitespace").value = settings.whitespace;
    }
}

function displayImage() {
    try {
        var image = document.getElementById("input").files[0];
        if(image) {
            var url = URL.createObjectURL(image);
            document.getElementById("preview").src = url;
            console.log(url);
        } else {
            document.getElementById("preview").src = window.localStorage.getItem("BACKGROUND:::imgData");
        }
    } catch (error) {
        document.getElementById("log").innerHTML = error.stack;
    }
}

function saveImage() {
    try {
        var img = document.getElementById("preview");
        if(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
        
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
        
            var dataURL = canvas.toDataURL("image/png");
        
            dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            canvas.remove();
            window.localStorage.setItem("BACKGROUND:::imgData", "data:image/png;base64," + dataURL);
            document.getElementById("log").innerHTML = "Saved!";
        } else {
            document.getElementById("log").innerHTML = "No file selected! Please select a file.";
        }
    } catch (error) {
        document.getElementById("log").innerHTML = error;
    }
}

function saveSettings() {
    try {
        settings.fillType = document.getElementById("fillType").value;
        settings.whitespace = document.getElementById("whitespace").value;
        window.localStorage.setItem("BACKGROUND:::settings", JSON.stringify(settings));
        document.getElementById("log").innerHTML = "Saved!";
    } catch (error) {
        document.getElementById("log").innerHTML = error;
    }
}