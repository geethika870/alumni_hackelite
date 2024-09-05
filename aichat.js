// Function to populate clicked question into the textarea
function populateQuestion(element) {
    document.getElementById('userQuestion').value = element.innerText;
}

function displayProfiles() {
    const profiles = [
        { name: "Alice Johnson", field: "Data Science", help: "Research Projects, Machine Learning" },
        { name: "Bob Williams", field: "Software Engineering", help: "Job Interview Tips, Software Development" },
        { name: "Clara Lee", field: "Cybersecurity", help: "Certifications, Career Path Advice" },
        { name: "David Kim", field: "Entrepreneurship", help: "Funding Opportunities, Startups" }
    ];

    let profileContainer = document.getElementById("profilesContainer");
    profileContainer.innerHTML = ''; // Clear existing profiles

    profiles.forEach(profile => {
        let profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        profileDiv.innerHTML = `
            <h4>${profile.name}</h4>
            <p>Field: ${profile.field}</p>
            <p>Can help with: ${profile.help}</p>
        `;
        profileContainer.appendChild(profileDiv);
    });
}
