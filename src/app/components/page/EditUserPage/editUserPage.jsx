import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validator } from '../../../utils/validator';
import api from '../../../api';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import Loader from '../../ui/loader/loader';
import { color } from '../../../utils/color';
import BackButton from '../../common/backButton';

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        items: []
    });

    const [professions, setProfession] = useState([]);
    const [items, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in items) {
                if (elem.value === items[quality].value) {
                    qualitiesArray.push({
                        _id: items[quality].value,
                        name: items[quality].label,
                        color: color(items[quality].color)
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, items } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                items: getQualities(items)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    const transformData = (data) => {
        return data.map((qual) => ({
            label: qual.name,
            value: qual._id,
            color: color(qual.color)
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, items, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                items: transformData(items),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.items.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: color(data[optionName].color)
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательная для заполнения'
            },
            isEmail: {
                message: 'Электронная почта введена некорректно'
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите профессию'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    if (data) {
        return (
            <div className="container m-5">
                <BackButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите Вашу профессию: "
                                    defaultOption="Выберите профессию"
                                    options={professions}
                                    name="profession"
                                    value={data.profession}
                                    onChange={handleChange}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите Ваш пол:"
                                />
                                <MultiSelectField
                                    defaultValue={data.items}
                                    options={items}
                                    onChange={handleChange}
                                    name="items"
                                    label="Выберите Ваши качества:"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto">
                                    Обновить данные
                                </button>
                            </form>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default EditUserPage;