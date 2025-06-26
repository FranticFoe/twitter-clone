import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { savePost } from "../Features/posts/postsSlice";
import { useDispatch } from "react-redux";

export default function NewPostModal({ show, handleclose }) {
    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(savePost(postContent));
        handleclose();
        setPostContent("");
    }

    return (
        <>
            <Modal show={show} onHide={handleclose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent" >
                            <Form.Control placeholder="What is happening?" as="textarea" rows={3} onChange={(e) => setPostContent(e.target.value)} />
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