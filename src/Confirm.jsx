import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import countapi from 'countapi-js';

const Confirm = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [confirmCount, setConfirmCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const secretText = '尾上洋介';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAuthentication = async () => {
    if (inputText === secretText) {
      setConfirmCount(confirmCount + 1);
      setDisplayText('認証成功: 5422064 畠谷佳汰');
    } else {
      setDisplayText('認証失敗');
    }
  };

  useEffect(() => {
    countapi.get('Confirmtest001', '22064').then((result) => {
      setTotalVisitors(result.value);
    });
  }, []);

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
      <p>認証した回数: {confirmCount}</p>
      <p>累計訪問者数: {totalVisitors}</p>
    </div>
  );
};

export default Confirm;
