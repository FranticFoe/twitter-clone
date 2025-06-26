import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleclose }) {
    const [postContent, setPostContent] = useState("");
    const handleSave = () => {
        const token = localStorage.getItem("authToken")
        const decoded = jwtDecode(token);
        const userId = decoded.id
        const data = {
            user_id: userId,
            title: "Post Title",
            content: postContent
        }
        axios.post(`https://9f6ca3a9-de60-4fe5-80bc-2030987995cb-00-2drp1qaur4ve1.sisko.replit.dev/posts/`, data)
            .then((response) => {
                console.log("Success", response.data);
                handleclose();
            }).catch((err) => {
                console.error("Error", err)
            })
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