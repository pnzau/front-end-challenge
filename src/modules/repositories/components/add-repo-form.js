import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';
import { history } from 'helpers';
import { backgroundColorAccent1, textColor } from 'modules/shared/components/theme';
import { omitFromObj, makeObj } from 'transformers';

const Form = props => {
    const {
        languages,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;

    const Option = styled.option`
        ${props => props.c && css`
            color: ${props.c};
        `}
    `;

    const CancelButton = styled.button`
        background-color: ${backgroundColorAccent1};
        color: ${textColor};
    `;

    const goHome = () => {
        history.push({
            pathname: '/'
        });
    }

    const handleCancel = () => {
        goHome();
    }

    return (
        <div className="col-lg-6 col-md-10 col-12 form-container pt-4 pb-5 rounded">
            <span className="font-weight-bolder text-bio">Add a Repository</span>
            <form className="pt-3" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 pb-2">
                        <input
                            id="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control rounded-0 bg-grey-300 text-grey-900 ${touched.name && !errors.name ? 'is-valid' : 'is-invalid'}`}
                            placeholder="Repo name"
                            required />
                        {
                            touched.name && errors.name && (
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )
                        }
                    </div>
                    <div className="col-12 pb-2">
                        <textarea
                            id="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control rounded-0 bg-grey-300 text-grey-900 ${touched.description && !errors.description ? 'is-valid' : 'is-invalid'}`}
                            rows="3"
                            placeholder="Repo description" />
                        {
                            touched.description && errors.description && (
                                <div className="invalid-feedback">
                                    {errors.description}
                                </div>
                            )
                        }
                    </div>
                    <div className="col-6 pb-2">
                        <select
                            id="primaryLanguage"
                            value={values.primaryLanguage}
                            className={`form-control rounded-0 bg-grey-300 ${touched.primaryLanguage && !errors.primaryLanguage ? 'is-valid' : 'is-invalid'}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value={JSON.stringify({ name: '', color: '' })}>Primary Language</option>
                            {
                                languages.map((lang, index) => (
                                    <Option value={JSON.stringify(lang)} key={index} c={lang.color}>
                                        {
                                            lang.name
                                        }
                                    </Option>
                                ))
                            }
                        </select>
                        {
                            touched.primaryLanguage && errors.primaryLanguage && (
                                <div className="invalid-feedback">
                                    {errors.primaryLanguage}
                                </div>
                            )
                        }
                    </div>
                    <div className="col-6 pb-2">
                        <div className="d-flex flex-row">
                            <span className="toggle-states pr-2"><strong>Public</strong></span>
                            <div className="custom-control custom-switch">
                                <input
                                    id="isPrivate"
                                    type="checkbox"
                                    className="custom-control-input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.isPrivate} />
                                <label className="custom-control-label toggle-states" htmlFor="isPrivate">
                                    <strong>Private</strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 pb-2">
                        <span>Repo Owner information</span>
                    </div>
                    <div className="col-12 pb-2">
                        <input
                            id="login"
                            value={values.login}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={`form-control rounded-0 bg-grey-300 text-grey-900 ${touched.login && !errors.login ? 'is-valid' : 'is-invalid'}`}
                            placeholder="Username" />
                        {
                            touched.login && errors.login && (
                                <div className="invalid-feedback">
                                    {errors.login}
                                </div>
                            )
                        }
                    </div>
                    <div className="col-12">
                        <input
                            id="avatarUrl"
                            type="url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.avatarUrl}
                            className={`form-control rounded-0 bg-grey-300 text-grey-900 ${touched.avatarUrl && !errors.avatarUrl ? 'is-valid' : 'is-invalid'}`}
                            placeholder="Profile picture url" />
                        {
                            touched.avatarUrl && errors.avatarUrl && (
                                <div className="invalid-feedback">
                                    {errors.avatarUrl}
                                </div>
                            )
                        }
                    </div>
                    <div className="col-12">
                        <div className="d-flex flex-row align-items-center justify-content-center pt-5">
                            <CancelButton className="btn mr-2 font-weight-bolder" onClick={handleCancel}>
                                Cancel
                            </CancelButton>
                            <button className="ml-2 btn bg-blue-500 text-grey-100 font-weight-bolder" type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

const FormikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required()
            .label('Repo Name'),
        description: Yup.string()
            .required()
            .label('Repo description'),
        primaryLanguage: Yup.string()
            .required()
            .label('primary language'),
        isPrivate: Yup.boolean()
            .label('Repo is Private'),
        avatarUrl: Yup.string()
            .required()
            .label('User avatar'),
        login: Yup.string()
            .required()
            .label('User name'),
    }),

    mapPropsToValues: ({ form }) => ({
        ...form,
    }),

    handleSubmit: (payload, bag) => {
        const primaryLanguage = JSON.parse(payload.primaryLanguage);
        bag.props.handleSubmit({
            ...omitFromObj(payload, ['login', 'avatarUrl', 'primaryLanguage']),
            ...makeObj('owner', payload.login, payload.avatarUrl),
            primaryLanguage,
        });
        bag.resetForm();
        bag.setSubmitting(false);
    },
    displayName: 'Add Repo Form',
});

const SAddRepoForm = FormikEnhancer(Form);

function mapStateToProps(state) {
    return {
        repo: state.repo
    }
}

export const AddRepoForm = connect(mapStateToProps, actions)(SAddRepoForm);