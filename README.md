# 타입스크립트 프로그래밍

- 더 빠르고 안정적인 자바스크립트 앱 개발을 위한 핵심 기능과 활용법
- 저자 : 보리스 체르니

## 스터디

- 시간 : 월, 수, 금 오후 9시
- 장소 : [게더타운](https://app.gather.town/app/zvVfLbjGc6DVVluv/DeepDiveStudy)
- 소통 : [슬랙](https://metacognition-hq.slack.com/archives/C03DZ8G0V5F)
- 진행 방식
  - 한명씩 돌아가면서 발표(chapter 2개씩)
    - 발표 순서 : 토니 -> 위즈
  - 발표자가 아니더라도 공부해와서 토론
  - 스터디 시작 전까지 공부한 내용 커밋하기

## 차례

- [x] 1. 소개 - 2022.05.04
- [x] 2. 타입스크립트 : 3,000미터 상공에서 내려다보기 - 2022.05.06
- [x] 3. 타입의 모든 것 - 2022.05.06
- [x] 4. 함수 - 2022.05.11
- [x] 5. 클래스와 인터페이스 - 2022.05.13
- [x] 6. 고급 타입 - 2022.05.18
- [x] 7. 에러 처리 - 2022.05.20
- [x] 8. 비동기 프로그래밍, 동시성과 병렬성 - 2022.05.23
- [ ] 9. 프론트엔드 프레임워크와 백엔드 프레임워크
- [ ] 10. Namespaces.Modules
- [ ] 11. 자바스크립트와 상호 동작
- [ ] 12. 타입스크립트 빌드 및 실행
- [ ] 13. 결론

## 서문

- 기존에 어떤 언어를 사용했든 약간의 프로그래밍 경험과 함수, 변수, 클래스, 에러와 관련된 기본 지식이 있다면
  이 책을 소화하는데 무리가 없다.

- 이 책은 타입스크립트가 어떻게 동작하는지 이해를 돕는 것 - 이론 - 과
- 실무에서 타입스크립트 코드를 어떻게 구현할 수 있는지 다양한 도움을 제공하는 것 - 실용 -
  이렇게 두 가지를 목표로 삼았다
- 앞 부분 몇 개의 장은 이론을
- 마지막 장은 실용적인 부분
- 나머지 장에는 이론과 실용이 적절하게 섞여 있다

- 마지막 장의 연습문제 답안
  - https://github.com/bcherny/programming-typescript-answers

## commit 및 push 방법

- 각 장의 폴더에 본인의 이름(닉네임)으로 폴더를 만들고 그 안에 공부내용을 정리한 뒤 올린다.
- e.g., 02\_상공에서-내려다보기 > Tony > 02_summary.md
- 본인 이름으로 된 폴더를 만들어서 정리해서 충돌이 날일이 없기 때문에 main에 직접 push한다.
  - 브랜치를 따서 pull request 이후 merge 하셔도 됩니다

### 터미널 명령어

- git pull
- git add .
- git commit -m "`이름` : `내용`"
- git push origin main
