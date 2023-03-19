export const passwordIsCorrect = (password) => {
    if (password.length < 8) {
        throw new Error("Пароль дуже короткий");
    }

    const regex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/gi);

    return regex.test(password);
};

export const checkEmail = (map, email) => {
    for (let [key, value] of map.entries()) {
        if (value.email === email) return key;
    }
};

