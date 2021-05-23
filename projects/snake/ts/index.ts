class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById("food")!; //加叹号表示getElementById肯定不为空
    }

    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    change() {
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';

    }
}

//测试
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

class ScorePanel {

    score = 0;
    level = 1;

    maxLevel: number; //最高等级
    upScore: number; //多少分升级

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel: number = 10, upScore: number = 5) {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }
    }

}

class Snake {
    element: HTMLElement;
    head: HTMLElement;
    bodies: HTMLCollection;

    constructor() {
        this.element = document.getElementById("snake");
        this.head = document.querySelector("#snake>div") as HTMLElement;
        this.bodies = this.element.getElementsByTagName("div");
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }

        this.moveBody();

        this.head.style.left = value + 'px';

    }

    set Y(value) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }

        this.moveBody();

        this.head.style.top = value + 'px';

    }

    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X +'px';
            (this.bodies[i] as HTMLElement).style.top = Y +'px';
        }
    }

}

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    direction: string = 'ArrowRight';

    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
        }

        // 判断是否吃到食物
        this.checkEat(X, Y);


        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert(e.message + ' Game Over! ');
            this.isLive = false;
        }


        this.isLive && setTimeout(this.run.bind(this), 200 - (this.scorePanel.level) * 20);
    }

    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

const gc = new GameControl();

// setInterval(() => {
//     console.log(gc.direction);
// }, 1000);
