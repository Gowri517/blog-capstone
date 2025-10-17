const backendURL = "https://your-backend.onrender.com"; // replace later
const token = localStorage.getItem("token");
if (!token) location.href = "login.html";

// Logout
function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}

// Add Post
const newPostForm = document.getElementById("newPostForm");
newPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;

  const res = await fetch(`${backendURL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  if (res.ok) {
    e.target.reset();
    loadMyPosts();
  }
});

// Load Posts
async function loadMyPosts() {
  const res = await fetch(`${backendURL}/api/posts`);
  const data = await res.json();

  const container = document.getElementById("myposts");
  const userId = parseJwt(token).userId;

  container.innerHTML = data
    .filter(p => p.author?._id === userId)
    .map(p => `
      <div class="post">
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        <button onclick="deletePost('${p._id}')">Delete</button>
      </div>
    `).join('');
}

// Decode JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

// Delete Post
async function deletePost(id) {
  if (!confirm("Delete this post?")) return;
  await fetch(`${backendURL}/api/posts/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  loadMyPosts();
}

loadMyPosts();
