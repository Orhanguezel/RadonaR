import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthMessages } from "@/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation("forgotPassword");

  const { loading, successMessage, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
    }

    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorText(t("errors.invalidEmail"));
      return;
    }

    try {
      await dispatch(forgotPassword(email)).unwrap();
    } catch (err) {
      toast.error(err?.message || t("errors.default"));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder={t("placeholder")}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorText("");
        }}
        autoComplete="email"
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </StyledForm>
  );
}

// ✅ Stil dosyaları burada:

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  input {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: ${({ theme }) => theme.fonts.body};

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
      opacity: 0.5;
      font-style: italic;
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
      outline: none;
    }
  }
`;

const ErrorText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
