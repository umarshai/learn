document.addEventListener("DOMContentLoaded", function () {
    const targetDate = new Date("December 20, 2024").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown-timer").innerText = "0";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        document.getElementById("countdown-timer").innerText = days;
    }

    updateCountdown(); // Run immediately on load
});
