import React from "react";

interface CommentProps {
  username: string;
  content: string;
  time: string;
  like: number;
  activeUser: string;
}

const Comment = ({
  username,
  time,
  like,
  content,
  activeUser
}: CommentProps) => {
  return (
    <div className="reply-list">
      {/* comment item */}
      <div className="reply-item">
        {/* profile */}
        <div className="root-reply-avatar">
          <div className="bili-avatar">
            <img className="bili-avatar-img" alt="" />
          </div>
        </div>

        <div className="content-wrap">
          <div className="user-info">
            <div className="user-name">{username}</div>
          </div>

          <div className="root-reply">
            <span className="reply-content">{content}</span>
            <div className="reply-info">
              {/* comment created time */}
              <span className="reply-time">{time}</span>
              {/* total likes */}
              <span className="reply-time">Like:{like}</span>
              {activeUser === username && (
                <span className="delete-btn">Delete</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
