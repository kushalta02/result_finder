document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const rollInput = document.getElementById("rollInput");
  const resultCard = document.getElementById("resultCard");
  const studentName = document.getElementById("studentName");
  const studentRoll = document.getElementById("studentRoll");
  const studentGrade = document.getElementById("studentGrade");
  const marksContainer = document.getElementById("marksContainer");

  // Hide the result card initially
  resultCard.style.display = "none";

  searchBtn.addEventListener("click", function () {
    const roll_no = rollInput.value.trim();

    if (roll_no === "") {
      alert("⚠️ Please enter a roll number!");
      return;
    }

    // Optional loading effect
    searchBtn.innerText = "Searching...";
    searchBtn.disabled = true;

    fetch("/get_result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: roll_no }),
    })
      .then((response) => response.json())
      .then((data) => {
        searchBtn.innerText = "Search Result";
        searchBtn.disabled = false;

        if (data.status === "error") {
          alert(data.message);
          resultCard.style.display = "none";
          return;
        }

        // Show result card
        resultCard.style.display = "block";
        resultCard.classList.add("fade-in");

        // Fill in details
        const result = data.data[0];
        studentName.textContent = result.name;
        studentRoll.textContent = result.roll_no;
        studentGrade.textContent = result.grade;

        // Group subjects and marks if multiple entries for one student exist
        const marksHTML = data.data
          .map(
            (item) =>
              `<p><b>${item.subject}</b>: <span>${item.marks}</span></p>`
          )
          .join("");
        marksContainer.innerHTML = marksHTML;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("❌ Something went wrong! Please try again later.");
        searchBtn.innerText = "Search Result";
        searchBtn.disabled = false;
      });
  });
});
