import { createRoot } from "react-dom/client";
import Comment from "./Comment";

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
  const findParentComment = (comments, parentId) => {
    for (let comment of comments) {
      if (comment.id === parentId) {
        return comment;
      } else if (comment.children && comment.children.length > 0) {
        const foundComment = findParentComment(comment.children, parentId);
        if (foundComment) return foundComment;
      }
    }
    return null;
  };

  const nestedComments = comments
    .map((comment) => ({ ...comment, children: [] }))
    .reduce((acc, comment) => {
      if (comment.parentId === null) {
        acc.push(comment);
      } else {
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
