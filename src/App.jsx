import { createRoot } from "react-dom/client";
import Comment from "./Comment";

// From memory, the original comments array looked like this:
const comments = [
  {
    id: 0,
    body: "This is the first comment",
    parentId: null,
  },
  {
    id: 1,
    body: "This is the first reply",
    parentId: 0,
  },
  {
    id: 2,
    body: "This is the second reply",
    parentId: 0,
  },
  {
    id: 3,
    body: "This is the second comment",
    parentId: null,
  },
  {
    id: 4,
    body: "This is the first reply",
    parentId: 3,
  },
  {
    id: 5,
    body: "This is the a third level comment",
    parentId: 4,
  },
];

const App = () => {
  // Function to find the parent comment
  const findParentComment = (comments, parentId) => {
    for (let comment of comments) {
      // Match? Return!
      if (comment.id === parentId) {
        return comment;
        // If this comment has children, check them for children
      } else if (comment.children && comment.children.length > 0) {
        const foundComment = findParentComment(comment.children, parentId);
        if (foundComment) return foundComment;
      }
    }
    return null;
  };
  // Cleaned up comments array with nesting to make it easier to map through
  const nestedComments = comments
    // Easier to start with a map adding the empty children property to each comment
    .map((comment) => ({ ...comment, children: [] }))
    // Add the children to their respective parents
    .reduce((acc, comment) => {
      if (comment.parentId === null) {
        acc.push(comment);
      } else {
        // This logic was better to be pulled out into it's own function
        const parentComment = findParentComment(acc, comment.parentId);
        if (parentComment) {
          parentComment.children.push(comment);
        }
      }
      return acc;
    }, []);

  return nestedComments.map((comment) => (
    <Comment
      key={comment.id}
      commentBody={comment.body}
      child={comment.children}
    ></Comment>
  ));
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
