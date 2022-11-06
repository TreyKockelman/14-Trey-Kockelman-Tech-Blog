const submitComment = async (event) => {
  event.preventDefault();
  console.log("click");

  const blog_id = document.location.pathname.split("/")[2]
  console.log(blog_id)
  const comment = document.querySelector('#comment-update').value.trim();

  console.log(blog_id, comment);

  if (blog_id && comment) {
    const result = await fetch('/api/comments', {
      method : 'POST',
      body: JSON.stringify({ blog_id, comment }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.ok) {
      document.location.replace('/blogs/' + blog_id);
    } else {
      alert('Failed to create blog');
    }
  }
}

$("#comment-button").on('click', submitComment);