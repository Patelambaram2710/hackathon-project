document.addEventListener("DOMContentLoaded", function() {
    const learnMoreBtn = document.getElementById("learn-more-btn");
    const aboutSection = document.getElementById("about-section");

    learnMoreBtn.addEventListener("click", function() {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });
});
