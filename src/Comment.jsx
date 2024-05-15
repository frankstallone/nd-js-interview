const Comment = ({ id, commentBody, child }) => {
  return (
    <div key={id} className="comment">
      <div>{commentBody}</div>
      {/* Not the most ideal way to do this but it works! */}
      {child.length > 0 &&
        child.map((kid) => {
          return (
            <Comment key={kid.id} commentBody={kid.body} child={kid.children} />
          );
        })}
    </div>
  );
};

export default Comment;
