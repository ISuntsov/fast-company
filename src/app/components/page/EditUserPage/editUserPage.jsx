import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import Loader from '../../ui/loader/loader';
import BackButton from '../../common/backButton';
import { useAuth } from '../../../hooks/useAuth';

// import { useProfession } from '../../../hooks/useProfession';
// import { useQualities } from '../../../hooks/useQualities';
import { useSelector } from 'react-redux';
import {
    getQualities,
    getQualitiesLoadingStatus
} from '../../../store/qualities';
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions';

// import { color } from '../../../utils/color';
// import api from '../../../api';

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    // const { userId } = useParams();
    //     {
    //     name: '',
    //     email: '',
    //     profession: '',
    //     sex: 'male',
    //     qualities: []
    // }

    const { currentUser, updateUserData } = useAuth();

    const professions = useSelector(getProfessions());
    const profLoading = useSelector(getProfessionsLoadingStatus());
    // const { professions, isLoading: profLoading } = useProfession();

    const qualities = useSelector(getQualities());
    const qualLoading = useSelector(getQualitiesLoadingStatus());
    // const { qualities, isLoading: qualLoading } = useQualities();

    const professionsList = professions.map((profName) => ({
        label: profName.name,
        value: profName._id
    }));
    const qualitiesList = qualities.map((qualName) => ({
        label: qualName.name,
        value: qualName._id
        // color: color(qualName.color)
    }));

    // преобразование профессий и качеств c fake-api
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };
    //
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label
    //                     // color: color(qualities[quality].color)
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${currentUser._id}`);

        // api.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`));
    };

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
            // color: color(quality.color)
        }));
        return result;
    };

    // data.map((qual) => ({
    //     label: qual.name,
    //     value: qual._id
    //     color: color(qual.color)
    // }));

    useEffect(() => {
        setIsLoading(true);
        if (!profLoading && !qualLoading && currentUser) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }

        if (currentUser._id) setIsLoading(false);

        // api.users.getById(userId).then(({ profession, qualities, ...data }) =>
        //     setData((prevState) => ({
        //         ...prevState,
        //         ...data,
        //         qualities: transformData(qualities),
        //         profession: profession._id
        //     }))
        // );
        // api.professions.fetchAll().then((data) => {
        //     const professionsList = Object.keys(data).map((professionName) => ({
        //         label: data[professionName].name,
        //         value: data[professionName]._id
        //     }));
        //     setProfession(professionsList);
        // });
        // api.qualities.fetchAll().then((data) => {
        //     const qualitiesList = Object.keys(data).map((optionName) => ({
        //         value: data[optionName]._id,
        //         label: data[optionName].name,
        //         color: color(data[optionName].color)
        //     }));
        //     setQualities(qualitiesList);
        // });
    }, [profLoading, qualLoading, currentUser]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
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
                                    name="profession"
                                    value={data.profession}
                                    options={professionsList}
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
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
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
