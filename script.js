// 1. Пытаемся загрузить данные из памяти браузера. 
// Если там пусто, создаем пустой массив.
let subscriptions = JSON.parse(localStorage.getItem('my_subs')) || [];

// Ждем, пока весь HTML полностью загрузится, прежде чем что-то делать
document.addEventListener('DOMContentLoaded', () => {
    render(); // Отрисовываем то, что было сохранено ранее
});

function addSubscription() {
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    
    const name = nameInput.value;
    const price = parseFloat(priceInput.value);

    if (name === '' || isNaN(price)) {
        alert("Пожалуйста, введи название и цену!");
        return;
    }

    const newSub = {
        id: Date.now(),
        name: name,
        price: price
    };

    subscriptions.push(newSub);
    
    // Сохраняем обновленный массив в память браузера
    saveToLocalStorage();

    nameInput.value = '';
    priceInput.value = '';
    render();
}

function saveToLocalStorage() {
    // LocalStorage умеет хранить только строки, поэтому превращаем массив в строку JSON
    localStorage.setItem('my_subs', JSON.stringify(subscriptions));
}

function render() {
    const list = document.getElementById('sub-list');
    const totalDisplay = document.getElementById('total-price');
    
    // ПРОВЕРКА: Если список не найден в HTML, выходим из функции, чтобы не было ошибки
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    subscriptions.forEach(sub => {
        const li = document.createElement('li');
        li.innerHTML =  `
            <span>${sub.name}</span>
            <span>${sub.price} руб.</span>
            <button onclick="deleteSub(${sub.id})" style="padding: 5px; background: red; font-size: 10px;">X</button>
        `;
        list.appendChild(li);
        total += sub.price;
    });

    totalDisplay.innerText = total;
}

// Добавим функцию удаления (бонус!)
function deleteSub(id) {
    subscriptions = subscriptions.filter(sub => sub.id !== id);
    saveToLocalStorage();
    render();
}