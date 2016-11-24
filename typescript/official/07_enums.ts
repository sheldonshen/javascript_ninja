/**
 * Created by sheldonshen on 11/16/2016.
 */
//枚举
enum Direction{
    Up=1,
    Down,
    Left,
    Right
}

enum FileAccess{
    //constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    //computed member
    G = "123".length
}

enum Enum{
    A
}

let a = Enum.A;
let namOfA = Enum[Enum.A];//"A"

const enum EnumB{
    A = 1,
    B = A * 2
}

const enum Directions{
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up,Directions.Down,Directions.Left,Directions.Right]

//外部枚举
declare enum Enum{
    D = 1,
    B,
    C = 2
}
