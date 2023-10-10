import  { useState } from 'react';
import {FaCopy} from "react-icons/fa"

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (event) => {
    event.preventDefault()
   
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setIsCopied(true);
  };

  return (
    <div>
      <button onClick={copyToClipboard}>
        <FaCopy className={`${isCopied ? 'text-violet-600' : 'text-gray-500'} text-lg`}/>
        
      </button>
    </div>
  );
};

export default CopyToClipboardButton;