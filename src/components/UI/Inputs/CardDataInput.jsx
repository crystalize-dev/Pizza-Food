import React, { useState } from 'react';
import Input from '@/components/UI/Inputs/Input';

const CardDataInput = () => {
    const [cardNumbers, setCardNumbers] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardMm, setCardMm] = useState('');
    const [cardYy, setCardYy] = useState('');

    const changeNumbers = (e) => {
        const { value } = e.target;

        // Оставляем только цифры из ввода
        const filteredInput = value.replace(/\D/g, '');
        // Обрезаем до 16 символов
        const trimmedInput = filteredInput.slice(0, 16);
        // Форматируем номер карты: добавляем пробелы каждые 4 цифры
        const formattedInput = trimmedInput.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumbers(formattedInput);
    };

    const changeMonth = (e) => {
        const { value } = e.target;

        const newValue = value.replace(/\D/g, '');
        // Ограничиваем ввод от 1 до 12
        if (
            newValue !== '' &&
            (parseInt(newValue) < 1 || parseInt(newValue) > 12)
        ) {
            return;
        }

        setCardMm(newValue);
    };

    const changeYear = (e) => {
        const { value } = e.target;

        // Оставляем только цифры из ввода
        const newValue = value.replace(/\D/g, '');

        if (newValue !== '' && parseInt(newValue) > 3000) {
            return;
        }

        setCardYy(newValue);
    };

    const changeCvv = (e) => {
        const { value } = e.target;

        // Оставляем только цифры из ввода
        const newValue = value.replace(/\D/g, '');

        // Ограничиваем ввод от 1 до 999 и длину до 3 цифр
        if (
            newValue !== '' &&
            (parseInt(newValue) < 1 ||
                parseInt(newValue) > 999 ||
                newValue.length > 3)
        ) {
            return;
        }

        setCardCvv(newValue);
    };

    return (
        <div
            className={
                'flex h-fit w-full min-w-[24rem] flex-col gap-8 rounded-xl bg-white p-8 pt-12 shadow-md'
            }
        >
            <Input
                name={'cardNumbers'}
                inputMode="numeric"
                minLength={19}
                required={true}
                type="text"
                label={'Card numbers'}
                value={cardNumbers}
                className={'!w-full'}
                onChange={(e) => changeNumbers(e)}
            />

            <div
                className={
                    'mt-4 flex h-fit w-full items-center justify-between gap-4'
                }
            >
                <div className={'flex h-fit w-fit items-center gap-4'}>
                    <Input
                        name={'cardMonth'}
                        label={'MM'}
                        value={cardMm}
                        required={true}
                        minLength={1}
                        onChange={(e) => changeMonth(e)}
                        className={'!w-[4rem] !p-1'}
                        inputMode="numeric"
                    />
                    <Input
                        name={'cardYear'}
                        label={'YY'}
                        value={cardYy}
                        required={true}
                        minLength={1}
                        onChange={(e) => changeYear(e)}
                        className={'!w-[5rem] !p-1'}
                        inputMode="numeric"
                    />
                </div>
                <Input
                    name={'cardCVV'}
                    maxLength={3}
                    minLength={3}
                    label={'CVV'}
                    type={'password'}
                    required={true}
                    inputMode="numeric"
                    value={cardCvv}
                    onChange={(e) => changeCvv(e)}
                    className={'!w-[4rem] !p-1'}
                />
            </div>
        </div>
    );
};

export default CardDataInput;
