'use client';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SuspenseWrapper from '@/components/SuspenseWrapper';

interface ErrorMessages {
    newPassword: string;
    repeatPassword: string;
}

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    let userId = null;

    const [newPassword, setnewPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonInDisabled, setIsButtonInDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessages>({
        newPassword: '',
        repeatPassword: '',
    });

    const { toast } = useToast();

    console.log('token', token);

    const router = useRouter();

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;

    function getMessageForField(field: keyof ErrorMessages): string {
        switch (field) {
            case 'newPassword':
                return 'Por favor, insira sua nova senha.';
            case 'repeatPassword':
                return 'Você precisa repetir a senha para confirmá-la.';

            default:
                return '';
        }
    }

    const togglePasswordVisibility = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsButtonInDisabled(true);
        try {
            const result = await axios.post(
                `${BASE_URL}/accounts/reset-password?token=${token}`,
                { newPassword, token, userId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(' result', result);

            if (result.status === 201) {
                toast({
                    title: 'Senha redefinida com sucesso!',
                    description:
                        'Sua nova senha foi configurada. Agora você pode fazer login com ela.',
                });
                router.push('/login');
            }
            setIsButtonInDisabled(false);
        } catch (error) {
            console.error('Erro ao redefinir a senha', error);
            toast({
                title: 'Erro',
                description:
                    'Não foi possível redefinir a senha. Tente novamente.',
                variant: 'destructive',
            });
        } finally {
            setIsButtonInDisabled(false);
        }
    };

    const handleBlur = (field: keyof ErrorMessages, value: string) => {
        setErrorMessage((prev: ErrorMessages) => {
            let errorMessage = value ? '' : getMessageForField(field);

            if (field === 'newPassword') {
                if (!value) {
                    errorMessage = getMessageForField(field);
                } else if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,}$/.test(
                        value
                    )
                ) {
                    errorMessage =
                        'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.';
                }
            }

            if (field === 'repeatPassword' && value !== newPassword) {
                errorMessage =
                    'As senhas não coincidem.Por favor, verifique e tente novamente.';
            }

            return {
                ...prev,
                [field]: errorMessage,
            };
        });
    };

    return (

        <SuspenseWrapper>
            
            <div className="flex md:min-h-screen items-center justify-center  bg-linear-gradient  p-4 sm:p-6 lg:p-8">
                <div className="bg-white dark:bg-dark-secondary-gradient p-6 sm:p-8 lg:p-10 border-y-primaryDark rounded-lg shadow-lg z-10 relative overflow-hidden w-full md:w-3/5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Vamos redefinir sua senha
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Por favor, insira sua nova senha e confirme-a abaixo.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Não se preocupe, estamos aqui para garantir que sua nova
                        senha seja segura e fácil de lembrar.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6"
                    >
                        <div className="relative w-full">
                            <label
                                htmlFor="email"
                                className="text-primaryDark dark:text-white-important text-xs"
                            >
                                Senha
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    autoComplete="password"
                                    placeholder="Senha"
                                    onBlur={() =>
                                        handleBlur('newPassword', newPassword)
                                    }
                                    value={newPassword}
                                    onChange={(e) => setnewPassword(e.target.value)}
                                    className="mt-1 px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm bg-white bg-opacity-80 dark:border-gray-700 w-full max-w-full focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:text-gray-300 text-sm"
                                />
                            </label>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {showPassword ? (
                                    <FiEyeOff
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer mt-6 text-gray-500"
                                    />
                                ) : (
                                    <FiEye
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer mt-6 text-gray-500"
                                    />
                                )}
                            </span>
                            {errorMessage.newPassword && (
                                <p className="text-redAtention  text-xs italic">
                                    {errorMessage.newPassword}
                                </p>
                            )}
                        </div>

                        <div className="relative w-full">
                            <label
                                htmlFor="email"
                                className="text-primaryDark dark:text-white-important text-xs"
                            >
                                Repetir a senha
                            </label>
                            <input
                                id="repeatPassword"
                                type={showPassword ? 'text' : 'password'}
                                name="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                onBlur={() =>
                                    handleBlur('repeatPassword', repeatPassword)
                                }
                                required
                                placeholder="Repetir a senha"
                                className="mt-1 px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm bg-white bg-opacity-80 dark:border-gray-700 w-full max-w-full focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:text-gray-300 text-sm"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {showPassword ? (
                                    <FiEyeOff
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer mt-6 text-gray-500 "
                                    />
                                ) : (
                                    <FiEye
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer mt-6 text-gray-500"
                                    />
                                )}
                            </span>
                        </div>
                        {errorMessage.newPassword && (
                            <p className="text-redAtention text-xs italic">
                                {errorMessage.newPassword}
                            </p>
                        )}
                        {errorMessage.repeatPassword && (
                            <p className="text-redAtention text-xs italic">
                                {errorMessage.repeatPassword}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isButtonInDisabled}
                            className="w-full flex items-center justify-center bg-secondary text-white-important px-4 py-2 rounded-lg shadow-md hover:bg-secondary-dark w-full max-w-full transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark"
                        >
                            {isButtonInDisabled ? (
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-3xl"
                                    viewBox="0 0 24 24"
                                ></svg>
                            ) : null}
                            Enviar nova senha
                        </button>
                        <div className="flex justify-between items-center mt-4 gap-2">
                            <Link
                                href="/login"
                                className="bg-secondary text-white-important px-4 text-xs py-2 rounded-lg shadow-md hover:bg-secondary-dark w-full max-w-full transition duration-300 hover:scale-105 whitespace-nowrap"
                            >
                                Voltar para o Login
                            </Link>

                            <Link
                                href="/"
                                className="bg-secondary text-center text-white-important px-4 py-2 text-xs rounded-lg shadow-md hover:bg-secondary-dark w-full max-w-full transition duration-300 hover:scale-105 whitespace-nowrap"
                            >
                                Voltar para a Home
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </SuspenseWrapper>
    );
};

export default ResetPassword;
