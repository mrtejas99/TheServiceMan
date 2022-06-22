import React, { useState } from 'react';
import { Form, Button, Spinner } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

import { sendPasswordReset, verifyPasswordReset } from '../firebase';

function Forgotpass(){
    const {t} = useTranslation("common");

    const FORM_STATES = {
        enterEmail: 0,
        waitEmailSend: 0.5,
        verifyCode: 1,
        waitVerifyCode: 1.5
    };
    const [formState, setFormState] = useState(FORM_STATES.enterEmail);
    const [verifyErrorMessage, setVerifyErrorMessage] = useState('');

    const performReset = e => {
        e.preventDefault();
        const form = e.currentTarget;

        setFormState(FORM_STATES.waitEmailSend);
        setVerifyErrorMessage('');

        sendPasswordReset(form.verifyUserEmail.value)
        .then(() => setFormState(FORM_STATES.verifyCode))
        .catch(err => {
            console.error(err);
            setVerifyErrorMessage(err.code);
            setFormState(FORM_STATES.enterEmail);
        });
    };

    const performVerify = e => {
        e.preventDefault();
        const form = e.currentTarget;

        setFormState(FORM_STATES.waitVerifyCode);
        setVerifyErrorMessage('');

        //TODO: Valaidate, new password and confirm are equal
        verifyPasswordReset(form.verifyCode.value, form.newUserPass.value)
        .then((data) => {
            console.log("Done");
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    const PasswordResetForm = () => {
        const isWaitingForEmail = formState === FORM_STATES.waitEmailSend;
        const isWaitingForCode = formState === FORM_STATES.waitVerifyCode;
        const formIsDisabled = isWaitingForEmail || isWaitingForCode;
        switch (formState) {
            //User has to enter email address
            case FORM_STATES.enterEmail:
            //User has submitted, but verification mail not sent yet.
            // eslint-disable-next-line no-fallthrough
            case FORM_STATES.waitEmailSend:
                return (
                <Form className="mx-auto my-3" onSubmit={performReset}>
                    <Form.Text className="mb-3">{t('Enter the Email address used for your account to send a verification code.')}</Form.Text>
                    <Form.Group as={Form.Floating} className='mb-3'>
                        <Form.Control required disabled={formIsDisabled} type="email" name="verifyUserEmail" placeholder="username@example.com" />
                        <Form.Label className="text-secondary">{t('email')}</Form.Label>
                    </Form.Group>
                    { (verifyErrorMessage.length > 0) && (
                        <>
                            <Form.Text className="text-danger">{t('Failed to send verification code: ')}{verifyErrorMessage}</Form.Text>
                            <Form.Text className="text-danger">{t('Please try again after some time.')}</Form.Text>
                        </>
                    )}
                    <div className='text-center'>
                        <Button disabled={formIsDisabled} type="submit" variant="primary">
                            {t('Send verification code')}
                            {isWaitingForEmail && (
                                <Spinner className="ml-1" as="span" size="sm" aria-hidden="true" animation="border" role="status">
                                    <span className="visually-hidden">...</span>
                                </Spinner>
                            )}
                        </Button>
                    </div>
                </Form>
            );
            case FORM_STATES.verifyCode:
                return (
                    <Form className="mx-auto my-3" onSubmit={performVerify}>
                        <Form.Text className="mb-3 text-info">{t('Enter the verification code sent to your Email address.')}</Form.Text>
                        <Form.Group as={Form.Floating} className='mb-3'>
                            <Form.Control required disabled={formIsDisabled} type="password" name="verifyCode" placeholder="1234" />
                            <Form.Label className="text-secondary">{t('Verification Code')}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Form.Floating} className='mb-3'>
                            <Form.Control required disabled={formIsDisabled} type="password" name="newUserPass" placeholder="password" />
                            <Form.Label className="text-secondary">{t('New password')}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Form.Floating} className='mb-3'>
                            <Form.Control required disabled={formIsDisabled} type="password" name="newUserPassValidate" placeholder="password" />
                            <Form.Label className="text-secondary">{t('Re-enter password')}</Form.Label>
                        </Form.Group>
                        { (verifyErrorMessage.length > 0) && (
                            <>
                                <Form.Text className="text-danger">{t('Failed to verify the code: ')}{verifyErrorMessage}</Form.Text>
                                <Form.Text className="text-danger">{t('Please make sure the code you entered is correct.')}</Form.Text>
                            </>
                        )}
                        <div className='text-center'>
                            <Button disabled={formIsDisabled} type="submit" variant="primary">
                                {t('reset')}
                                {isWaitingForCode && (
                                    <Spinner className="ml-1" as="span" size="sm" aria-hidden="true" animation="border" role="status">
                                        <span className="visually-hidden">...</span>
                                    </Spinner>
                                )}
                            </Button>
                        </div>
                    </Form>
                );
            default: break;
        }
    }

    return (
        <div className="w-50 mx-auto my-5">
            <h2 className="text-center">{t('forgotpass')}</h2>
            <PasswordResetForm />
        </div>
    );
}
export { Forgotpass };