function toggleImageInput() {
    const urlInput = document.getElementById('imgUrlInput');
    const uploadInput = document.getElementById('imgUploadInput');
    const urlRadio = document.getElementById('imgUrlRadio');
  
    if (urlRadio.checked) {
      urlInput.style.display = 'block';
      uploadInput.style.display = 'none';
    } else {
      urlInput.style.display = 'none';
      uploadInput.style.display = 'block';
    }
  }