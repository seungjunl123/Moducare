import {useState} from 'react';

type PopupOption = 'Alert' | 'confirmMark' | 'Loading';

interface PopupConfig {
  option: PopupOption;
  content: string;
  confirm?: () => void | 'none';
  cancel?: () => void | 'none';
}

export const usePopup = () => {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState<PopupOption>('Alert');
  const [content, setContent] = useState('');
  const [popupConfirm, setPopupConfirm] = useState<(() => void) | 'none'>();
  const [popupCancel, setPopupCancel] = useState<(() => void) | 'none'>();

  const showPopup = ({option, content, confirm, cancel}: PopupConfig) => {
    setOption(option);
    setContent(content);
    setPopupConfirm(confirm ?? 'none');
    setPopupCancel(cancel ?? 'none');
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
    popupConfirm,
    popupCancel,
  };
};
