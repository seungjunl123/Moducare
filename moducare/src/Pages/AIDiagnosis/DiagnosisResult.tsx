import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import CustomButtom from '../../Components/Common/CustomButton';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import {BarChart} from 'react-native-gifted-charts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {RootStackParamList} from '../../navigate/StackNavigate';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {useReportDetailQuery} from '../../quires/useReportsQuery';
import {graphData, getHeadType, getComparisonText} from './resultClass';

const DiagnosisResult = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'aiResult'>;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {type, id, diagnosisResult} = route.params;
  const {data: diagnosisData} = useReportDetailQuery(id ?? 0, {
    enabled: type === 'report',
  });
  const resultData = type === 'diagnosis' ? diagnosisResult : diagnosisData;
  const data = graphData(resultData.result);
  const headType = getHeadType(resultData.headType);
  const comparisonText = getComparisonText(resultData.comparison);

  const careText: string = `첫째, 두피를 깨끗하게 유지하려면 적어도 주 2-3회 샴푸로 세척해줘야 해요. 둘째, 너무 뜨거운 물보다는 미지근한 물을 사용하는 게 좋아요. 셋째, 각질 제거를  위해 주 1회 스크럽이나 두피 마스크를 사용해보세요.\n
또한, 두피도 보습이 필요하니까 두피 전용 오일이나 세럼을 사용해 보습해주는 게 좋고요. 건강한 모발을 위해 균형 잡힌 식사를 하고, 스트레스는 운동이나 명상으로 관리해보세요. 자외선 차단도 잊지 말고, 마지막으로 두피 마사지를 통해 혈액순환을 촉진해주면 도움이 됩니다.`;

  const yAxisTextStyle = {
    fontSize: 12,
    color: '#888',
  };

  // pdf
  const [pdfPath, setPdfPath] = useState('');
  const htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        p { font-size: 15px; }
		h2 {
          display : flex;
          justify-content: center;
          align-items: center;
          font-size: 40px;
        }
        h3{
         font-size: 30px;   
        }
        h4 {
          font-size: 20px;
        }
        span {
          color : #946038;
        }

        #paper {
  			width: 21cm;
  			min-height: 29.7cm;
  			padding: 1.5cm 1.5cm 2cm 1.5cm;
		}
        #pictureContainer {
  			display: flex;  /* Flexbox 사용 */
  			justify-content: center; /* 양쪽 정렬 */
  			align-items: center; /* 세로 중앙 정렬 */
            gap: 20px;
		}
        img {
          border-radius : 10px;
          width : 400px;
        }
        
        #pictureContainer div {
          display : flex;
          flex-direction : column;
          align-items: center;
        }
        
        #pictureContainer div {
          display : flex;
          flex-direction : center;
          align-items: center;
        }
  		#result-graph {
  		 display: flex;
  		 flex-direction: row; /* 가로 방향 정렬 */
  		 justify-content: center; /* 중앙 정렬 */
  		 align-items: flex-end; /* 아래쪽 정렬 (막대 그래프처럼 보이도록) */
  		 gap: 50px; /* 막대 사이의 간격 */
		}
  		#result-graph .gb {
  		 display: flex;
  		 flex-direction: column;
  		 align-items: center;
		}        
		#result-graph .bar {
 	 	 width: 30px;
  		 background-color: #72635A; /* 막대 기본 색상 */
  		 border-radius: 5px;
		}
        #recommend-text {
  		 display: flex;
         flex-direction: column; /* 가로 방향 정렬 */
  		 align-items: center;
         justify-content:center;
        }
        
      </style>
    </head>
    <body>
      <div id='paper'>
		<h2>
          ModuCare 두피 진단 결과지
      </h2>
      <div id="pictureContainer">
        <div>
          <h4>
            제공된 두피 사진
          </h4>
           <img class="picture" src="https://moducare.s3.ap-northeast-2.amazonaws.com/eb042bcb-95a6-48de-b7e4-ef783f4d5b0e.png" alt="...">
        </div>
        <div>
       	  <h4>
            건강한 두피 사진
          </h4>
          <img class="picture" src="https://moducare.s3.ap-northeast-2.amazonaws.com/eb042bcb-95a6-48de-b7e4-ef783f4d5b0e.png" alt="...">
        </div>
      </div>
      <div id="pictureContainer">
          <h4>AI 두피 진단 결과 <span>정상</span>입니다.</h4>
      </div>
      <div id="result-graph"> 
        <div class="gb">
          <div>
           30
          </div>
          <div class="bar tm" style="height: 150px;"></div>
          <h5>
            탈모
          </h5>
        </div>
        <div class="gb">
          <div>
           34
          </div>
          <div class="bar bd" style="height: 180px;"></div>
          <h5>
            비듬
          </h5>
        </div>
        <div class="gb">
          <div>
           26 
          </div>
          <div class="bar yj" style="height: 120px;"></div>
          <h5>
            염증
          </h5>
        </div>
        <div class="gb">
          <div>
           26 
          </div>
          <div class="bar hb" style="height: 120px;"></div>
          <h5>
            홍반
          </h5>
        </div>
        <div class="gb">
          <div>
           14 
          </div>
          <div class="bar pj" style="height: 50px;"></div>
          <h5>
            피지
          </h5>
        </div>
        <div class="gb">
          <div>
           36 
          </div>
          <div class="bar gj" style="height: 200px;"></div>
          <h5>
            각질
          </h5>
        </div>
      </div>
      <div class="RecommendContainer">
        <h4>
          MODU가 관찰한 두피 결과
        </h4>
        <h3>
		 최근  검사에 비해 <span>두피가 좋아졌어요!!</span>
        </h3>
        <div id="recommend-text">
           	<img class="picture" src="https://moducare.s3.ap-northeast-2.amazonaws.com/eb042bcb-95a6-48de-b7e4-ef783f4d5b0e.png" alt="...">
          	<h4>
첫째, 두피를 깨끗하게 유지하려면 적어도 주 2-3회 샴푸로 세척해줘야 해요. 둘째, 너무 뜨거운 물보다는 미지근한 물을 사용하는 게 좋아요. 셋째, 각질 제거를  위해 주 1회 스크럽이나 두피 마스크를 사용해보세요.
              <br>
또한, 두피도 보습이 필요하니까 두피 전용 오일이나 세럼을 사용해 보습해주는 게 좋고요. 건강한 모발을 위해 균형 잡힌 식사를 하고, 스트레스는 운동이나 명상으로 관리해보세요. 자외선 차단도 잊지 말고, 마지막으로 두피 마사지를 통해 혈액순환을 촉진해주면 도움이 됩니다.
            </h4>
        </div>
      </div>
      </div>
    </body>
  </html>
`;
  const generatePDF = async () => {
    try {
      const options = {
        html: htmlContent,
        fileName: 'testpdf', // PDF 파일 이름
        directory: 'docs', // 파일이 저장될 디렉토리 (기본값은 documents)
      };

      // PDF 생성
      const file = await RNHTMLtoPDF.convert(options);

      // 생성된 PDF 파일 경로 출력
      console.log('PDF 파일 경로:', file.filePath);
      setPdfPath(file.filePath);
    } catch (error) {
      console.error('PDF 생성 오류:', error);
    }
  };
  //
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 5}}>
        <View style={styles.photoArea}>
          <View style={styles.photoDetailArea}>
            <CustomText label="제공된 두피 사진" size={20} />
            <Image style={styles.photo} source={{uri: resultData.img}} />
          </View>
          <View style={styles.photoDetailArea}>
            <CustomText label="건강한 두피 사진" size={20} />
            <Image
              style={styles.photo}
              source={require('../../assets/good.png')}
            />
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.checkText}>
            AI 두피 진단 결과
            <Text style={styles.checkResult}> {headType}</Text> 입니다.
          </Text>
        </View>
        <CustomText label={'두피 상세 분석'} size={16} />
        <View style={styles.ResultGraph}>
          <BarChart
            // 기본
            data={data}
            width={300}
            height={200}
            disablePress // 누루기 동작 비활성화
            // bar
            // initialSpacing={20} // 초기 간격
            // spacing={30} // bar 간격
            barBorderRadius={2}
            // barWidth={12} // bar width
            frontColor={colors.MAIN} // bar 색상
            // x축
            xAxisIndicesColor={'#D9D9D9'} // x축 단계별 표시 색상
            xAxisColor={'#d9d9d9'} // x축 색상
            // y축
            yAxisTextStyle={yAxisTextStyle}
            yAxisThickness={0} // 메인 y축
            noOfSections={3} // 가로 회색줄 갯수
            isAnimated
          />
        </View>
        <View style={styles.checkArea}>
          <View style={{width: '100%'}}>
            <CustomText label="MODU가 관찰한 두피 결과" size={20} />
            <Text
              style={styles.checkText}
              // 이거 맨 처음 나오는 데이터에 따라 넣을지 말지 고민해야될듯
            >
              최근 검사에 비해
              <Text style={styles.checkResult}> {comparisonText}</Text>
            </Text>
          </View>
          <SvgIconAtom name="Good" />
        </View>
        <View style={styles.careArea}>
          <CustomText label="MODU가 추천하는 관리비결" size={20} />
          <Text style={styles.careText}>
            {resultData.manageComment || careText}
          </Text>
        </View>
        <View style={styles.BtnArea}>
          <CustomButtom
            label="나에게 맞는 샴푸 확인하기"
            onPress={() =>
              navigation.navigate('aiPick', {
                type: resultData.headType,
                result: resultData.result,
              })
            }
          />
          <CustomButtom label="두피 검진 문서 생성" onPress={generatePDF} />
          <CustomButtom
            label="메인으로"
            onPress={() => navigation.navigate('bottomNavigate')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    // alignItems: 'center',
    padding: 15,
  },

  photoArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  photoDetailArea: {
    width: '50%',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    resizeMode: 'cover',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },

  checkArea: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  checkText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  checkResult: {
    fontSize: 25,
    fontFamily: 'Pretendard-ExtraBold',
    color: colors.MAIN,
  },

  careArea: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  careText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },

  BtnArea: {
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
  ResultGraph: {
    gap: 10,
    marginVertical: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default DiagnosisResult;
