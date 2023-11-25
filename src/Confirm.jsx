import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const Confirm = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [visitorCount, setVisitorCount] = useState(0); // 訪問者数を保持するステート
  const secretText = '尾上洋介'; 
  const countApiEndpoint = 'https://api.countapi.xyz';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get(`${countApiEndpoint}/get/your-namespace/visit`);
      const count = response.data.value;
      setVisitorCount(count);
    } catch (error) {
      console.error('訪問者数の取得エラー:', error);
    }
  };

  const handleAuthentication = async () => {
    if (inputText === secretText) {
      setDisplayText('認証成功:5422064 畠谷佳汰');
      await fetchVisitorCount(); 
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
      <p>訪問した人数: {visitorCount}</p>
    </div>
  );
};

export default Confirm;
