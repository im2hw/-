import styled from "styled-components";
import logo from "../assets/t1-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const StBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
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
  width: 500px;
  height: 50px;
  color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const StContent = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Stplayer = styled.img`
  width: 200px;
`;

const StSmallButton = styled.button`
  width: 55px;
  height: 30px;
  border-radius: 10px;
  background-color: white;
  color: black;
  border: none;
  &:hover {
    background-color: red;
    color: white;
  }
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

  const playerImg = [
    {
      name: "Jeus",
      img: "https://i.namu.wiki/i/ZbG6_4Tapcaw8KRL67k4gODQTxNWWmZJX3v5AD-jwuE4RcQ3efq08rh6Hf0RPj02ah9rS20aIAUKY0DipXPzUMhW9LfJGwBC9B1sFISD0ZCsJ-7n8AUCKh83cvUt5hDM4qHhfvnL0MQ04kFLPv1y0Q.webp",
    },
    {
      name: "Oner",
      img: "https://i.namu.wiki/i/9yVZyfO6GkELxynxREzLLyk7__5umuX1xghjK5kqYX_K9pkF4d70e-_jhjRtJTs1DwjxF6K4EY01QyDxhKKULcVLSq5KL2Vvo5bTRh3s0pyTFrWvm6yMqrTV35_LUIblbaoPLA_cShfNbd8UK8ppTA.webp",
    },
    {
      name: "Faker",
      img: "https://i.namu.wiki/i/9Wrnx48F7h_8gQJ4JXZJpLnvNs47pFeZHboLg6BI6yIisPX6YacPcPLV5PZwxIpyQz6tD7orzEobHT0cxJtpljItI-dCmDO46rGJomX53dn7GY6aoVL_6xHtBWuQUp-FJs0TyNcp5B_jHKXuwUO9-Q.webp",
    },
    {
      name: "Gumayusi",
      img: "https://i.namu.wiki/i/jrIiQS_IaWB5GhFs8RVM2xob9epyPu9AuuEN0oZe8wMPq5L1njKm54d8rXHCX1d-O_RLtlMZEkdFEKBVf3GzeV-Zwb7lG_61GO5JJ_ziPo_GEQW4z90ji2WqK42xfyaXFUovUz21yk2KmZ7witTTgA.webp",
    },
    {
      name: "Keria",
      img: "https://i.namu.wiki/i/hyw12c7O8ze0ciMH0STXu51z2zBdBpvL-n2xKrb565izis9hzLkLrarsPZAGBNowx1a9vMXo6P-VVm69L4wOuu71pKjuFzecp9LEzx94I5u6tqhOgjonKAKbhuAeZI54Np5PeyHBgW0fR355cQN_Mw.webp",
    },
  ];

  const bannerImg = playerImg.find((item) => item.name === param.id)?.img || "";

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
      <main style={{ marginTop: "30px" }}>
        <Stplayer
          src={bannerImg}
          alt="선수 이미지"
          className={players[0].name}
        />
        <h2>{players[0].name}의 공간에 오신 것을 환영합니다.</h2>
        <div>
          {players.map((player) => {
            return (
              <StDiv key={player.id} className="comment-box">
                <h4 style={{ marginRight: "20px" }}>{player.nickName}</h4>
                {editingCommentId === player.id ? (
                  <>
                    <textarea
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        width: " 300px",
                        height: "45px",
                      }}
                      value={player.content}
                      onChange={(e) => handleSave(player.id, e.target.value)}
                    />
                    <StSmallButton
                      style={{ position: "absolute", right: "10px" }}
                      onClick={() => handleSave(player.id, player.content)}
                    >
                      저장
                    </StSmallButton>
                  </>
                ) : (
                  <>
                    <StContent style={{ marginRight: "20px" }}>
                      {" "}
                      {player.content}
                    </StContent>
                    <StSmallButton
                      style={{ position: "absolute", right: "10px" }}
                      onClick={() => handleEdit(player.id)}
                    >
                      수정
                    </StSmallButton>
                  </>
                )}
                <StSmallButton
                  style={{ position: "absolute", right: "70px" }}
                  onClick={() => {
                    const deleteComment = comments.filter(
                      (filteredComment) => filteredComment.id !== player.id
                    );
                    setComments(deleteComment);
                  }}
                >
                  삭제
                </StSmallButton>
              </StDiv>
            );
          })}
        </div>
      </main>
    </StBox>
  );
}

export default Players;
