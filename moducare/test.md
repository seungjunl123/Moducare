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

|                   이름                   |   역할   | 소감                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------------------------------: | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| ![박민지](./imgs/박민지.jpg) <br>박민지  | 팀장(BE) | 이 프로젝트는 단순히 결과물을 만드는 데 그치지 않고, 기술적 도전과 팀원들의 협력을 통해 큰 성장을 이룰 수 있었던 기회였습니다. 팀원들의 노력과 열정에 깊은 감사를 전하며, 이번 경험을 바탕으로 더 나은 서비스를 기획하고 실행할 자신감을 얻게 되었습니다. "문제를 해결하는 데 팀워크와 열린 마음이 가장 큰 자산"이라는 점을 다시금 깨달았고, 앞으로의 도전을 기대하게 된 소중한 시간이었습니다.                                                                                                                                                                                                                                                                                                            |
| ![오진영](./imgs/오진영.jpg) <br> 오진영 |    FE    | 처음 프로젝틀 기획할 때 대학 졸업작품으로 하고싶었던 주제를 장난 반, 진심 반으로 아이디어를 냈는데 이게 프로젝트 주제로 진행될 줄은 꿈에도 몰랐습니다. 그래서 그런지 어려움이 많은 프로젝트임에도 불구하고 팀원분들이 적극적으로 임해주어서 대단히 고마웠고 FE 개발을 하면서 데이터 시각화를 보다 심도있게 해보고 Tanstack Query를 활용해서 동적 할당도 해보는 등 많은 경험을 할 수 있어서 참 의미있는 프로젝트였던 것 같습니다.<br> 또한 처음으로 렌더링 및 성능 최적화도 해보았는데 렌더링은 눈에 띄게 줄었지만 성능 측면에서 많이 최적화 하지 못한 점이 아쉬움에 남습니다.<br>다음 프로젝트에서는 이 점을 보완하여 조금 더 발전할 수 있는 프로젝트가 되었으면 좋겠습니다. <br>모두 고생했고 감사합니다~ |
| ![유현진](./imgs/유현진.jpg) <br>유현진  |    BE    | PostgreSQL과 Redis를 사용하여 대량 데이터 처리 경험을 할 수 있었습니다. 이 과정을 통해서 Redis에 대해 자세히 학습할 수 있는 기회를 가지게 되었습니다. 또한 백엔드 코드 컨벤션을 통해 exception Handler를 만들어 사용함으로써 코드의 일관성을 유지할 수 있었고 해당 프로젝트를 통해 새로운 기술을 배우고 학습할 수 있어서 좋았습니다.                                                                                                                                                                                                                                                                                                                                                                       |
| ![정동찬](./imgs/정동찬.jpg) <br> 오승준 |    FE    | 첫 번째 프로젝트 때와 달리 프론트엔드 개발의 기본적인 요소인 화면 설계 및 구현 역할에 좀더 치중했습니다. 이전 프로젝트에서 부족했던 부분을 이번에 보완해 보자고 생각해, Redux Toolkit과 같은 본격적인 상태관리 라이브러리를 적용하고, 컴포넌트의 역할에 따라 충분히 나누어 구현하는 데 중점을 두었습니다. 특히 PWA 서비스의 기능 대부분을 구현하는 과정에서 API를 설계하고 연결하는 작업 중 백엔드 담당과 많은 이야기를 하며 소통의 중요성을 깊이 느꼈습니다.                                                                                                                                                                                                                                              |
| ![박병준](./imgs/박병준.jpg) <br>최태민  |  인프라  | 이번 프로젝트에서 인프라를 담당하며 평소 해보고 싶었던 것들을 많이 해보았습니다. Blue-Green 배포를 구현하거나 HaProxy를 사용하여 로드밸런싱을 하는 등 실제 배포환경에서 신경 쓸 부분에 대해서 많이 배워간다는 생각이 듭니다. 특히 신경 썼던 부분중 하나가 .env파일이나 properties의 key값 등을 공개되지 않도록 신경쓰는 부분이었는데, 프로젝트 내내 지켜진 것 같아 조금은 뿌듯하게 느껴집니다.                                                                                                                                                                                                                                                                                                             |
| ![김종원](./imgs/김종원.jpg) <br>서두나  |    AI    | AI를 처음 접해 어려웠지만 모델에 관해 공부하면서 발생한 시행착오와 학습 과정에서 많이 배웠습니다. 그리고 팀원들의 도움 덕분에 완성할 수 있어서 고마웠습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |     |

## 참고 및 출처

- AI데이터 : https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=216
