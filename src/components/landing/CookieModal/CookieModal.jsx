"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieModal() {
    const [showCookieModal, setShowCookieModal] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem("cookieConsent");

        if (!cookieConsent) {
            setShowCookieModal(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowCookieModal(false);
    };

    const rejectCookies = () => {
        localStorage.setItem("cookieConsent", "rejected");
        setShowCookieModal(false);
    };

    if (!showCookieModal) {
        return null;
    }

    return (
        <>
            <div className="cookie-modal">
                <div className="cookie-modal__content">
                    <div className="cookie-modal__text">
                        <h2>Мы используем cookie</h2>

                        <p>
                            Мы используем файлы cookie для корректной работы
                            сайта, сохранения пользовательских настроек и
                            улучшения работы сервиса. Некоторые cookie могут
                            использоваться для сбора обезличенной статистики.
                        </p>

                        <p>
                            Нажимая «Принять», вы соглашаетесь на использование
                            файлов cookie в соответствии с{" "}
                            <Link href="/cookie">
                                Политикой обработки персональных данных
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="cookie-modal__buttons">
                        <button
                            className="cookie-modal__button cookie-modal__button--reject"
                            type="button"
                            onClick={rejectCookies}
                        >
                            Отклонить
                        </button>

                        <button
                            className="cookie-modal__button cookie-modal__button--accept"
                            type="button"
                            onClick={acceptCookies}
                        >
                            Принять
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .cookie-modal {
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 99999;

                    display: flex;
                    justify-content: center;

                    width: 100%;
                    padding: 20px;
                    pointer-events: none;
                }

                .cookie-modal__content {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 32px;

                    width: 100%;
                    max-width: 1180px;

                    padding: 24px 28px;

                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    border-radius: 20px;

                    box-shadow:
                        0 8px 30px rgba(0, 0, 0, 0.08),
                        0 2px 8px rgba(0, 0, 0, 0.04);

                    pointer-events: auto;
                }

                .cookie-modal__text {
                    max-width: 780px;
                }

                .cookie-modal__text h2 {
                    margin: 0 0 10px;

                    font-size: 20px;
                    line-height: 1.3;
                    font-weight: 600;

                    color: #1f1f1f;
                }

                .cookie-modal__text p {
                    margin: 0 0 8px;

                    font-size: 14px;
                    line-height: 1.55;

                    color: #555555;
                }

                .cookie-modal__text p:last-child {
                    margin-bottom: 0;
                }

                .cookie-modal__text a {
                    color: #222222;
                    font-weight: 500;

                    text-decoration: underline;
                    text-underline-offset: 3px;
                }

                .cookie-modal__buttons {
                    display: flex;
                    flex-shrink: 0;
                    gap: 10px;
                }

                .cookie-modal__button {
                    min-width: 120px;

                    padding: 13px 20px;

                    border: none;
                    border-radius: 12px;

                    font-family: inherit;
                    font-size: 14px;
                    line-height: 1;
                    font-weight: 500;

                    cursor: pointer;

                    transition:
                        opacity 0.2s ease,
                        transform 0.2s ease,
                        background-color 0.2s ease;
                }

                .cookie-modal__button:hover {
                    transform: translateY(-1px);
                }

                .cookie-modal__button:active {
                    transform: translateY(0);
                }

                .cookie-modal__button--reject {
                    background: #f1f1f1;
                    color: #333333;
                }

                .cookie-modal__button--reject:hover {
                    background: #e9e9e9;
                }

                .cookie-modal__button--accept {
                    background: #222222;
                    color: #ffffff;
                }

                .cookie-modal__button--accept:hover {
                    opacity: 0.85;
                }

                @media (max-width: 768px) {
                    .cookie-modal {
                        padding: 16px;
                    }

                    .cookie-modal__content {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 20px;

                        padding: 20px;

                        border-radius: 16px;
                    }

                    .cookie-modal__text {
                        max-width: none;
                    }

                    .cookie-modal__text h2 {
                        font-size: 18px;
                    }

                    .cookie-modal__text p {
                        font-size: 13px;
                        line-height: 1.5;
                    }

                    .cookie-modal__buttons {
                        width: 100%;
                    }

                    .cookie-modal__button {
                        flex: 1;
                        min-width: 0;

                        padding: 14px 16px;
                    }
                }

                @media (max-width: 480px) {
                    .cookie-modal {
                        padding: 10px;
                    }

                    .cookie-modal__content {
                        gap: 16px;

                        padding: 18px 16px;

                        border-radius: 14px;
                    }

                    .cookie-modal__text h2 {
                        margin-bottom: 8px;
                        font-size: 17px;
                    }

                    .cookie-modal__text p {
                        font-size: 12px;
                        line-height: 1.5;
                    }

                    .cookie-modal__buttons {
                        flex-direction: column-reverse;
                        gap: 8px;
                    }

                    .cookie-modal__button {
                        width: 100%;
                        min-height: 44px;
                    }
                }
            `}</style>
        </>
    );
}