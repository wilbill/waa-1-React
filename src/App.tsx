import React, { useState, useEffect } from "react";
import "./App.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";
import { CommentType } from "./types";
import Comment from "./components/Comment";

// current logged in user info
const user = {
  // userid
  uid: "30009257",
  // profile
  avatar,
  // username
  uname: "John"
};

// Nav Tab
const tabs = [
  { type: "hot", text: "Top" },
  { type: "newest", text: "Newest" }
];

const App = () => {
  const [activeTab, setActiveTab] = useState<null | string>(null);
  const [comments, setComments] = useState<[] | CommentType[]>([]);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getList() {
      setLoading(true);
      const res = await fetch("http://localhost:3004/list");
      const data = await res.json();
      setComments(_.orderBy(data, ["like"], ["desc"]));
      setLoading(false);
    }
    getList();
  }, []);

  const handleComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      rpid: comments.length + 1,
      user,
      content: comment,
      ctime: new Date().toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      like: 0
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  const handleTabClick = (type: string) => {
    setActiveTab(type);

    if (type === "hot") {
      setComments(_.orderBy(comments, ["like"], ["desc"]));
    } else if (type === "newest") {
      setComments(_.orderBy(comments, ["ctime"], ["desc"]));
    }
  };

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{comments.length}</span>
          </li>

          <li className="nav-sort">
            <span
              className={`nav-item ${activeTab === "hot" ? "active" : ""}`}
              onClick={() => handleTabClick("hot")}>
              Top
            </span>
            <span
              className={`nav-item ${activeTab === "newest" ? "active" : ""}`}
              onClick={() => handleTabClick("newest")}>
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              className="reply-box-textarea"
              placeholder="tell something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* post button */}
            <div className="reply-box-send" onClick={handleComment}>
              <div className="send-text">post</div>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading comment...</div>
        ) : (
          comments.map(({ user: usr, ctime, like, content }) => (
            <Comment
              time={ctime}
              like={like}
              content={content}
              username={usr.uname}
              activeUser={user.uname}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
