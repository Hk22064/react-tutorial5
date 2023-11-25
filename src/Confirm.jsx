import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const Confirm = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [successfulAuthCount, setSuccessfulAuthCount] = useState(0); // 成功した認証数を保持するステート
  const secretText = '尾上洋介'; 
  const countApiEndpoint = 'https://api.countapi.xyz';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAuthentication = async () => {
    if (inputText === secretText) {
      setDisplayText('認証成功:5422064 畠谷佳汰');
      // CountAPIを使用して成功した認証数を増やす処理を追加
      incrementSuccessfulAuthCount();
    } else {
      setDisplayText('認証失敗');
    }
  };

  const fetchSuccessfulAuthCount = async () => {
    try {
      const response = await axios.get(`${countApiEndpoint}/get/successful-auth-count`);
      const count = response.data.value;
      setSuccessfulAuthCount(count);
    } catch (error) {
      console.error('成功した認証数の取得エラー:', error);
    }
  };

  const incrementSuccessfulAuthCount = async () => {
    try {
      await axios.get(`${countApiEndpoint}/hit/successful-auth-count`);
      fetchSuccessfulAuthCount(); // 成功した認証数を再取得して更新
    } catch (error) {
      console.error('成功した認証数の増加エラー:', error);
    }
  };

  useEffect(() => {
    fetchSuccessfulAuthCount(); // コンポーネントがマウントされた時に成功した認証数を取得する
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
      <p>認証成功した人数: {successfulAuthCount}</p>
    </div>
  );
};

export default Confirm;
