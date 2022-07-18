import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, logIn } from '../../store/users';
// import { useAuth } from '../../hooks/useAuth';
// import * as yup from 'yup';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const { logIn } = useAuth();

    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const loginError = useSelector(getAuthError());
    // const [enterError, setEnterError] = useState(null);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required('Пароль обязателен для заполнения')
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             'Пароль должен содержать хотя бы одну заглавную букву'
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             'Пароль должен содержать хотя бы одну цифру'
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             'Пароль должен содержать один из специальных символов: !@#$%^&*'
    //         )
    //         .matches(/(?=.{8,})/, 'Пароль должен быть не короче 8 символов'),
    //     email: yup
    //         .string()
    //         .required('Электронная почта обязательная для заполнения')
    //         .email('Электронная почта введена некорректно')
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательная для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
        dispatch(logIn({ payload: data, redirect }));

        // try {
        //     await logIn(data);
        //
        //     history.push(
        //         history.location.state
        //             ? history.location.state.from.pathname
        //             : '/'
        //     );
        // } catch (error) {
        //     setEnterError(error.message);
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn">
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto">
                Отправить
            </button>
        </form>
    );
};

export default LoginForm;
