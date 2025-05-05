import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function ResetPasswordForm({ token }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("resetPassword");
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.newPassword || form.newPassword.length < 8) {
      errs.newPassword = t("errors.passwordLength");
    }
    if (form.newPassword !== form.confirmPassword) {
      errs.confirmPassword = t("errors.passwordMismatch");
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await dispatch(
        resetPassword({ token, newPassword: form.newPassword })
      ).unwrap();

      toast.success(result || t("success"));
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || t("errors.default"));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormTitle>{t("title")}</FormTitle>

      <StyledInput
        type="password"
        name="newPassword"
        placeholder={t("placeholders.newPassword")}
        value={form.newPassword}
        onChange={handleChange}
        $hasError={!!errors.newPassword}
      />
      {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}

      <StyledInput
        type="password"
        name="confirmPassword"
        placeholder={t("placeholders.confirmPassword")}
        value={form.confirmPassword}
        onChange={handleChange}
        $hasError={!!errors.confirmPassword}
      />
      {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>
    </StyledForm>
  );
}

// 🎨 Styled Components

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
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
