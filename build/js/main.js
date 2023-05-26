document.addEventListener('DOMContentLoaded', function() {
    //открытие списка селекта в форме
    function showSelectionsList() {
        var input = document.querySelector('.select-input'),
            list = document.querySelector('.select__list');

        if (input) {
            var closeSelectByEmptySpace = function closeSelectByEmptySpace() {
                // закрытие по клику на пустом месте
                document.addEventListener('click', function(e) {
                    if (list.classList.contains('select__list--active')) {
                        var withinSelectWrap = e.composedPath().includes(list);
                        var withinSelectInput = e.composedPath().includes(input);

                        if (!withinSelectWrap && !withinSelectInput) {
                            toggleFilterSelectList();
                        }
                    }
                });
            };

            var toggleFilterSelectList = function toggleFilterSelectList() {
                list.classList.toggle('select__list--active');
            };

            input.addEventListener('click', function() {
                list.classList.toggle('select__list--active');
            });;;
            closeSelectByEmptySpace();
        }

        ;
    }

    showSelectionsList(); //смещение плейсхолдера в инпуте при фокусе

    function animateInput() {
        var inputs = document.querySelectorAll('.order__form-input');

        if (inputs) {
            inputs.forEach(function(input) {
                var parent = input.closest('.input-group');
                parent.addEventListener('click', function() {
                    parent.classList.toggle('focus');
                });
            });
        }
    }

    animateInput();

    function openPopup() {
        var popup = document.querySelector('.create-product-modal');
        var button = document.querySelector('.add-button');
        var body = document.querySelector('body');

        if (popup) {
            button.addEventListener('click', function() {
                popup.classList.add('visible');
                body.classList.add('fixed-body');
            });
        }
    }

    openPopup();

    function closePopup() {
        var popup = document.querySelector('.create-product-modal');
        var button = document.querySelector('.modal-close__button');
        var body = document.querySelector('body');

        if (popup) {
            button.addEventListener('click', function() {
                popup.classList.remove('visible');
                body.classList.remove('fixed-body');
            });
        }
    }

    closePopup();

    function openSuccessWindow() {
        var window = document.querySelector('.success');
        var oldContent = document.querySelector('.agreement');
        var button = document.querySelector('.agreement__button');

        if (button) {
            button.addEventListener('click', function() {
                oldContent.classList.add('hide');
                window.classList.add('visible');
            });
        }
    }

    openSuccessWindow();

    function nav() {
        var nextButtons = document.querySelectorAll('.next-button');
        var backButtons = document.querySelectorAll('.back-button');
        var stepOne = '.step--one';
        var stepTwo = '.step--two';
        var stepThree = '.step--three';
        var STEPS = [stepOne, stepTwo, stepThree];
        var currentStep = 0;

        if (nextButtons.length > 0) {
            nextButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentStep++;
                    settings(currentStep);
                    render(this, currentStep);
                });
            });
        }

        if (backButtons.length > 0) {
            backButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    if (currentStep > 0) {
                        currentStep--;
                        settings(currentStep);
                        render(this, currentStep);
                    }
                });
            });
        }

        function render(target, currentStep) {
            if (currentStep > 2) {
                location.href = '/build/agreement.html';
            } else {
                var parent = target.closest('.step');

                if (parent.classList.contains('step--active')) {
                    parent.classList.remove('step--active');
                }

                document.querySelector(STEPS[currentStep]).classList.add('step--active');
            }
        }

        function settings(currentStep) {
            var intro = document.querySelector('.intro');

            if (currentStep > 0) {
                intro.classList.add('hide');
            } else {
                intro.classList.remove('hide');
            }
        }
    }

    nav();
    $('.agreement__input').on('keyup', function(e) {
        var value = $(this).val();
        var len = value.length;
        var curTabIndex = parseInt($(this).attr('tabindex'));
        var nextTabIndex = curTabIndex + 1;
        var prevTabIndex = curTabIndex - 1;

        if (len >= 1) {
            $(this).val(value.substr(0, 2));
            $('[tabindex=' + nextTabIndex + ']').focus();
        } else if (len == 0 && prevTabIndex !== 0) {
            $('[tabindex=' + prevTabIndex + ']').focus();
        }
    });
});