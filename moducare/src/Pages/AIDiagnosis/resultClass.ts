const graphData = (resultData: number[]) => {
  console.log('resultData', resultData);
  const labelTextStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: '#888',
  };

  return [
    {
      value: resultData[0],
      label: '탈모',
      // labelTextStyle: labelTextStyle,
    },
    {
      value: resultData[1],
      label: '비듬',
      // labelTextStyle: labelTextStyle,
    },
    {
      value: resultData[2],
      label: '염증',
      // labelTextStyle: labelTextStyle,
    },
    {
      value: resultData[3],
      label: '홍반',
      // labelTextStyle: labelTextStyle,
    },
    {
      value: resultData[4],
      label: '피지',
      // labelTextStyle: labelTextStyle,
    },
    {
      value: resultData[5],
      label: '각질',
      // labelTextStyle: labelTextStyle,
    },
  ];
};

const getHeadType = (type: number) => {
  switch (type) {
    case 0:
      return '정상';
    case 1:
      return '건성 두피';
    case 2:
      return '지성 두피';
    case 3:
      return '민감성 두피';
    case 4:
      return '지루성 두피';
    case 5:
      return '염증성 두피';
    case 6:
      return '비듬성 두피';
    case 7:
      return '탈모';
    default:
      return '데이터 이상!';
  }
};

const getComparisonText = (comparison: number) => {
  switch (comparison) {
    case 0:
      return '두피가 나빠지고 있어요!';
    case 1:
      return '두피가 좋아졌어요!';
    case 2:
      return '두피 상태를 유지 중이에요!';
    case 3:
      return '두피를 잘 가꾸어 보도록 해요!';
    default:
      return '데이터 이상!';
  }
};

export {graphData, getHeadType, getComparisonText};