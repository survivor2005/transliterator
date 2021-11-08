document.addEventListener('DOMContentLoaded', () => {
    const fieldOne = document.querySelector('.input-one'),
        fieldTwo = document.querySelector('.input-two'),
        fields = document.querySelectorAll('.field'),
        standartCheckBoxes = document.querySelectorAll('.standart-checkbox'),
        clearBtn = document.querySelector('.input-clear-img-box'),
        pasteBtnforOneField = document.querySelector('.field-one-paste'),
        copyBtnforOneField = document.querySelector('.field-one-copy'),
        copyBtnforTwoField = document.querySelector('.field-two-copy');

    //отключаем стандартное поведение сабмит у формы
    document.forms[0].addEventListener('submit', (e) => {
        e.preventDefault();
    });

    
    //выбор стандарта
    function getSelectedStandart(checkBoxes) {
        for(let checkbox of checkBoxes) {
            if(checkbox.checked) {
                return checkbox.value;
            }
        }
    }


    //обратный перевод
    function translateReverse(letter, table) {
        for(let i in table) {
            if(letter == table[i]) {
                return i;
            }
        }
        return `<span class="wrong" title="Неизвестный символ">${letter}</span>`;
    }
    
     

    //Принимает букву и подставляет ее в качестве ключа к объекту table и возвращает значение
    function translateLetter(letter, table) {
        if (table[letter] !== undefined) {
            return table[letter];
        }
        return `<span class="wrong" title="Неизвестный символ">${letter}</span>`;
    }

    //Принимает стоку и разбивает ее побуквенно в массив и его возвращает
    function splitLetter(string) {
        return string.split('');
    }

    //принимает массив с буквами и для каждой буквы вызывает функцию translateLetter (Возвращает массив со значениями из объекта table)
    function translateLetterData(arr) {
        return arr.map((letter) => {
            if(standartCheckBoxes[0].checked) {
                return translateLetter(letter, ruSwiftRur6);
            }
            
        });
    }

    // принимает массив и собирает его в строку возвращая ее
    function joinLetter(arr) {
        return arr.join('');
    }

    fieldOne.addEventListener('input', () => {
        fieldTwo.innerHTML = joinLetter(translateLetterData(splitLetter(fieldOne.value)));
    });



    {
        //кнопка сабмит больше не нужна все происходит на событии инпут
        // document.forms[0].addEventListener('submit', () => { //событие сабмит на форму 
        //     let text = fieldOne.value; //читаем строку из текстэрии и присваиваем ее в переменную
        //     fieldTwo.value = joinLetter(translateLetterData(splitLetter(text))); //в поле перевода вставляем обработанный текст
        // });
    }

    //копирует в буфер обмена текст из поля инпут
    function copyAllInputText(fieldId) {
        let range = document.createRange();
        range.selectNode(fieldId);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }

    //событие при нажатии на кнопку копировать
    copyBtnforTwoField.addEventListener('click', () => {
        // console.log(document.querySelector('#input-two'));
        copyAllInputText(document.querySelector('#input-two'));
    });

    //событие при нажатии на кнопку копировать
    // copyBtnforOneField.addEventListener('click', () => {
    //     copyAllInputText(fieldOne);
    // });

    function resizeInputHeight(inputs) { //подстраивает размет окна ввода
        for (let inp of inputs) {
            inp.style.height = '';
            inp.style.height = inp.scrollHeight + 'px';
        }
    }

    //подстраивает размет окна ввода
    document.forms[0].addEventListener('input', function (e) {
        if (e.target.id != 'input-one') {
            return;
        }
        resizeInputHeight(fields);
    });



    

    //показывает или скрывает кнопку очистить
    function viewClearBtn(clearBtn, input) {
        if (!input.value.length) {
            if (clearBtn.classList.contains('invisible')) {
                return;
            }
            clearBtn.classList.add('invisible');
            return;
        } else {
            if (!clearBtn.classList.contains('invisible')) {
                return;
            }
            clearBtn.classList.remove('invisible');
        }
    }

   
    

    // очистить содержимое полей при нажатии на кнопку очистить
    clearBtn.addEventListener('click', function () {
        if(!fieldOne.value.length){
            return;
        } else {
            fieldOne.value = '';
        }
        if(!fieldOne.value.length) {
            fieldTwo.innerHTML='';
        }
        viewClearBtn(this, fieldOne);
        resizeInputHeight(fields); //переназначает высоту полей ввода
    });

    //скрывает кнопку очистки если поле ввода пустое
    fieldOne.addEventListener('input', function () {
        viewClearBtn(clearBtn, this);
    });

});