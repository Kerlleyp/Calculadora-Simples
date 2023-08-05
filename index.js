const input = document.getElementById('input');
const main = document.querySelector('main')
const root = document.querySelector(':root')
const resultInput = document.getElementById('result')

const numKeys = ['(', ')', '*', '%', '-', '+', '/', '0', '9', '8', '7', '6', '5', '4', '3', '2', '1', '.', ' ']

document.querySelectorAll('.charKey').forEach(function(charBtn){
    charBtn.addEventListener('click', function(){
        const value = charBtn.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function() {
    input.value = '';
    resultInput.value = '';
    input.focus()
    resultInput.classList.remove('error')
})

input.addEventListener('keydown', function(ev) {
    ev.preventDefault()
    if(numKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    if(ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
        return
    }
    if(ev.key === 'Enter'){
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)

document.getElementById('themeSwitcher').addEventListener('click', function() {
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
    }else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})

document.getElementById('copyToClipboard').addEventListener('click', function(ev) {
    const button = ev.currentTarget
    if(button.innerText === 'Copy') {
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    }else{
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

function calculate() {
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')

    const resultado = eval(input.value)
    resultInput.value = resultado

    resultInput.classList.remove('error')
}
