// Находим элементы
const healthBar = document.getElementById("health-bar");
const healthText = document.getElementById("health-text");
const damageBtn = document.getElementById("damage-button");
const healBtn = document.getElementById("heal-btn");
const megaBtn = document.getElementById("mega-damage");
const gameOverMsg = document.getElementById("game-over-message");
const title = document.querySelector("h2");

// Константы (работаем в пикселях)
const MAX_HEALTH = 200;      // максимум = 200px
const DAMAGE_AMOUNT = 20;    // обычный урон −20px
const MEGA_DAMAGE = 50;      // мега-урон −50px
const HEAL_AMOUNT = 30;      // лечение +30px

let currentHealth = MAX_HEALTH;
let isDead = false;

// ========== Шаг 1: обновление процента ==========
function updateHealthBar() {
  if (currentHealth < 0) currentHealth = 0;

  // Меняем ширину шкалы в пикселях
  healthBar.style.width = currentHealth + "px";

  // Считаем процент
  const percent = (currentHealth / MAX_HEALTH) * 100;

  // Меняем цвет
  if (percent > 60) {
    healthBar.style.backgroundColor = "#2ecc71"; // зелёный
  } else if (percent > 30) {
    healthBar.style.backgroundColor = "#f1c40f"; // жёлтый
  } else {
    healthBar.style.backgroundColor = "#e74c3c"; // красный
  }

  // Обновляем текст процента
  healthText.textContent = Math.round(percent) + "%";

  // ========== Шаг 3: состояние «Смерть» ==========
  if (currentHealth === 0 && !isDead) {
    isDead = true;

    // Меняем заголовок
    title.textContent = "погиб... 👻";
    title.style.color = "gray";

    // Показываем сообщение
    gameOverMsg.classList.add("visible");

    // ========== Задание со звёздочкой ==========
    damageBtn.setAttribute("disabled", "true");
    healBtn.setAttribute("disabled", "true");
    megaBtn.setAttribute("disabled", "true");
  }
}

// Обычный урон
function takeDamage() {
  if (isDead) return;
  currentHealth -= DAMAGE_AMOUNT;
  updateHealthBar();
}

// Лечение
function heal() {
  if (isDead) return;
  currentHealth += HEAL_AMOUNT;
  if (currentHealth > MAX_HEALTH) {
    currentHealth = MAX_HEALTH;
  }
  updateHealthBar();
}

// ========== Шаг 2: Мега-урон ==========
function megaDamage() {
  if (isDead) return;
  currentHealth -= MEGA_DAMAGE;
  updateHealthBar();
}

// Привязываем события
damageBtn.addEventListener("click", takeDamage);
healBtn.addEventListener("click", heal);
megaBtn.addEventListener("click", megaDamage);

// Начальное состояние
updateHealthBar();
