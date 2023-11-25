import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const Confirm = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [visitorCount, setVisitorCount] = useState(0); // 訪問者数を保持するステート
  const secretText = '尾上洋介'; 


  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const fetchVisitorCount = async () => {
    try {
      await axios.get('https://api.countapi.xyz/hit/homeviewer/5422064');
      const response = await axios.get('https://api.countapi.xyz/hit/homeviewer/5422064');
      const count = response.data.value;
      setVisitorCount(count);
    } catch (error) {
      console.error('訪問者数の取得エラー:', error);
    }
  };
  

  const handleAuthentication = async () => {
    if (inputText === secretText) {
      await fetchVisitorCount(); 
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
      <p>訪問した人数: {visitorCount}</p>
    </div>
  );
};

export default Confirm;
