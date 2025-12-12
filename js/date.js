document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('currentYearAndMonth');
    const now = new Date();
    const year = now.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[now.getMonth()];

    dateElement.textContent = `${month} ${year}`;
});