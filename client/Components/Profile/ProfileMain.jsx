import React, { useRef, useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { PatreonStatus } from '../../types';
import Panel from '../Site/Panel';
import Avatar from '../Site/Avatar';
import { unlinkPatreon } from '../../redux/actions';
import PatreonImage from '../../assets/img/Patreon_Mark_Coral.jpg';

import './ProfileMain.scss';
import Link from '../Navigation/Link';
import { patreonUrl } from '../../constants';

/**
 * @typedef { import('./Profile').ProfileDetails } ProfileDetails
 */

/**
 * @typedef ProfileMainProps
 * @property {import('formik').FormikProps<ProfileDetails>} formProps
 * @property {User} user
 */

/**
 * @param {ProfileMainProps} props
 */
const ProfileMain = ({ user, formProps }) => {
    const { t } = useTranslation();
    const inputFile = useRef(null);
    const [localAvatar, setAvatar] = useState(null);
    const dispatch = useDispatch();

    const onAvatarUploadClick = () => {
        if (!inputFile.current) {
            return;
        }

        inputFile.current.click();
    };

    let eloRating = '(calibrating)';
    if (user.rankedGamesPlayed >= 12) {
        eloRating = user?.eloRating ? Math.round(user.eloRating) : '';
    };
    return (
        <Panel title={t('Profile')}>
            <Form.Row>
                <Form.Group as={Col} md='6' controlId='formGridUsername'>
                    <Form.Label>{t('Username')}</Form.Label>
                    <Form.Control
                        readOnly
                        name='username'
                        type='text'
                        placeholder={t('Enter a username')}
                        value={formProps.values.username}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={formProps.touched.username && !!formProps.errors.username}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='6' controlId='formGridEmail'>
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control
                        name='email'
                        type='text'
                        placeholder={t('Enter an email address')}
                        value={formProps.values.email}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={formProps.touched.email && !!formProps.errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>{t('Avatar')}</Form.Label>
                    <div>
                        {!formProps.errors.avatar && localAvatar ? (
                            <img
                                className='profile-avatar'
                                src={localAvatar}
                                alt={user?.username}
                            />
                        ) : (
                            <Avatar imgPath={user?.avatar}></Avatar>
                        )}
                        <Button variant='secondary' onClick={onAvatarUploadClick}>
                            Change avatar
                        </Button>
                    </div>
                    <Form.Control
                        name='avatar'
                        type='file'
                        accept='image/*'
                        onChange={(event) => {
                            if (
                                !event.currentTarget ||
                                !event.currentTarget.files ||
                                event.currentTarget.files.length === 0
                            ) {
                                return;
                            }

                            const file = event.currentTarget.files[0];
                            setAvatar(URL.createObjectURL(file));
                            formProps.setFieldValue('avatar', file);
                        }}
                        onBlur={formProps.handleBlur}
                        hidden
                        ref={inputFile}
                        isInvalid={!!formProps.errors.avatar}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.avatar}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>{t('Patreon')}</Form.Label>
                    <div>
                        <img
                            className='profile-patreon-icon'
                            src={PatreonImage}
                            alt={t('Patreon Logo')}
                        />
                        {!user?.patreon || user?.patreon === PatreonStatus.Unlinked ? (
                            <Button variant='secondary' href={patreonUrl}>
                                Link Account
                            </Button>
                        ) : (
                            <Button variant='secondary' onClick={() => dispatch(unlinkPatreon())}>
                                Unlink Account
                            </Button>
                        )}
                    </div>
                </Form.Group>
                <Form.Group as={Col} md='3'>
                    <Form.Label>{t('Elo Rating')}</Form.Label>
                    <div>{eloRating}&nbsp;- <Link href='/elo'>View Elo Leaderboard</Link></div>

                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md='6' controlId='formGridPassword'>
                    <Form.Label>{t('Password')}</Form.Label>
                    <Form.Control
                        name='password'
                        type='password'
                        placeholder={t('Enter a password')}
                        value={formProps.values.password}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={formProps.touched.password && !!formProps.errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                    <Form.Label>{t('Password (again)')}</Form.Label>
                    <Form.Control
                        name='passwordAgain'
                        type='password'
                        placeholder={t('Enter the same password')}
                        value={formProps.values.passwordAgain}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        isInvalid={
                            formProps.touched.passwordAgain && !!formProps.errors.passwordAgain
                        }
                    />
                    <Form.Control.Feedback type='invalid'>
                        {formProps.errors.passwordAgain}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </Panel>
    );
};

export default ProfileMain;
