import styled from "styled-components";
import playersData from "../fakeData.json";
import uuid from "react-uuid";
import logo from "../assets/t1-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  color: white;
`;

const StHeader = styled.header`
  width: 100%;
  height: 260px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
const StImg = styled.img`
  width: 100px;
  height: 100px;
`;

const StForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  width: 550px;
  height: 300px;
  padding: 10px;
  position: relative;
`;

const StLabel = styled.label`
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const StInput = styled.input`
  height: 25px;
  width: 250px;
  padding: 4px;
  font-size: 14px;
`;

const StTextArea = styled.textarea`
  height: 40px;
  width: 250px;
  font-size: 14px;
`;

const StSelect = styled.select`
  width: 100px;
  height: 25px;
`;

const StSubmitBtn = styled.button`
  width: 70px;
  height: 30px;
  background-color: red;
  color: white;
  border: none;
  position: absolute;
  bottom: 20px;
`;

const StMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`;

function Home() {
  const [data, setData] = useState(playersData);

  const [nickName, setNickName] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("Jeus");

  const inputNicNameHandler = (event) => {
    const inputValue = event.target.value;

    // input validation -  maxLength : 20
    if (inputValue.length <= 20) {
      setNickName(inputValue);
    }
  };

  const inputContentHandler = (event) => {
    const inputValue = event.target.value;

    // input validation -  maxLength : 20
    if (inputValue.length <= 100) {
      setContent(inputValue);
    }
  };

  const navigate = useNavigate();

  let newData = {};

  const submitFormHandler = (event) => {
    event.preventDefault();
    newData = {
      id: uuid(),
      name: selectedPlayer,
      nickName,
      content,
      wroteTo: selectedPlayer,
    };
    console.log("newData =>", newData);

    setData((data) => [...data, newData]);

    setNickName("");
    setContent("");

    const confirmMessage = window.confirm("메세지를 전송 하시겠습니까?");

    confirmMessage
      ? navigate(`/players/${selectedPlayer}`, {
          state: { comment: [...data, newData] },
        })
      : navigate("/");
  };

  const optionHandler = (event) => {
    setSelectedPlayer(event.target.value);
  };

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
        <h2>T1 선수들에게 메세지를 남겨주세요!</h2>
      </StHeader>
      <StMain>
        <StForm onSubmit={submitFormHandler}>
          <StLabel>
            닉네임 &nbsp;
            <StInput
              type="text"
              placeholder="최대 20글자까지 작성할 수 있습니다."
              value={nickName}
              onChange={inputNicNameHandler}
              required
            />
          </StLabel>
          <StLabel>
            내용 &nbsp;
            <StTextArea
              placeholder="최대 100자까지만 작성할 수 있습니다."
              maxLength={100}
              value={content}
              onChange={inputContentHandler}
              required
            />
          </StLabel>
          <StLabel>
            보낼 대상 &nbsp;
            <StSelect onChange={optionHandler} value={selectedPlayer}>
              {data.map((item) => {
                return (
                  <>
                    <option key={item.id}>{item.name}</option>
                  </>
                );
              })}
            </StSelect>
          </StLabel>
          <StSubmitBtn type="submit">등록</StSubmitBtn>
        </StForm>
      </StMain>
      <footer>© Made by im2hw</footer>
    </StBox>
  );
}

export default Home;
