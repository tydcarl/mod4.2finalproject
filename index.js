const spinner = document.getElementById("spinner");
    spinner.style.display = "block"; // Show spinner
    // Simulating a loading time (remove this and add your logic)
    setTimeout(() => {
        spinner.style.display = "none"; // Hide spinner after some time
    }, 2000); // Change 2000 to the time you need for your process
}