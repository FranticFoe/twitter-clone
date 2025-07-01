import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost } from "../Features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);


    console.log("post", post);

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.uid;
    const { content, id: postId, imageUrl } = post;
    const [likes, setLikes] = useState(post.likes);

    const addTolikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    }
    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }));
    }
    const isLiked = likes.includes(userId);
    const handleLike = () => (isLiked ? removeFromLikes() : addTolikes());

    return (
        <>
            <Row
                className="p-3"
                style={{
                    borderTop: "1px solid #D3D3D3",
                    borderBottom: "1px solid #D3D3D3"
                }}
            >
                <Col sm={1}>
                    <Image src={pic} fluid roundedCircle />
                </Col>

                <Col style={{ position: "relative" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Haris</strong>
                            <span> @haris.samingan · Apr 16</span>
                        </div>
                        <div>
                            <Button
                                variant="warning"
                                className="me-2 text-white"
                                onClick={handleShowUpdateModal}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button variant="danger">
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </div>

                    <p>{content}</p>
                    <Image src={imageUrl} key={imageUrl} fluid style={{ maxHeight: "400px", maxWidth: "100%" }} />

                    <div className="d-flex justify-content-between mt-2">
                        <Button variant="light">
                            <i className="bi bi-chat"></i>
                        </Button>
                        <Button variant="light">
                            <i className="bi bi-repeat"></i>
                        </Button>
                        <Button variant="light" onClick={handleLike}>
                            {isLiked ? (
                                <i className="bi bi-heart-fill text-danger"></i>
                            ) : (
                                <i className="bi bi-heart"></i>
                            )}
                            {likes.length}
                        </Button>
                        <Button variant="light">
                            <i className="bi bi-graph-up"></i>
                        </Button>
                        <Button variant="light">
                            <i className="bi bi-upload"></i>
                        </Button>
                    </div>
                </Col>

            </Row >

            <UpdatePostModal
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                postId={postId}
                originalPostContent={content}
                imageUrl={imageUrl}
            />
        </>
    )
}

