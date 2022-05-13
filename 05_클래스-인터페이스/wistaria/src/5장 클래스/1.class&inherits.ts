/* 요약
 - class 로 클래스를 선언 extends 로 클래스를 상속
 - 클래스는 추상클래스와 구체클래스, 추상클래스는 추상메서드와 추상프로퍼티를 가질 수 있다.
 - 메서드는 public private protected 중 한가지 한정자를 가질 수 있고 기본값은 퍼블릭
 - 메서드는 인스턴스메서드와 정적(static)메서드로 구분
 - 클래스의 필드도 메서드와 같이 public private protected 중 한가지 한정자를 가질 수 있고 기본값은 퍼블릭
 - private 축약형으로 #사용이 가능.
 - 프로퍼티 선언시 readonly를 추가하여 이뮤터블로 만들 수 있음.
 */

// 체스엔진 1 
{
  class Game {}
  abstract class Piece { 
    // 3. 추상클래스는 인스턴스를 직접 생성할 수 없고,
    // 서브클래스(킹, 비숍 등)를 통해 생성할 수 있다.
    protected position: Position
    // 2. 프로텍트는 서브클래스의 접근이 가능
    constructor(
      private readonly color: Color, // 색과
      file: File,
      rank: Rank // 위치정보를 받아
    ) {
      this.position = new Position(file, rank) 
      // 위치 초기화. 포지션 객체를 포지션 필드에 저장하여 사용.
    }
  }
  // new Piece("White", "A", 1) 4. 추상 클래스의 인스턴스를 만들 수 없습니다.ts(2511)

  class Position {
    constructor(private file: File, private rank: Rank) {}
    // 1. 생성자 매개변수의 접근제한자는 자동으로 this에 할당하여 다음 코드를 생략할 수 있다.
    // this.#file = file
    // this.#rank = rank
    // private은 당연하게도 외부에서 접근이 불가능하다.
  }

  class King extends Piece {}
  class Queen extends Piece {}
  class Rook extends Piece {}
  class Bishop extends Piece {}
  class Knight extends Piece {}
  class Pawn extends Piece {}

  type Color = 'Black'|'White'
  type File = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H' // x축
  type Rank = 1|2|3|4|5|6|7|8 // y축
}

// 체스엔진 2 : 이동가능 위치확인 메서드
{
  abstract class Piece { 
    protected position: Position
    constructor(
      private readonly color: Color,
      file: File,
      rank: Rank
    ) {
      this.position = new Position(file, rank)
    }

    moveTo(position:Position) { // 1. 추상클래스도 메서드 만들기가 가능하다.
      this.position = position
    }
    abstract canMoveTo(position:Position):boolean 
    // 2. 추상클래스는 반드시 추상메서드를 포함해야한다.
    // 추상메서드는 서브클래스에서 오버라이딩해서 사용한다.
  }

  class Position {
    constructor(private file: File, private rank: Rank) {}
    // 3. 다른말과의 거리를 쉽게 계산하도록 작성
    distanceFrom(position:Position){
      return {
        rank: Math.abs(position.rank - this.rank), // y축 거리
        file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        // 문자 유니코드 변환해서 x축 거리측정
      }
    }
  }

  class King extends Piece {
    canMoveTo(position:Position) { // 4. 인수값의 위치로 이동 가능한지 여부
      const distance = this.position.distanceFrom(position) // 거리 측정해서
      return distance.rank < 2 && distance.file < 2 // 한칸이상 이동할 수 없게
      // 적의 위치를 고려하지 않음
    }
    moveTo(position: Position): void {
      if (this.canMoveTo(position)) super.moveTo(position)
      // 이동 가능하면 이동
    }
  }
  class Queen extends Piece {
    canMoveTo(position:Position) {
      const distance = this.position.distanceFrom(position)
      return distance.rank === distance.file || distance.rank === 0
    }
  }
  class Rook extends Piece {
    canMoveTo(position:Position) {
      const distance = this.position.distanceFrom(position)
      return distance.rank === 0 || distance.file === 0
    }
  }
  class Bishop extends Piece {
    canMoveTo(position:Position) {
      const distance = this.position.distanceFrom(position)
      return distance.rank === distance.file
    }
  }
  class Knight extends Piece {
    canMoveTo(position:Position) {
      const distance = this.position.distanceFrom(position)
      return distance.rank * distance.file === 2
    }
  }
  class Pawn extends Piece {
    canMoveTo(position:Position) {
      const distance = this.position.distanceFrom(position)
      return distance.rank === 1 && distance.file === 0
    }
  }

  type Color = 'Black'|'White'
  type File = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H' // x축
  type Rank = 1|2|3|4|5|6|7|8 // y축

  // 새 게임을 만들 때 자동으로 보드와 말을 생성
  class Game {
    private pieces = Game.makePieces()
    private static makePieces() {
      return [
        // 루프돌려야할듯
        new Rook('White', 'A', 1),
        new Knight('White', 'B', 1),
        new Bishop('White', 'C', 1),
        new Queen('White', 'D', 1),
        new King('White', 'E', 1),
        new Bishop('White', 'F', 1),
        new Knight('White', 'G', 1),
        new Rook('White', 'H', 1),
        new Pawn('White', 'A', 2),
        new Pawn('White', 'B', 2),
        new Pawn('White', 'C', 2),
        new Pawn('White', 'D', 2),
        new Pawn('White', 'E', 2),
        new Pawn('White', 'F', 2),
        new Pawn('White', 'G', 2),
        new Pawn('White', 'H', 2),

        new Rook('Black', 'A', 8),
        new Knight('Black', 'B', 8),
        new Bishop('Black', 'C', 8),
        new Queen('Black', 'D', 8),
        new King('Black', 'E', 8),
        new Rook('Black', 'F', 8),
        new Knight('Black', 'G', 8),
        new Bishop('Black', 'H', 8),
        new Pawn('Black', 'A', 7),
        new Pawn('Black', 'B', 7),
        new Pawn('Black', 'C', 7),
        new Pawn('Black', 'D', 7),
        new Pawn('Black', 'E', 7),
        new Pawn('Black', 'F', 7),
        new Pawn('Black', 'G', 7),
        new Pawn('Black', 'H', 7),
      ]
    } 
  }
}