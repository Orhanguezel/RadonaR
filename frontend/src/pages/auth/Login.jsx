import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, clearAuthMessages, fetchCurrentUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

export default function LoginForm({ switchTab }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = t("errors.email");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = t("errors.emailInvalid");
    }

    if (!form.password) {
      errs.password = t("errors.password");
    } else if (form.password.length < 8) {
      errs.password = t("errors.passwordLength");
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await dispatch(loginUser({ email: form.email, password: form.password })).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      toast.success(t("success"));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.message || t("errors.default"));
    } finally {
      setLoading(false);
      dispatch(clearAuthMessages());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">{t("email")}</label>
        <InputWrapper $hasError={!!errors.email}>
          <Icon><FaEnvelope /></Icon>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("placeholders.email")}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
          />
        </InputWrapper>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">{t("password")}</label>
        <InputWrapper $hasError={!!errors.password}>
          <Icon><FaLock /></Icon>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("placeholders.password")}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={loading}
          />
          <TogglePassword
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormGroup>

      <FormOptions>
        <RememberMe>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">{t("remember")}</label>
        </RememberMe>
        <ForgotPassword href="/forgot-password">
          {t("forgotPassword")}
        </ForgotPassword>
      </FormOptions>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>

      <AltAction>
        {t("noAccount")}{" "}
        <SwitchTabLink type="button" onClick={() => switchTab("register")}>
          {t("registerNow")}
        </SwitchTabLink>
      </AltAction>
    </Form>
  );
}

/* -------------------------------------
   STYLES (Aynı dosyanın altında)
------------------------------------- */

const Form = styled.form`
  width: 100%;
  max-width: 480px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-bottom: 2px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.danger : theme.colors.primaryTransparent};
  transition: ${({ theme }) => theme.transition.fast};

  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
    border-bottom-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Icon = styled.div`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:focus {
    outline: none;
  }
`;

const TogglePassword = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 1.1rem;
    height: 1.1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    appearance: none;
    cursor: pointer;
    position: relative;

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primaryHover};

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
    }
  }

  label {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ForgotPassword = styled.a`
  color: ${({ theme }) => theme.colors.primaryHover};
  text-decoration: none;
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.md};
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

const AltAction = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const SwitchTabLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    text-decoration: underline;
  }
`;

