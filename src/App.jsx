import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PostDetails from "./PostDetails";

const BASE_URL_POST = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch Posts from database
  useEffect(() => {
    axios.get(BASE_URL_POST).then((response) => setPosts(response.data));
  }, []);

  const addPost = () => {
    if (newPost.trim() === "") return;
    // Find the max id in current posts, or start from 999 if none
    const maxId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) : 101;
    const newId = maxId >= 100 ? maxId + 1 : 100;
    axios
      .post(BASE_URL_POST, {
        title: newPost,
        body: "",
        userId: 1,
        postId: newId,
      })
      .then((res) => {
        // Override the id with our custom id
        setPosts([{ ...res.data, id: newId }, ...posts]);
        setNewPost("");
      });
  };

  const deletePost = (id) => {
    axios.delete(`${BASE_URL_POST}/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  if (selectedPost) {
    return (
      <PostDetails post={selectedPost} onBack={() => setSelectedPost(null)} />
    );
  }

  // Filter posts based on searchTerm
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>All Posts</h1>
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search here..."
          type="text"
          className="border-2 p-2 mb-4 w-full"
        />
      </div>

      <div className="mb-5">
        <input
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a post..."
          maxLength={100}
          className="border-2 p-2 w-3/5"
        />
        <button onClick={addPost} className="p-2 ml-2">
          Add Post
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        "No post found with this search"
      ) : (
        <ul>
          {filteredPosts.map((post) => {
            return (
              <li key={post.id} className="border mb-2 flex justify-between">
                <span>
                  {post.id} - {post.title}
                </span>
                <span className="flex gap-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-green-600 font-bold cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    className="text-red-600 font-bold cursor-pointer"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
