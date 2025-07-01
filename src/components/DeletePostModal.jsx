import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePost } from "../Features/posts/postsSlice";

export default function DeletePostModal({ show, handleClose, userId, postId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="border-0 justify-content-center">
                    <i
                        className="bi bi-exclamation-triangle-fill"
                        style={{
                            fontSize: "6rem",
                            color: "yellow",
                            WebkitTextStroke: "2px black",
                        }}
                    ></i>
                </Modal.Header>

                <Modal.Body className="text-center border-0">
                    <h5>Are you sure you want to delete this post?</h5>
                </Modal.Body>

                <Modal.Footer className="border-0 justify-content-center">
                    <div className="d-flex gap-5 mb-4">
                        <Button variant="danger" onClick={handleDelete}>
                            Yes, I am sure
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Nope
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}