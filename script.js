//module 1 for gameboard
const gameBoard = (() => {
    //to render new grid
    const renderGrid = (grid) => {
        //arr = ['','o', 'x','o','x','o','x','o','x']
        // for (i = 0; i < 9; i++) {
        //     newCell = document.createElement('div');
        //     newCell.classList.add('grid-item');
        //     newCell.setAttribute('id', `${i}`);
        //     //newCell.addEventListener("click", play);
        //     var text = document.createTextNode('');
        //     newCell.appendChild(text);
        //     grid.appendChild(newCell);
        // }

        for (i = 0; i < 9; i++) {
            cell = document.getElementsByClassName(`grid-item`)[i];
            cell.setAttribute('id', `${i}`);
            cell.classList.add('hovered');
        }
    }

    const formGrid = () => {
        const grid = document.getElementById('grid-container');
        renderGrid(grid);
    }

    const clearGrid = () => {
        document.querySelectorAll('.grid-item').forEach(item => {
            item.innerHTML = ''
            item.classList.remove('win');
            item.classList.add('hovered');
        })
    }

    return { formGrid, clearGrid };
})();

gameBoard.formGrid();

//players factory function, not needed now
// const players = (name) => {
//     const sayname = () => alert(`${name} won`);
//     return { sayname };
// };


//module 2 for details and displaying player names and turns
const enterDetails = (() => {
    let p1name = 'x'; // this works
    let p2name = 'y'; //pvt variable
    // const _askp1name = () => {
    //     p1name = prompt("X is (enter your name)", "Aastha"); //dont declare p1name as 'let p1name' before. that wont work for some reason
    //     alert(`Hi ${p1name}`);
    //     return p1name;
    // }
    // const _askp2name = () => {
    //     p2name = prompt("O is (enter your name)", "guest");
    //     //const p2choice = prompt("Please enter your choice", "o");
    //     alert(`Hi ${p2name}`);
    //     return p2name;
    // }

    //pvt methods
    const _getp1name = () => {
        p1name = prompt("X is (enter your name)", "Aastha"); //dont declare p1name as 'let p1name;' before. That wont work for some reason
        while (p1name == null)
            p1name = prompt("X is (enter your name)", "Aastha");
        alert(`Hi ${p1name}`);
        //return p1name;
    }

    //p1name='hacked';

    const _getp2name = () => {
        p2name = prompt("O is (enter your name)", "Leena");
        while (p2name == null)
            p2name = prompt("O is (enter your name)", "Leena");
        //const p2choice = prompt("Please enter your choice", "o");
        alert(`Hi ${p2name}`);
        //return p2name;
    }

    //public methods
    const getp1 = () => _getp1name();
    const getp2 = () => _getp2name();

    const display = (p1, p2) => {
        // newPlayer = document.createElement('h2');
        // newPlayer.classList.add('playerinfo');
        // newPlayer.setAttribute('id', `p1`);
        // //newCell.addEventListener("click", play);
        // var text = document.createTextNode("Player 1: " + p1);
        // newPlayer.appendChild(text);
        // var playerinfo = document.getElementsByClassName('playerinfo')[0];
        // playerinfo.appendChild(newPlayer);

        // newPlayer = document.createElement('h2');
        // newPlayer.classList.add('playerinfo');
        // newPlayer.setAttribute('id', `p2`);
        // //newCell.addEventListener("click", play);
        // var text = document.createTextNode("Player 2: " + p2);
        // newPlayer.appendChild(text);
        // //var playerinfo = document.getElementsByClassName('playerinfo')[0];
        // playerinfo.appendChild(newPlayer);

        // startmsg = document.createElement('h2');
        // var text = document.createTextNode(p1name+"'s turn");
        // startmsg.appendChild(text);
        // //var playerinfo = document.getElementsByClassName('playerinfo')[0];
        // playerinfo.appendChild(startmsg);

        let player1 = document.getElementById('p1');
        player1.innerHTML = "Player X: " + p1name;

        let player2 = document.getElementById('p2');
        player2.innerHTML = "Player O: " + p2name;

        let startmsg = document.getElementById('turn');
        startmsg.innerHTML = p1name + "'s turn";
    }

    const displayturn = (turn_num) => {
        let turnof = document.getElementById('turn');
        if (turn_num % 2 == 0 && turn_num <= 9)
            turnof.innerHTML = p1name + "'s turn";
        else if (turn_num <= 9)
            turnof.innerHTML = p2name + "'s turn";
        else
            turnof.innerHTML = "Game Over";
    }

    const sayname = (turn_num) => {
        if (turn_num % 2 != 0)
            alert(`${p1name} won`);
        else
            alert(`${p2name} won`);
    }


    return { getp1, getp2, display, displayturn, sayname };
})();

//enterDetails.askNames();
// const newGame = (() => {
//     let x = enterDetails.getp1();
//     let y = enterDetails.getp2();

//     let givep1 = () => x
//     let givep2 = () => y
//     //let p1 = players(x);
//     //let p2 = players(y);

//     const sayname = (name) => alert(`${name} won`);

//     let getdetailsfornewgame = () => enterDetails.display(givep1(), givep2());
//     return {x,y,givep1, givep2, sayname, getdetailsfornewgame };
// })();
//p1name='hacked';

// let x = enterDetails.getp1();
// let y = enterDetails.getp2();
// let p1 = players(x);
// let p2 = players(y);
// enterDetails.display(x, y);

// enterDetails.p1name = 'hacked'; does not work
enterDetails.getp1();
enterDetails.getp2();
enterDetails.display();

//  window.onload = newGame;
//     // newGame.givep1();
//     // newGame.givep2();
//     //newGame.enterDetails.display(newGame.givep1(), newGame.givep2());
//     newGame.getdetailsfornewgame();
// }
//p1.sayname();


//module 3 for game control
const game = (() => {
    let turn = 1;

    //const array = () => {
    var arr = [];
    for (i = 0; i < 9; i++)
        arr[i] = 'u';
    // return arr;
    //}

    const decidewinner = (arr) => {
        let same = 0;
        let winblocks = [];
        for (i = 0; i < 9; i += 3) {
            if (arr[i] != 'u') {
                sign = arr[i];
                for (j = i + 1; j < i + 3; j++) {
                    if (sign == arr[j])
                        same++;
                    }
                    // if (i % 3 == 0 && same == 2) {
                    //     return true;
                    // }
                    // else if(i%3==0){
                    //     same = 0;
                    // }

                    // if (sign == arr[i+1])
                    //     same++;
                
                if (same == 2) {
                    winblocks.push(i, i + 1, i + 2);
                }
                else same = 0;
            }
        }
        for (i = 0; i < 3; i++) {
            var t = arr[i];
            if (t != 'u')
                if (t == arr[i + 3] && arr[i + 3] == arr[i + 6]) {
                    winblocks.push(i, i + 3, i + 6);
                }
        }

        if (arr[0] == arr[4] && arr[4] == arr[8] && arr[0] != 'u')
            winblocks.push(0, 4, 8);
        else if (arr[2] == arr[4] && arr[4] == arr[6] && arr[2] != 'u')
            winblocks.push(2, 4, 6);
        //alert(`he won`);
        return winblocks;
    }


    const play = (e) => {
        const played = e.target.innerHTML;

        if (played == '' && turn % 2 != 0) {
            e.target.innerHTML = "<span style='color: red;'>x</span>";
            arr[e.target.id] = 'x';
            e.target.style.fontcolor = 'red';
        }
        else if (played == '' && turn % 2 == 0) {
            e.target.innerHTML = "<span style='color: blue;'>o</span>";;
            arr[e.target.id] = 'o';

        }
        enterDetails.displayturn(turn);
        turn++;

        displaywinner(arr);
        e.target.classList.remove('hovered')
        //enterDetails.displayturn(x,y);
    }
    const newGame = () => {
        gameBoard.clearGrid();
        for (i = 0; i < 9; i++)
            arr[i] = 'u';
        let newp1 = enterDetails.getp1();
        let newp2 = enterDetails.getp2();
        // p1 = players(newp1);
        // p2 = players(newp2);
        enterDetails.display(newp1, newp2);
        turn = 1;
        // document.querySelectorAll('.grid-item').forEach(item => {
        //     item.classList.remove('win');
        // })
    }

    const displaywinner = (arr) => {
        winblocks = [];
        winblocks = decidewinner(arr);
        if (winblocks.length >= 3) {

            enterDetails.displayturn(10);
            setTimeout(function () { enterDetails.sayname(turn - 1); }, 100);
            block1 = document.getElementById(`${winblocks[0]}`);
            block2 = document.getElementById(`${winblocks[1]}`);
            block3 = document.getElementById(`${winblocks[2]}`);

            block1.classList.remove('hovered');
            block2.classList.remove('hovered');
            block3.classList.remove('hovered');

            block1.classList.add('win');
            block2.classList.add('win');
            block3.classList.add('win');
            // if (turn % 2 != 0) {
            //     //winner = newGame.givep1();
            //     //newGame.sayname(newGame.x);
            //     p1.sayname();
            // }
            // else
            //     p2.sayname();
            //newGame.sayname(newGame.y);

            setTimeout(function () {
                gameBoard.clearGrid();
                block1.classList.remove('win');
                block2.classList.remove('win');
                block3.classList.remove('win');

                block1.classList.add('hovered');
                block2.classList.add('hovered');
                block3.classList.add('hovered');
            }, 300);
            //gameBoard.clearGrid();

            //enterDetails.askNames();
            for (i = 0; i < 9; i++)
                arr[i] = 'u';

            setTimeout(function () { newGame(); }, 400);
            //newGame();

            // newGame.givep1();
            // newGame.givep2();
            // let newp1 = enterDetails.getp1();
            // let newp2 = enterDetails.getp2();
            // p1 = players(newp1);
            // p2 = players(newp2);
            // enterDetails.display(newp1, newp2);

            // turn = 0;
        }
        else if (!arr.find(element => element == 'u')) {
            enterDetails.displayturn(10);
            document.querySelectorAll('.grid-item').forEach(item => {
                item.classList.add('win');
            })
        
        setTimeout(function () { alert("IT'S A DRAW!"); }, 400);
        setTimeout(function () { newGame(); }, 600);
    }
}

    document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener("click", play);})
    })();
    