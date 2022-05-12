// Piece 클래스에 색과 위치를 추가
type Color = "Black" | "White";
type XAxis = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"; // File
type YAxis = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Rank

// 체스 말의 좌표 집합
class Position {
  constructor(private xAxis: XAxis, private yAxis: YAxis) {}
  distanceFrom(position: Position) {
    return {
      yAxis: Math.abs(position.yAxis - this.yAxis),
      xAxis: Math.abs(position.xAxis.charCodeAt(0) - this.xAxis.charCodeAt(0)),
    };
  }
}

// 체스 말
abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, xAxis: XAxis, yAxis: YAxis) {
    this.position = new Position(xAxis, yAxis);
  }

  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}

interface Point {
  point: number;
}
// 체스의 여섯 가지의 말(piece)들
// class King extends Piece implements Point {} // 추상클래스와 인터페이스 동시에 사용 가능하다
// class Queen extends Piece {}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}

// 체스 게임
class Game {}
