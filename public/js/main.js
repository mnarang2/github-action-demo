document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn");
  const editingTools = document.getElementById("editingTools");

  uploadBtn.addEventListener("click", () => {
    // Simulating photo upload
    alert("Photo uploaded successfully!");
    editingTools.style.display = "block";
  });
});
