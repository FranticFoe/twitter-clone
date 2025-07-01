import { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { savePost } from "../Features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";

export default function NewPostModal({ show, handleclose }) {
    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.uid;
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSave = () => {
        dispatch(savePost({ postContent, userId, file }));
        handleclose();
        setPostContent("");
        setFile(null);
    }

    return (
        <>
            <Modal show={show} onHide={handleclose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent" >
                            <Form.Control placeholder="What is happening?" as="textarea" rows={3} onChange={(e) => setPostContent(e.target.value)} />
                            <br />
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>Tweet</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}