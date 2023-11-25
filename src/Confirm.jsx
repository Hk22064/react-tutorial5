import React, { useState } from 'react';
import { Button } from 'antd';
const Confirm = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [ConfirmCount, setConfirmCount] = useState(0);
  const secretText = '尾上洋介'; 
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  
  

  const handleAuthentication = async () => {
    if (inputText === secretText) {
      setConfirmCount(ConfirmCount + 1);
      setDisplayText('認証成功:5422064 畠谷佳汰');
    } else {
      setDisplayText('認証失敗');
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="名前を入力してください"
        value={inputText}
        onChange={handleInputChange}
      />
      <Button onClick={handleAuthentication}>認証</Button>
      {displayText && <p>{displayText}</p>}
      <p>認証した回数: {ConfirmCount}</p>
    </div>
  );
};

export default Confirm;
