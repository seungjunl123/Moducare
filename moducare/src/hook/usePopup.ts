import {useState} from 'react';

type PopupOption = 'Alert' | 'confirmMark' | 'Loading';

interface PopupConfig {
  option: PopupOption;
  content: string;
}

export const usePopup = () => {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState<PopupOption>('Alert');
  const [content, setContent] = useState('');

  const showPopup = ({option, content}: PopupConfig) => {
    setOption(option);
    setContent(content);
    setVisible(true);
  };

  const hidePopup = () => {
    setVisible(false);
  };

  return {
    visible,
    option,
    content,
    showPopup,
    hidePopup,
  };
};
