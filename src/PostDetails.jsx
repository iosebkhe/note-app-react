import { useEffect, useState } from "react";
import axios from "axios";

const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments?postId=";

const PostDetails = function ({ post, onBack }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(COMMENTS_API + post.id).then((res) => setComments(res.data));
  }, [post]);

  return (
    <div className="p-5">
      <button onClick={onBack} className="mb-5">
        ← Back
      </button>
      <h2>
        <strong>Post Title - </strong>
        {post.title}
      </h2>
      <p>
        <strong>Post Body - </strong>
        {post.body}
      </p>
      <h3 className="mt-3">
        <strong>Post Comments</strong>
      </h3>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2.5">
              <strong>{comment.name}</strong> - {comment.email}
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostDetails;
