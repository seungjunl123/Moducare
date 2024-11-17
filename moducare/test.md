# MODUCARE - AI 두피진단 서비스

### ✍🏻 프로젝트 설명:

- 현재 대한민국 탈모 인구수는 매년 증가하여 천만 탈모인이라는 말이 나오고 있습니다. 높아진 탈모인구수는 2,30대 젊은층에도 영향을 많이 끼치고 있습니다. 이에 젋은 층들 사이에서 탈모 등 두피상태에 관심도가 높아진 만큼 AI를 활용하여 두피상태를 진단받고 두피 상품도 추천받을 수 있는 서비스를 제작하게 되었습니다.

- 저희 프로젝트는 사용자의 두피 이미지를 AI에게 제공하여 진단하여 결과를 제공하고 상태에 따라 케어 상품도 추천해드립니다. 추가로 사용자들간 챌린지 서비스를 통해 하루 한번 챌린지를 진행하고 인증사진을 공유할 수 있고 머리 다이어리로 정수리 & 이마라인의 변화를 볼 수 있습니다. 그 외에 날씨 & 두피와의 상관관계 및 진단결과를 PDF화 하여 따로 관리할 수 있습니다.

### 개발기간 :

- 2024.10.14 ~ 2024.11.19(6주)

### 개발환경 :

- 배포 환경 : EC2 ubuntu(20.04.6)
- GPU 서버 : Ubuntu(20.04), Python3.9

### 기술스택 :

- 백엔드 : <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/spring%20security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white"> <img src="https://img.shields.io/badge/JPA%20(Hibernate)-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
  <img src="https://img.shields.io/badge/FCM-FEC01F?style=for-the-badge&logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/ElasticSearch-005571?style=for-the-badge&logo=ElasticSearch&logoColor=white"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"><img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">

---

- 프론트엔드 : <img src="https://img.shields.io/badge/ReactNative-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-623400?style=for-the-badge&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/TanStackQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-00485B?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/PWA-00485B?style=for-the-badge&logo=PWA&logoColor=white">

---

- DevOps : <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">

---

- IOT : <img src="https://img.shields.io/badge/raspberrypi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white">

---

- AI : <img src="https://img.shields.io/badge/EfficientNet 0.71-000000?style=for-the-badge&logo=EfficientNet&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">

---

- tool : <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">

### 아키텍쳐 :

![캡처](./imgs/architecture.png)

### 주요기능

1. **두피 진단**
   - 진단
   - 맞춤형 제품 추천
   - AI, 진단 기록 문서화
2. **머리 다이어리**
3. **환경 데이터 연동**
4. **스트레스 지수 측정**
5. **루틴형 챌린지 참여**

### 팀원소개 : 

|                      이름                      |      역할       | 소감                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :--------------------------------------------: | :-------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  ![박민지](./imgs/박민지.jpg) <br>박민지  |    팀장(BE)     | 이 프로젝트는 단순히 결과물을 만드는 데 그치지 않고, 기술적 도전과 팀원들의 협력을 통해 큰 성장을 이룰 수 있었던 기회였습니다. 팀원들의 노력과 열정에 깊은 감사를 전하며, 이번 경험을 바탕으로 더 나은 서비스를 기획하고 실행할 자신감을 얻게 되었습니다. "문제를 해결하는 데 팀워크와 열린 마음이 가장 큰 자산"이라는 점을 다시금 깨달았고, 앞으로의 도전을 기대하게 된 소중한 시간이었습니다.                                                                                                                  |
| ![유현진](./imgs/유현진.jpg) <br> 유현진 |     BE     | 내용                                                                                                                                      |
| ![오진영](./imgs/오진영.jpg) <br>오진영  | FE  | 이전 프로젝트 모두 리액트를 기반으로 웹앱 서비스를 진행했었는데 내심 리액트네이티브를 하고싶은 마음이 생겼습니다. 그래서 이번에 한번 해보자는 마음으로 처음부터 공부해서 진행했는데 아무리 리액트와 유사하다고 하지만 생소한 부분이 많이 있는 바람에 조금은 힘들기도 했습니다. 다만 프로젝트를 마무리하고 나온 산출물을 보니 뿌듯함을 많이 느꼈습니다. TanStack-Query도 많이 학습해보고 리액트와 네이티브간에 페이지 전환의 차이점과 스타일링, 빌드 방식 등 차이를 많이 배울 수 있었습니다. 다음 프로젝트에서는 더욱 고도화하여 개인적으로 앱도 출시해보고 서비스를 운영해보고 싶단 생각이 들기도 했습니다. 모두 군말없이 열심히해주셔서 너무 좋았고 고마웠습니다!                                                                                                                                                                                                                                                                                                   |
| ![오승준](./imgs/오승준.jpg) <br> 오승준 |     FE      | 내용                                                                                                                                                      |
| ![최태민](./imgs/최태민.jpg) <br>최태민  |       인프라        | 내용  |
| ![서두나](./imgs/서두나.jpg) <br>서두나  |       AI        | AI를 처음 접해 어려웠지만 모델에 관해 공부하면서 발생한 시행착오와 학습 과정에서 많이 배웠습니다. 그리고 팀원들의 도움 덕분에 완성할 수 있어서 고마웠습니다.                                                                                                                                                                                                                                                             |                                                                                                                                                      |

## 참고 및 출처

- AI데이터 : https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=216
