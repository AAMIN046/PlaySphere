// Loader
window.onload = function() {
    document.getElementById("loader").style.display = "none";
};

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Search
document.getElementById("search").addEventListener("keyup", function() {
    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {
        let name = card.getAttribute("data-name");
        card.style.display = name.includes(value) ? "inline-block" : "none";
    });
});
