/*
* Copyright (C) 2022 Rastislav Kish
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 3.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import React from 'react'

class GameManager {

    constructor() {
        this.boardWidth=4
        this.boardHeight=4

        this.victoryAchieved=false
        this.gameLost=false

        this.score=0

        let board=[]
        for (let x=0;x<this.boardWidth;x++) {
            let column=[]

            for (let y=0;y<this.boardHeight;y++)
            column.push(0)

            board.push(column)
            }
        this.board=board

        this.spawnNumber()
        this.spawnNumber()
        }

    getHighestNumber() {
        let max=0

        for (let column=0;column<this.boardWidth;column++)
        for (let row=0;row<this.boardHeight;row++)
        if (this.board[column][row]>max)
        max=this.board[column][row]

        return max
        }

    play(move) {
        if (this.gameLost)
        return this.MOVE_RESULT_INVALID_MOVE

        const previousBoard=this.board.map(column => column.slice())

        switch (move) {
            case GameManager.MOVE_LEFT:
            this.moveLeft()
            break
            case GameManager.MOVE_RIGHT:
            this.moveRight()
            break
            case GameManager.MOVE_UP:
            this.moveUp()
            break
            case GameManager.MOVE_DOWN:
            this.moveDown()
            break
            default:
            break;
            }

        if (!GameManager.boardsDiffer(this.board, previousBoard))
        return GameManager.MOVE_RESULT_INVALID_MOVE

        this.spawnNumber()

        if (this.getHighestNumber()===2048 && !this.victoryAchieved) {
            this.victoryAchieved=true
            return GameManager.MOVE_RESULT_VICTORY
            }

        if (!this.positionIsPlayable() && !this.victoryAchieved) {
            this.gameLost=true
            return GameManager.MOVE_RESULT_LOSS
            }

        return GameManager.MOVE_RESULT_OK
        }

    moveLeft() {
        for (let y=0;y<this.boardHeight;y++) {

            let row=[]
            for (let column of this.board)
            row.push(column[y])

            //First, find and combine the identical numbers

            let lastNValue=0 //The last value contained in the set of natural numbers
            let lastNValuePosition=-1

            for (let i=0;i<row.length;i++) {
                if (row[i]!==0) {
                    if (row[i]===lastNValue) {
                        this.score+=2*lastNValue
                        row[lastNValuePosition]=2*lastNValue
                        row[i]=0
                        lastNValue=0
                        lastNValuePosition=-1
                        }
                    else {
                        lastNValue=row[i]
                        lastNValuePosition=i
                        }
                    }
                }

            //And move the result

            let farthestZeroIndex=-1

            for (let i=0;i<row.length;i++) {
                if (farthestZeroIndex===-1) {
                    if (row[i]===0)
                    farthestZeroIndex=i
                    }
                else {
                    if (row[i]!==0) {
                        row[farthestZeroIndex]=row[i]
                        row[i]=0
                        farthestZeroIndex++
                        }
                    }
                }

            for (let x=0;x<this.boardWidth;x++)
            this.board[x][y]=row[x]
            }
        }
    moveRight() {
        for (let y=0;y<this.boardHeight;y++) {

            let row=[]
            for (let column of this.board)
            row.push(column[y])

            //First, find and combine the identical numbers

            let lastNValue=0 //The last value contained in the set of natural numbers
            let lastNValuePosition=-1

            for (let i=row.length-1;i>=0;i--) {
                if (row[i]!==0) {
                    if (row[i]===lastNValue) {
                        this.score+=2*lastNValue
                        row[lastNValuePosition]=2*lastNValue
                        row[i]=0
                        lastNValue=0
                        lastNValuePosition=-1
                        }
                    else {
                        lastNValue=row[i]
                        lastNValuePosition=i
                        }
                    }
                }

            //And move the result

            let farthestZeroIndex=-1

            for (let i=row.length-1;i>=0;i--) {
                if (farthestZeroIndex===-1) {
                    if (row[i]===0)
                    farthestZeroIndex=i
                    }
                else {
                    if (row[i]!==0) {
                        row[farthestZeroIndex]=row[i]
                        row[i]=0
                        farthestZeroIndex--
                        }
                    }
                }

            for (let x=0;x<this.boardWidth;x++)
            this.board[x][y]=row[x]
            }
        }
    moveUp() {
        for (let column of this.board) {
            //First, find and combine the identical numbers

            let lastNValue=0 //The last value contained in the set of natural numbers
            let lastNValuePosition=-1

            for (let i=column.length-1;i>=0;i--) {
                if (column[i]!==0) {
                    if (column[i]===lastNValue) {
                        this.score+=2*lastNValue
                        column[lastNValuePosition]=2*lastNValue
                        column[i]=0
                        lastNValue=0
                        lastNValuePosition=-1
                        }
                    else {
                        lastNValue=column[i]
                        lastNValuePosition=i
                        }
                    }
                }

            //And move the result

            let farthestZeroIndex=-1

            for (let i=column.length-1;i>=0;i--) {
                if (farthestZeroIndex===-1) {
                    if (column[i]===0)
                    farthestZeroIndex=i
                    }
                else {
                    if (column[i]!==0) {
                        column[farthestZeroIndex]=column[i]
                        column[i]=0
                        farthestZeroIndex--
                        }
                    }
                }

            }
        }
    moveDown() {
        for (let column of this.board) {

            //First, find and combine the identical numbers

            let lastNValue=0 //The last value contained in the set of natural numbers
            let lastNValuePosition=-1

            for (let i=0;i<column.length;i++) {
                if (column[i]!==0) {
                    if (column[i]===lastNValue) {
                        this.score+=2*lastNValue
                        column[lastNValuePosition]=2*lastNValue
                        column[i]=0
                        lastNValue=0
                        lastNValuePosition=-1
                        }
                    else {
                        lastNValue=column[i]
                        lastNValuePosition=i
                        }
                    }
                }

            //And move the result

            let farthestZeroIndex=-1

            for (let i=0;i<column.length;i++) {
                if (farthestZeroIndex===-1) {
                    if (column[i]===0)
                    farthestZeroIndex=i
                    }
                else {
                    if (column[i]!==0) {
                        column[farthestZeroIndex]=column[i]
                        column[i]=0
                        farthestZeroIndex++
                        }
                    }
                }

            }
        }

    positionIsPlayable() {
        //The position is playable if the board either contains any empty square, or any pair of squares of the same value in a row or column

        for (const column of this.board)
        if (column.includes(0))
        return true

        //Check values in columns

        let lastValue=0

        for (const column of this.board) {
            for (const value of column) {
                if (value===lastValue)
                return true
                else
                lastValue=value
                }
            lastValue=0
            }

        //and in rows

        lastValue=0

        for (let y=0;y<this.boardHeight;y++) {
            for (let x=0;x<this.boardWidth;x++) {
                if (this.board[x][y]===lastValue)
                return true
                else
                lastValue=this.board[x][y]
                }
            lastValue=0
            }

        return false
        }

    spawnNumber() {
        let freeTiles=[]

        for (let column=0;column<this.boardWidth;column++)
        for (let row=0;row<this.boardHeight;row++)
        if (this.board[column][row]===0)
        freeTiles.push([column, row])

        if (freeTiles.length<1)
        return false

        let tile=freeTiles.splice(GameManager.random(0, freeTiles.length), 1)[0]

        let value=GameManager.random(1, 3)*2 //Should generate 2 or 4

        this.board[tile[0]][tile[1]]=value

        return true
        }

    static boardsDiffer(board1, board2) {
        if (board1.length!==board2.length)
        return true

        for (let column=0;column<board1.length;column++) {
            if (board1[column].length!==board2[column].length)
            return true

            for (let row=0;row<board1.length;row++)
            if (board1[column][row]!==board2[column][row])
            return true
            }

        return false
        }
    static coordinatesToString(column, row) {
        let letter=String.fromCharCode('A'.charCodeAt()+column)
        return `${letter}${row+1}`
        }
    static fromJSON(json) {
        let obj=JSON.parse(json)

        let result=new GameManager()

        result.board=obj.board
        result.score=obj.score
        result.victoryAchieved=obj.victoryAchieved
        result.gameLost=obj.gameLost

        return result
        }
    static random(min, max) {
        min=Math.floor(min)
        max=Math.floor(max)

        return Math.floor(Math.abs(max-min)*Math.random())+min
        }

    static MOVE_LEFT=1
    static MOVE_RIGHT=2
    static MOVE_UP=3
    static MOVE_DOWN=4

    static MOVE_RESULT_OK=0
    static MOVE_RESULT_VICTORY=1
    static MOVE_RESULT_LOSS=2
    static MOVE_RESULT_INVALID_MOVE=-1

    }

class VictoryDialog extends React.Component {

    render() {
        return (
            <div>
                <h1>Victory</h1>
                <p>Congratulations! You have won!</p>
                <button //okButton
                    onClick={ () => this.props.onSubmit() }
                    >
                    Ok
                    </button>
                </div>
            )
        }
    }
class LossDialog extends React.Component {

    render() {
        return (
            <div>
                <h1>Loss</h1>
                <p>The board has filled up and you haven't reached 2048. You have lost.</p>
                <button //okButton
                    onClick={ () => this.props.onSubmit() }
                    >
                    Ok
                    </button>
                </div>
            )
        }
    }

class Cell extends React.Component {

    render() {
        return <span
            id={ `${GameManager.coordinatesToString(this.props.column, this.props.row)}Span` }
            tabIndex="-1"
            aria-label={ this.props.value!==0 ? this.props.value: "Blank" }
            onKeyDown={ this.keyDownHandler }
            >
            { this.props.value!==0 ? this.props.value: " " }
            </span>
        }

    keyDownHandler=(event) => {
        if (!event.shiftKey) {
            switch (event.key) {
                case "ArrowLeft":
                this.props.onFocusMoveRequest([this.props.column, this.props.row], [-1, 0])
                break
                case "ArrowRight":
                this.props.onFocusMoveRequest([this.props.column, this.props.row], [1, 0])
                break
                case "ArrowUp":
                this.props.onFocusMoveRequest([this.props.column, this.props.row], [0, 1])
                break
                case "ArrowDown":
                this.props.onFocusMoveRequest([this.props.column, this.props.row], [0, -1])
                break
                default:
                break;
                }
            }
        else {
            event.preventDefault()

            switch (event.key) {
                case "ArrowLeft":
                this.props.onMoveRequest(GameManager.MOVE_LEFT)
                break
                case "ArrowRight":
                this.props.onMoveRequest(GameManager.MOVE_RIGHT)
                break
                case "ArrowUp":
                this.props.onMoveRequest(GameManager.MOVE_UP)
                break
                case "ArrowDown":
                this.props.onMoveRequest(GameManager.MOVE_DOWN)
                break
                default:
                break;
                }

            return false
            }
        }

    }
class Board extends React.Component {

    state={
        gameManager: this.props.gameManager,
        highestNumber: this.props.gameManager.getHighestNumber(),
        }

    render() {
        let tableData=[]

        for (let row=this.state.gameManager.boardHeight-1;row>=0;row--) {
            let tableRow=[]

            for (let column=0;column<this.state.gameManager.boardWidth;column++)
            tableRow.push(<td>
                <Cell
                    column={ column }
                    row={ row }
                    value={ this.state.gameManager.board[column][row] }
                    onFocusMoveRequest={ this.cellFocusMoveRequestHandler }
                    onMoveRequest={ this.cellMoveRequestHandler }
                    />
                </td>)

            tableData.push(<tr>{ tableRow }</tr>)
            }

        return (
            <div>
                <p>
                    Score: <span>{ this.state.gameManager.score }</span>
                    <span> </span>
                    Highest number: <span aria-live="polite">{ this.state.highestNumber }</span>
                    </p>
                <table
                    tabIndex="0"
                    onFocus={ this.tableFocusHandler }
                    >
                    <tbody>
                        { tableData }
                        </tbody>
                    </table>
                <div>
                    <button //leftButton
                        onClick={ this.leftButtonClickHandler }
                        >
                        Left
                        </button>
                    <button //rightButton
                        onClick={ this.rightButtonClickHandler }
                        >
                        Right
                        </button>
                    <button //upButton
                        onClick={ this.upButtonClickHandler }
                        >
                        Up
                        </button>
                    <button //downButton
                        onClick={ this.downButtonClickHandler }
                        >
                        Down
                        </button>
                    </div>
                </div>
            )
        }

    componentDidUpdate(previousProps) {
        if (this.props.gameManager!==previousProps.gameManager)
        this.setState(state => ({
            gameManager: this.props.gameManager,
            highestNumber: this.props.gameManager.getHighestNumber(),
            }))
        }

    tableFocusHandler=(event) => {
        if (event.target.id==="")
        document.querySelector("#A4Span").focus()
        }

    leftButtonClickHandler=() => {
        this.play(GameManager.MOVE_LEFT)
        }
    rightButtonClickHandler=() => {
        this.play(GameManager.MOVE_RIGHT)
        }
    upButtonClickHandler=() => {
        this.play(GameManager.MOVE_UP)
        }
    downButtonClickHandler=() => {
        this.play(GameManager.MOVE_DOWN)
        }

    cellFocusMoveRequestHandler=(source, direction) => {
        const newColumn=source[0]+direction[0]
        const newRow=source[1]+direction[1]

        if (newColumn>=0 && newColumn<this.state.gameManager.boardWidth && newRow>=0 && newRow<this.state.gameManager.boardHeight) {
            let element=document.querySelector(`#${GameManager.coordinatesToString(newColumn, newRow)}Span`)
            element.focus()
            }
        }
    cellMoveRequestHandler=(move) => {
        this.play(move)
        }

    play(move) {
        const moveResult=this.state.gameManager.play(move)

        if (moveResult===GameManager.MOVE_RESULT_INVALID_MOVE)
        return

        this.setState(state => ({
            gameManager: this.state.gameManager,
            }))

        const highestNumber=this.state.gameManager.getHighestNumber()
        if (highestNumber!==this.state.highestNumber)
        this.setState(state => ({
            highestNumber
            }))

        switch (moveResult) {
            case GameManager.MOVE_RESULT_VICTORY:
            this.props.onVictory()
            break
            case GameManager.MOVE_RESULT_LOSS:
            this.props.onLoss()
            break
            default:
            break;
            }
        }

    }

class App extends React.Component {

    state={
        gameManager: new GameManager(),
        activeDialog: null,
        }

    render() {
        if (this.state.activeDialog===null)
        return (
            <div>
                <h1>R2048</h1>
                <Board
                    gameManager={ this.state.gameManager }
                    onVictory={ this.boardVictoryHandler }
                    onLoss={ this.boardLossHandler }
                    />
                <div>
                    <button //newGameButton
                        onClick={ this.newGameButtonClickHandler }
                        >
                        New game
                        </button>
                    <button //saveButton
                        onClick={ this.saveButtonClickHandler }
                        >
                        Save
                        </button>
                    <button //loadButton
                        onClick={ this.loadButtonClickHandler }
                        >
                        Load
                        </button>
                    </div>
                </div>
            )
        else
        return this.state.activeDialog
        }

    newGameButtonClickHandler=() => {
        this.setState(state => ({
            gameManager: new GameManager(),
            }))
        }
    saveButtonClickHandler=() => {
        localStorage.setItem("R2048Game", JSON.stringify(this.state.gameManager))
        alert("The game has been saved.")
        }
    loadButtonClickHandler=() => {
        let gameManagerJSON=localStorage.getItem("R2048Game")

        if (gameManagerJSON!==null) {
            let gameManager=GameManager.fromJSON(gameManagerJSON)

            this.setState(state => ({
                gameManager,
                }))
            }
        }

    boardVictoryHandler=() => {
        this.setState(state => ({
            activeDialog: <VictoryDialog
                onSubmit={ this.victoryDialogSubmitHandler }
                />
            }))
        }
    boardLossHandler=() => {
        this.setState(state => ({
            activeDialog: <LossDialog
                onSubmit={ this.lossDialogSubmitHandler }
                />
            }))
        }

    victoryDialogSubmitHandler=() => {
        this.setState(state => ({
            activeDialog: null,
            }))
        }
    lossDialogSubmitHandler=() => {
        this.setState(state => ({
            activeDialog: null,
            }))
        }

    }

export default App
