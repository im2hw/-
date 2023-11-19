import styled from "styled-components";
import logo from "../assets/t1-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import playersData from "../fakeData.json";

const StBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  color: white;
  padding: 30px;
`;
const StHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const StButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: white;
  margin-left: 4px;
  color: black;
  border: none;
  &:hover {
    color: red;
  }
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
`;

const StDiv = styled.div`
  border: 1px solid white;

  height: 140px;
  color: white;

  margin: 10px;
`;

const StComment = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StContent = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

function Players() {
  const navigate = useNavigate();
  const location = useLocation();

  // 삭제 버튼 - useState
  const [comments, setComments] = useState(location.state.comment || []);
  console.log(comments);

  // 수정 버튼 - useState
  const [editingCommentId, setEditingCommentId] = useState(null);

  const param = useParams();

  const data = location.state.comment;
  const players = comments
    .filter((player) => player.wroteTo === param.id)
    .map((player) => (player.wroteTo === param.id ? player : null))
    .filter((player) => player !== null);

  useEffect(() => {
    // Update the comments state when the location state changes
    setComments(location.state.comment || []);

    // Save to localStorage
    localStorage.setItem(
      "comment",
      JSON.stringify(location.state.comment || [])
    );
  }, [location.state.comment]);

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSave = (commentId, editedContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, content: editedContent }
        : comment
    );
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  const playerImg = playersData.img;
  console.log(playerImg);

  return (
    <StBox>
      <StHeader>
        <StImg
          src={logo}
          alt="T1로고 이미지"
          onClick={() => {
            navigate("/");
          }}
        />
        <div>
          <StButton
            style={{
              backgroundColor: param.id === "Jeus" ? "red" : "white",
              color: param.id === "Jeus" ? "white" : "black",
            }}
            onClick={() => {
              navigate("/players/Jeus", { state: { comment: data } });
            }}
          >
            Jeus
          </StButton>
          <StButton
            style={{
              backgroundColor: param.id === "Oner" ? "red" : "white",
              color: param.id === "Oner" ? "white" : "black",
            }}
            onClick={() => {
              navigate("/players/Oner", { state: { comment: data } });
            }}
          >
            Oner
          </StButton>
          <StButton
            style={{
              backgroundColor: param.id === "Faker" ? "red" : "white",
              color: param.id === "Faker" ? "white" : "black",
            }}
            onClick={() => {
              navigate("/players/Faker", { state: { comment: data } });
            }}
          >
            Faker
          </StButton>
          <StButton
            style={{
              backgroundColor: param.id === "Gumayusi" ? "red" : "white",
              color: param.id === "Gumayusi" ? "white" : "black",
            }}
            onClick={() => {
              navigate("/players/Gumayusi", { state: { comment: data } });
            }}
          >
            Gumayusi
          </StButton>
          <StButton
            style={{
              backgroundColor: param.id === "Keria" ? "red" : "white",
              color: param.id === "Keria" ? "white" : "black",
            }}
            onClick={() => {
              navigate("/players/Keria", { state: { comment: data } });
            }}
          >
            Keria
          </StButton>
        </div>
      </StHeader>
      <main>
        <img src={""} alt="선수 이미지" className={players[0].name} />
        <h2>{players[0].name}의 공간에 오신 것을 환영합니다.</h2>
        <div>
          {players.map((player) => {
            return (
              <StDiv key={player.id} className="comment-box">
                <h4>닉네임: {player.nickName}</h4>
                {editingCommentId === player.id ? (
                  <>
                    <textarea
                      value={player.content}
                      onChange={(e) => handleSave(player.id, e.target.value)}
                    />
                    <button
                      onClick={() => handleSave(player.id, player.content)}
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <StContent> 내용: {player.content}</StContent>
                    <button onClick={() => handleEdit(player.id)}>수정</button>
                  </>
                )}
                <button
                  onClick={() => {
                    const deleteComment = comments.filter(
                      (filteredComment) => filteredComment.id !== player.id
                    );
                    setComments(deleteComment);
                  }}
                >
                  삭제
                </button>
              </StDiv>
            );
          })}
        </div>
      </main>
    </StBox>
  );
}

export default Players;
