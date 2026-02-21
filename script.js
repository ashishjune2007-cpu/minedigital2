document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (data.success) {
            alert("Message sent successfully ✅");
            document.getElementById("contact-form").reset();
        } else {
            alert("Failed to send message ❌");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong ❌");
    }
});
