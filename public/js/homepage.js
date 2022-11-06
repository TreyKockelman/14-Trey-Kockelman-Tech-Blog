const submitBlog = async (event) => {
  event.preventDefault();
  console.log("click");

  const name = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-description').value.trim();

  console.log(name, description);

  if (name && description) {
    const result = await fetch('/api/blogs', {
      method : 'POST',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create blog');
    }
  }
}

$("#submit-blog").on('click', submitBlog);