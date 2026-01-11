const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("saveBtn");

// Show preview when image selected
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = () => {
            preview.src = reader.result;
            preview.style.display = "block";
            document.getElementById("uploadBtn").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

// Save product
saveBtn.addEventListener("click", () => {
    if(!imageInput.files[0]){
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("name", document.getElementById("name").value);
    formData.append("description", document.getElementById("desc").value);
    formData.append("category", document.getElementById("category").value);

    fetch("http://localhost:3000/product/upload", {
        method: "POST",
        body: formData
    }).then(res => res.json())
      .then(data => {
          alert(data.message);
          // Reset form
          document.getElementById("name").value = "";
          document.getElementById("desc").value = "";
          document.getElementById("category").value = "";
          preview.style.display = "none";
          document.getElementById("uploadBtn").style.display = "block";
          imageInput.value = "";
      })
      .catch(err => {
          console.error(err);
          alert("Error saving product");
      });
});

