import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost } from "../Features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function UpdatePostModal({ show, handleClose, postId, originalPostContent, }) {
    const [newPostContent, setNewPostContent] = useState(originalPostContent);
    const [newFile, setNewFile] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.uid;

    const handleNewFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleUpdate = () => {
        dispatch(updatePost({ userId, postId, newPostContent, newFile }));
        handleClose();
        setNewPostContent(newPostContent);
        setNewFile(null);
    };

    console.log("Original Post Content:", originalPostContent);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="Update your post"
                                as="textarea"
                                rows={3}
                                defaultValue={originalPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <br />
                            <Form.Control
                                type="file"
                                onChange={handleNewFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}