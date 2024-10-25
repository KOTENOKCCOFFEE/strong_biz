document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript загружен.");

  // Элементы для модального окна подписки
  const subscribeModal = document.getElementById('subscribeModal');
  const subscribeOptionsButton = document.getElementById('subscribeOptionsButton');
  const closeSubscribeModal = document.getElementById('closeSubscribeModal');
  const subscribeNewButton = document.getElementById('subscribeNewButton');
  const renewSubscriptionButton = document.getElementById('renewSubscriptionButton');

  const step1 = document.getElementById('step1');
  const step2Subscribe = document.getElementById('step2-subscribe');
  const step2Renew = document.getElementById('step2-renew');
  const step3Summary = document.getElementById('step3-summary');

  const nextToSummaryFromSubscribe = document.getElementById('nextToSummaryFromSubscribe');
  const nextToSummaryFromRenew = document.getElementById('nextToSummaryFromRenew');

  const monthDisplay = document.getElementById('monthDisplay');
  const subscriptionMonths = document.getElementById('subscriptionMonths');
  const modalResultMessage = document.getElementById('modalResultMessage');

  const summaryText = document.getElementById('summaryText');
  const confirmSubscription = document.getElementById('confirmSubscription');

  // Элементы для модального окна ОС
  const osModal = document.getElementById('osModal'); // Модальное окно для выбора ОС
  const closeOsModal = document.getElementById('closeOsModal');
  const downloadButton = document.getElementById('downloadButton');
  const emailInputDownload = document.getElementById('emailInputDownload');
  const osWindows10 = document.getElementById('osWindows10');
  const osWindows11 = document.getElementById('osWindows11');

  // === Обработчик для кнопки "Скачать" ===
  const downloadAppButton = document.getElementById('downloadAppButton');
  if (downloadAppButton) {
    downloadAppButton.onclick = function() {
      console.log('Кнопка "Скачать" была нажата.');
      osModal.style.display = "flex"; // Открываем модальное окно выбора ОС
    };
  }

  // === Закрытие модального окна выбора ОС ===
  if (closeOsModal) {
    closeOsModal.onclick = function() {
      console.log('Закрытие модального окна ОС.');
      osModal.style.display = "none";
    };
  }

  // === Проверка активации кнопки "Скачать" ===
  function enableDownloadButton() {
    console.log('Проверка для кнопки "Скачать"');
    if ((osWindows10.checked || osWindows11.checked) && emailInputDownload.value) {
      downloadButton.disabled = false;
    } else {
      downloadButton.disabled = true;
    }
  }

  // Обработчики на изменения выбора ОС и ввода email
  if (osWindows10) osWindows10.onchange = enableDownloadButton;
  if (osWindows11) osWindows11.onchange = enableDownloadButton;
  if (emailInputDownload) emailInputDownload.oninput = enableDownloadButton;

  // === Обработчик для кнопки "Скачать" внутри модального окна ===
  if (downloadButton) {
    downloadButton.onclick = function() {
      if ((osWindows10.checked || osWindows11.checked) && validateEmail(emailInputDownload.value)) {
        console.log('Письмо отправлено на почту.');
        alert('На вашу почту отправлено письмо, проверьте пожалуйста!');
        osModal.style.display = "none";
      } else {
        console.log('Ошибка: Не выбрана ОС или неверный email.');
        alert('Пожалуйста, выберите ОС и введите корректный email.');
      }
    };
  }

  // === Обработчик для кнопки "Подписка" ===
  if (subscribeOptionsButton) {
    subscribeOptionsButton.onclick = function() {
      console.log('Кнопка "Подписка" была нажата.');
      subscribeModal.style.display = "flex";
      step1.style.display = "block"; // Показать первый шаг подписки
      step2Subscribe.style.display = "none";
      step2Renew.style.display = "none";
      step3Summary.style.display = "none";
      modalResultMessage.innerHTML = ''; // Очищаем сообщение
    };
  }

  // === Закрытие модального окна подписки ===
  if (closeSubscribeModal) {
    closeSubscribeModal.onclick = function() {
      console.log('Закрытие модального окна подписки.');
      subscribeModal.style.display = "none";
    };
  }

  // === Переход на форму оформления подписки ===
  if (subscribeNewButton) {
    subscribeNewButton.onclick = function() {
      step1.style.display = "none";
      step2Subscribe.style.display = "block";
    };
  }

  // === Переход на форму продления подписки ===
  if (renewSubscriptionButton) {
    renewSubscriptionButton.onclick = function() {
      step1.style.display = "none";
      step2Renew.style.display = "block";
    };
  }

  // === Обновление отображения выбранных месяцев ===
  if (subscriptionMonths) {
    subscriptionMonths.oninput = function() {
      monthDisplay.textContent = subscriptionMonths.value;
    };
  }

  // === Переход к подтверждению для оформления подписки ===
  if (nextToSummaryFromSubscribe) {
    nextToSummaryFromSubscribe.onclick = function() {
      const phoneInput = document.getElementById('phoneInput').value;
      const months = subscriptionMonths.value;

      if (phoneInput) {
        summaryText.innerHTML = `Оформление подписки на ${months} месяцев.<br> Телефон: ${phoneInput}`;
        step2Subscribe.style.display = "none";
        step3Summary.style.display = "block";
      } else {
        modalResultMessage.innerHTML = 'Пожалуйста, введите номер телефона.';
        modalResultMessage.style.color = 'red';
      }
    };
  }

  // === Переход к подтверждению для продления подписки ===
  if (nextToSummaryFromRenew) {
    nextToSummaryFromRenew.onclick = function() {
      const phoneRenewInput = document.getElementById('phoneRenewInput').value;

      if (phoneRenewInput) {
        summaryText.innerHTML = `Продление подписки.<br> Телефон: ${phoneRenewInput}`;
        step2Renew.style.display = "none";
        step3Summary.style.display = "block";
      } else {
        modalResultMessage.innerHTML = 'Пожалуйста, введите номер телефона.';
        modalResultMessage.style.color = 'red';
      }
    };
  }

  // === Показ уведомления после подтверждения подписки ===
  if (confirmSubscription) {
    confirmSubscription.onclick = function() {
      modalResultMessage.innerHTML = `Подписка успешно оформлена!`;
      modalResultMessage.style.color = '#00b894';
      subscribeModal.style.display = "none";

      // Показываем уведомление
      showNotification("SMS с данными придет на телефон. Спасибо!");
    };
  }

  // === Обработчик для кнопки подписки на рассылку ===
  const subscribeButton = document.getElementById('subscribeButton');
  if (subscribeButton) {
    subscribeButton.onclick = function() {
      const emailInput = document.getElementById('emailInput').value;
      const subscriptionMessage = document.getElementById('subscriptionMessage');

      if (validateEmail(emailInput)) {
        subscriptionMessage.innerHTML = 'Вы подписались на рассылку, спасибо!';
        subscriptionMessage.style.color = 'green';
      } else {
        subscriptionMessage.innerHTML = 'Пожалуйста, введите корректный email.';
        subscriptionMessage.style.color = 'red';
      }
    };
  }

  // === Валидация email ===
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // === Функция для показа уведомления ===
  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.classList.add('show');

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // === Закрыть модальное окно при клике вне его области ===
  window.onclick = function(event) {
    if (event.target == subscribeModal) {
      subscribeModal.style.display = "none";
    }
    if (event.target == osModal) {
      osModal.style.display = "none";
    }
  };
});
document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript загружен и DOM полностью построен.");

  // Элементы для нового модального окна ввода email
  const downloadAppButton = document.getElementById('downloadAppButton'); // Кнопка "Скачать"
  const emailModal = document.getElementById('emailModal'); // Модальное окно для ввода email
  const closeEmailModal = document.getElementById('closeEmailModal'); // Кнопка закрытия модального окна
  const sendEmailButton = document.getElementById('sendEmailButton'); // Кнопка "Отправить" в модальном окне
  const emailInputSimple = document.getElementById('emailInputSimple'); // Поле для ввода email

  // === Обработчик для кнопки "Скачать" ===
  if (downloadAppButton) {
    downloadAppButton.onclick = function() {
      console.log('Кнопка "Скачать" была нажата.');
      if (emailModal) {
        emailModal.style.display = "flex"; // Открываем модальное окно ввода email
      } else {
        console.error('Ошибка: Модальное окно для ввода email не найдено в DOM.');
      }
    };
  }

  // === Закрытие модального окна ввода email ===
  if (closeEmailModal && emailModal) {
    closeEmailModal.onclick = function() {
      console.log('Закрытие модального окна для ввода email.');
      emailModal.style.display = "none";
    };
  }

  // === Обработчик для кнопки "Отправить" ===
  if (sendEmailButton) {
    sendEmailButton.onclick = function() {
      if (validateEmail(emailInputSimple.value)) {
        console.log('Письмо отправлено на почту.');
        alert('На вашу почту отправлено письмо, проверьте пожалуйста!');
        emailModal.style.display = "none";
      } else {
        console.log('Ошибка: Неверный email.');
        alert('Пожалуйста, введите корректный email.');
      }
    };
  }

  // === Закрытие модального окна при клике вне его области ===
  window.onclick = function(event) {
    if (emailModal && event.target == emailModal) {
      console.log('Клик вне окна для ввода email - закрытие окна.');
      emailModal.style.display = "none";
    }
  };

  // === Валидация email ===
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript загружен и DOM полностью построен.");

  // === Логика подписки (оставляем как было) ===
  const subscribeModal = document.getElementById('subscribeModal');
  const subscribeOptionsButton = document.getElementById('subscribeOptionsButton');
  const closeSubscribeModal = document.getElementById('closeSubscribeModal');
  const subscribeNewButton = document.getElementById('subscribeNewButton');
  const renewSubscriptionButton = document.getElementById('renewSubscriptionButton');

  const step1 = document.getElementById('step1');
  const step2Subscribe = document.getElementById('step2-subscribe');
  const step2Renew = document.getElementById('step2-renew');
  const step3Summary = document.getElementById('step3-summary');

  const nextToSummaryFromSubscribe = document.getElementById('nextToSummaryFromSubscribe');
  const nextToSummaryFromRenew = document.getElementById('nextToSummaryFromRenew');

  const monthDisplay = document.getElementById('monthDisplay');
  const subscriptionMonths = document.getElementById('subscriptionMonths');
  const modalResultMessage = document.getElementById('modalResultMessage');

  const summaryText = document.getElementById('summaryText');
  const confirmSubscription = document.getElementById('confirmSubscription');

  // Открытие модального окна подписки
  subscribeOptionsButton.onclick = function() {
    subscribeModal.style.display = "flex";
    step1.style.display = "block"; // Показать первый шаг
    step2Subscribe.style.display = "none";
    step2Renew.style.display = "none";
    step3Summary.style.display = "none";
    modalResultMessage.innerHTML = ''; // Очищаем сообщение
  };

  // Закрытие модального окна подписки
  closeSubscribeModal.onclick = function() {
    subscribeModal.style.display = "none";
  };

  // Переход на форму оформления подписки
  subscribeNewButton.onclick = function() {
    step1.style.display = "none";
    step2Subscribe.style.display = "block";
  };

  // Переход на форму продления подписки
  renewSubscriptionButton.onclick = function() {
    step1.style.display = "none";
    step2Renew.style.display = "block";
  };

  // Обновление отображения выбранных месяцев
  subscriptionMonths.oninput = function() {
    monthDisplay.textContent = subscriptionMonths.value;
  };

  // Переход к подтверждению для оформления подписки
  nextToSummaryFromSubscribe.onclick = function() {
    const phoneInput = document.getElementById('phoneInput').value;
    const months = subscriptionMonths.value;

    if (phoneInput) {
      summaryText.innerHTML = `Оформление подписки на ${months} месяцев.<br> Телефон: ${phoneInput}`;
      step2Subscribe.style.display = "none";
      step3Summary.style.display = "block";
    } else {
      modalResultMessage.innerHTML = 'Пожалуйста, введите номер телефона.';
      modalResultMessage.style.color = 'red';
    }
  };

  // Переход к подтверждению для продления подписки
  nextToSummaryFromRenew.onclick = function() {
    const phoneRenewInput = document.getElementById('phoneRenewInput').value;

    if (phoneRenewInput) {
      summaryText.innerHTML = `Продление подписки.<br> Телефон: ${phoneRenewInput}`;
      step2Renew.style.display = "none";
      step3Summary.style.display = "block";
    } else {
      modalResultMessage.innerHTML = 'Пожалуйста, введите номер телефона.';
      modalResultMessage.style.color = 'red';
    }
  };

  // Показ уведомления после подтверждения подписки
  confirmSubscription.onclick = function() {
    modalResultMessage.innerHTML = `Подписка успешно оформлена!`;
    modalResultMessage.style.color = '#00b894';
    subscribeModal.style.display = "none";

    // Показываем уведомление
    showNotification("SMS с данными придет на телефон. Спасибо!");
  };

  // === Логика для кнопки "Скачать" с модальным окном для ввода email ===
  const downloadAppButton = document.getElementById('downloadAppButton'); // Кнопка "Скачать"
  const emailModal = document.getElementById('emailModal'); // Модальное окно для ввода email
  const closeEmailModal = document.getElementById('closeEmailModal'); // Кнопка закрытия модального окна
  const sendEmailButton = document.getElementById('sendEmailButton'); // Кнопка "Отправить" в модальном окне
  const emailInputSimple = document.getElementById('emailInputSimple'); // Поле для ввода email

  if (downloadAppButton) {
    downloadAppButton.onclick = function() {
      console.log('Кнопка "Скачать" была нажата.');
      if (emailModal) {
        emailModal.style.display = "flex"; // Открываем модальное окно ввода email
      } else {
        console.error('Ошибка: Модальное окно для ввода email не найдено в DOM.');
      }
    };
  }

  if (closeEmailModal && emailModal) {
    closeEmailModal.onclick = function() {
      console.log('Закрытие модального окна для ввода email.');
      emailModal.style.display = "none";
    };
  }

  if (sendEmailButton) {
    sendEmailButton.onclick = function() {
      if (validateEmail(emailInputSimple.value)) {
        console.log('Письмо отправлено на почту.');
        alert('На вашу почту отправлено письмо, проверьте пожалуйста!');
        emailModal.style.display = "none";
      } else {
        console.log('Ошибка: Неверный email.');
        alert('Пожалуйста, введите корректный email.');
      }
    };
  }

  // === Закрытие модального окна при клике вне его области ===
  window.onclick = function(event) {
    if (event.target == subscribeModal) {
      subscribeModal.style.display = "none";
    }
    if (emailModal && event.target == emailModal) {
      emailModal.style.display = "none";
    }
  };

  // === Валидация email ===
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // === Функция для показа уведомления ===
  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.classList.add('show');

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
});
