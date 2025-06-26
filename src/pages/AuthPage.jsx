import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
//url of the api needs to be replaced if trying to run this code 

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const url = "https://41df07c8-abc7-492f-91bd-7bc117736acb-00-3h83abzui9ib4.sisko.replit.dev"
    const handleClose = () => setModalShow(null);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login")
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate])
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login succesfull, auth token saved.")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Row>

            <Col sm={6}>
                <Image src={loginImage} fluid alt="glitched-twitter logo" />
            </Col>

            <Col sm={6} className="p-4">
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>
                <p className="mt-5 fw-bold" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5 fw-bold" style={{ fontSize: 31 }}>Join Twitter Today.</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button style={{ fontFamily: "sans-serif" }} className="rounded-pill d-flex justify-content-center align-items-center gap-2" variant="outline-dark"><i className="bi bi-google"></i> Sign up with Google</Button>
                    <Button style={{ fontFamily: "sans-serif" }} className="rounded-pill d-flex justify-content-center align-items-center gap-2 fw-bold" variant="outline-dark"><i className="bi bi-apple"></i>Sign up with Apple</Button>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "1rem 0"
                    }}>
                        <div style={{ flex: 1, borderBottom: "1px solid #ccc" }}></div>
                        <div style={{ padding: "0 10px", fontFamily: "sans-serif" }}>or</div>
                        <div style={{ flex: 1, borderBottom: "1px solid #ccc" }}></div>
                    </div>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
                    <p style={{ fontSize: "12px" }}> By Signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use</p>
                    <p className="mt-5" style={{ fontSize: "24px", fontWeight: "bold" }}>Already have an acccount?</p>
                    <Button className="rounded-pill fw-bold" variant="outline-primary" onClick={handleShowLogin}>Sign in</Button>
                </Col>

                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>{modalShow === "SignUp" ? "Create your account" : "Log in to your account"}</h2>
                        <Form className="d-grip gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setUserName(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                            </Form.Group>

                            <p style={{ fontSize: "12px" }}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>
                            <Button className="rounded-pill" type="submit"> {modalShow === "SignUp" ? "Sign up" : "Log in"}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </Col>
        </Row >
    )
}
