let btnStart = document.querySelector("#btn_start")
let btnFinish = document.querySelector("#btn_finish")
let gameDetail = document.querySelector(".game_detail")
let description = document.querySelector(".description")
let word = document.querySelector(".word")
let result = document.querySelector("#result_block")

// gameStatus отвечает за статус игры
let gameStatus = {
    win() {
        document.querySelector(".status").innerHTML = "Вы выиграли"
    },
    lose(word) {
        document.querySelector(".status").innerHTML = `<span style="color: red">Вы проиграли</span><br>Слово было ${word}</br>`
        result.innerHTML = ""
    },
    start() {
        document.querySelector(".status").innerHTML = ""
        result.innerHTML = `Длина слова: ${gameWord.word.length}\n Количество ошибок: ${errorCount} из ${manBody.length}\n Количество правильных: ${trueAnswers} из ${gameWord.word.length}`
    },
    finish() {
        document.querySelector(".status").innerHTML = "Игра завершена"
        result.innerHTML = ""
    }
}

// массив manBody отвечает за части человека
let manBody = [
    document.querySelector(".rope"),
    document.querySelector(".head"),
    document.querySelector(".body"),
    document.querySelector(".left_hand"),
    document.querySelector(".right_hand"),
    document.querySelector(".left_foot"),
    document.querySelector(".right_foot")
]

// Кол-во неправильных и правильных ответов
let errorCount = 0
let trueAnswers = 0

// Массив с рандомными словами
let listWords = [{
        desc: "Это что-то плавающее",
        word: "лодка"
    },
    {
        desc: "Это что-то летающее",
        word: "самолет"
    },
    {
        desc: "Это что-то ходячее",
        word: "зомби"
    }
]

// слово по умолчанию
let gameWord = listWords[0]

btnStart.addEventListener("click", startGame)
btnFinish.addEventListener("click", finishGame)

function startGame() {
    gameStatus.start()
    errorCount = 0
    trueAnswers = 0

    setWord()
    manBody.forEach(item => item.style.display = "none")
    btnStart.style.display = "none"
    btnFinish.style.display = "block"
}

function finishGame() {
    description.innerHTML = ""
    word.innerHTML = ""
    gameStatus.finish()
    btnStart.style.display = "block"
    btnFinish.style.display = "none"
}

function setWord() {
    gameWord = listWords[Math.floor(Math.random() * listWords.length)]
    description.innerHTML = gameWord.desc
    for (let i = 0; i < gameWord.word.length; i++) {
        let btn = document.createElement("button")
        btn.setAttribute("id", i)
        btn.innerHTML = "X"
        word.append(btn)
        btn.addEventListener("click", (e) => {
            checkWord(e.target, gameWord.word)
        })
    }
}

function checkWord(target, word) {
    let id = target.id
    let letter = prompt("Введите букву").toLocaleLowerCase()
    if (letter == word[id]) {
        target.innerHTML = word[id]
        trueAnswers++
    } else {
        manBody[errorCount].style.display = "block"
        errorCount++
    }
    if (errorCount == manBody.length) {
        finishGame()
        gameStatus.lose(word)
    }
    if (trueAnswers == word.length) {
        finishGame()
        gameStatus.win()
    }
    result.innerHTML = `Длина слова: ${word.length}\n Количество ошибок: ${errorCount} из ${manBody.length}\n Количество правильных: ${trueAnswers} из ${word.length}`
}