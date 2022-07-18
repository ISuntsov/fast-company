import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import CommentsList, { AddCommentForm } from '../common/comments';
import Loader from './loader/loader';

// import { useComments } from '../../hooks/useComments';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from '../../store/comments';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getCurrentUserId } from '../../store/users';

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    // const { createComment, comments, removeComment } = useComments();
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                created_at: Date.now(),
                _id: nanoid(),
                pageId: userId,
                userId: currentUserId
            })
        );
        // createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
        // removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((com) => com._id !== id));
        // });
    };

    const sortedComments = orderBy(comments, ['created_at'], ['desc']);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Комментарии</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
