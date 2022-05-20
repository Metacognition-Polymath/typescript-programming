// 연습문제

class API {
  getLoggedInUser() {
    return {
      id: 1,
      name: "Tony",
    };
  }
  getFriendIDs(userId: number) {
    return [1, 2, 3];
  }
  getUserName(userId: number) {
    return "Tony";
  }
}

const api = new API();

try {
  api.getLoggedInUser();
} catch (error) {
  // 예외 처리
}
