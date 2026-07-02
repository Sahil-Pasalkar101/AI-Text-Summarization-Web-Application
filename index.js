document.getElementById("input_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputArea = document.getElementById("Input_area");
    const output = document.querySelector(".output_div p");
    const submitButton = e.target.querySelector("button");

    const dialogue = inputArea.value.trim();

    if (!dialogue) {
        output.textContent = "Please enter some text.";
        return;
    }

    output.textContent = "Summarizing...";
    submitButton.disabled = true;

    try {
        const response = await fetch("/summarize/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dialogue: dialogue
            })
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        output.textContent = data.summary;

    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    } finally {
        submitButton.disabled = false;
    }
});