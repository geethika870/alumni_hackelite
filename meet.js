function toggleMeetingForm() {
    var form = document.getElementById("meetingForm");
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

function saveMeeting() {
    // Get form values
    var title = document.getElementById("meetingTitle").value;
    var date = document.getElementById("meetingDate").value;
    var time = document.getElementById("meetingTime").value;
    var location = document.getElementById("meetingLocation").value;
    var details = document.getElementById("meetingDetails").value;

    // Create a new event div
    var newEvent = document.createElement("div");
    newEvent.classList.add("event");

    // Add HTML content to the new event div
    newEvent.innerHTML = `
        <h3>${title}</h3>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Location: ${location}</p>
        <p>Details: ${details}</p>
    `;

    // Add the new event to the upcoming events section
    document.getElementById("upcomingEvents").appendChild(newEvent);

    // Clear the form
    document.getElementById("meetingTitle").value = "";
    document.getElementById("meetingDate").value = "";
    document.getElementById("meetingTime").value = "";
    document.getElementById("meetingLocation").value = "";
    document.getElementById("meetingDetails").value = "";

    // Hide the form
    toggleMeetingForm();
}
