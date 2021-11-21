/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function UserInput({
  setInfo,
  userInfo,
  placeholder,
  inputType,
  onSubmit,
  loading,
  subscribePage,
  maxLength,
  customWidth,
  disabled,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let background;

  if (subscribePage) {
    background = loading ? '#d5cbdd' : '#e8dff0';
  } else {
    background = loading ? '#e3e3e3' : '#FFFFFF';
  }

  return (
    <UserInputArea customWidth={customWidth}>
      <Label constrict={focused || userInfo.length !== 0 ? 1 : 0}>
        {placeholder}
      </Label>
      <Input
        disabled={disabled}
        autoComplete="nope"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={showPassword ? 1 : inputType}
        onChange={(e) => setInfo(e.target.value)}
        value={userInfo}
        onKeyUp={(keyboard) =>
          onSubmit ? onSubmit(keyboard.nativeEvent.key) : ''
        }
        loading={loading ? 1 : 0}
        background={background}
        maxLength={maxLength}
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
  width: ${(props) => (props.customWidth ? props.customWidth : '100%')};
  position: relative;
`;

const Label = styled.p`
  transition: all 0.2s;
  font-size: ${(props) => (props.constrict ? '3vw' : '5vw')};
  color: ${(props) => (props.constrict ? '#6d7ce4' : '#60484866')};
  position: absolute;
  top: ${(props) => (props.constrict ? '5%' : '25%')};
  left: ${(props) => (props.constrict ? '15px' : '5%')};
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
  background-color: ${(props) => props.background};
  pointer-events: ${(props) => (props.loading ? 'none' : '')};
  overflow: hidden;
  text-overflow: ellipsis;
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
