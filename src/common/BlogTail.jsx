import Card from "react-bootstrap/Card";

function BlogTail({ blog }) {
  return (
    <Card style={{ minWidth: "10rem", maxWidth: "30rem" }} className="p-2 m-3">
      <Card.Img variant="top" src={blog.imageUrl} />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.describtion}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BlogTail;
