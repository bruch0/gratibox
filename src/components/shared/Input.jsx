import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function UserInput({ setInfo, userInfo, placeholder, inputType, onEnter }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <UserInputArea>
      <Label constrict={focused || userInfo.length !== 0 ? 1 : 0}>
        {placeholder}
      </Label>
      <Input
        autoComplete="nope"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={showPassword ? 1 : inputType}
        onChange={(e) => setInfo(e.target.value)}
        value={userInfo}
        onKeyUp={(keyboard) => onEnter(keyboard.nativeEvent.key)}
      />
      {inputType === 'password' ? (
        <TooglePasswordVisibility
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </TooglePasswordVisibility>
      ) : (
        ''
      )}
    </UserInputArea>
  );
}

const UserInputArea = styled.div`
  width: 100%;
  position: relative;
`;

const Label = styled.p`
  transition: all 0.2s;
  font-size: ${(props) => (props.constrict ? '3vw' : '5vw')};
  color: ${(props) => (props.constrict ? '#6d7ce4' : '#60484866')};
  position: absolute;
  top: ${(props) => (props.constrict ? '5%' : '25%')};
  left: ${(props) => (props.constrict ? '4%' : '5%')};
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 5vw;
  font-family: 'Roboto', sans-serif;
  padding: 0px 15px;
`;

const TooglePasswordVisibility = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  margin: 0px;
  padding: 0px;

  svg {
    color: black;
    width: 40%;
    height: 40%;
  }
`;

export default UserInput;
