import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthMessages } from "@/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import styled from "styled-components";
import zxcvbn from "zxcvbn";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("register");

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      navigate("/login");
    }
  }, [successMessage, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [error, dispatch]);

  const validate = () => {
    const errs = {};

    if (!form.username.trim()) {
      errs.username = t("errors.username");
    }

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

    const pwStrength = zxcvbn(form.password);
    if (pwStrength.score < 2) {
      errs.password = t("errors.weakPassword");
    }

    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = t("errors.confirmPassword");
    }

    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        name: form.username,
        email: form.email,
        password: form.password,
      };
      await dispatch(registerUser(payload)).unwrap();
    } catch (err) {
      toast.error(t("error"),err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Username */}
      <FormGroup>
        <Label htmlFor="username">{t("username")}</Label>
        <InputWrapper $hasError={!!errors.username}>
          <Icon><FaUser /></Icon>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={t("placeholders.username")}
          />
        </InputWrapper>
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
      </FormGroup>

      {/* Email */}
      <FormGroup>
        <Label htmlFor="email">{t("email")}</Label>
        <InputWrapper $hasError={!!errors.email}>
          <Icon><FaEnvelope /></Icon>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("placeholders.email")}
          />
        </InputWrapper>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      {/* Password */}
      <FormGroup>
        <Label htmlFor="password">{t("password")}</Label>
        <InputWrapper $hasError={!!errors.password}>
          <Icon><FaLock /></Icon>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t("placeholders.password")}
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

      {/* Confirm Password */}
      <FormGroup>
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <InputWrapper $hasError={!!errors.confirmPassword}>
          <Icon><FaLock /></Icon>
          <Input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder={t("placeholders.confirmPassword")}
          />
          <TogglePassword
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputWrapper>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </FormGroup>

      {/* Terms */}
      <Terms>
        {t("agree")} <a href="/terms">{t("terms")}</a> {t("and")}{" "}
        <a href="/privacy">{t("privacy")}</a>.
      </Terms>

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? t("loading") : t("submit")}
      </SubmitButton>

      {/* Alt Action */}
      <AltAction>
        <p>
          {t("haveAccount")} <a href="/login">{t("loginNow")}</a>
        </p>
      </AltAction>
    </Form>
  );
}

/* -----------------------------------
----------------------------------- */

const Form = styled.form`
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  transition: ${({ theme }) => theme.transition.fast};

  &:focus-within {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.primary)};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
  }
`;

const Icon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.6;
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
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
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

const Terms = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
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

const AltAction = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition.fast};

    &:hover {
      text-decoration: underline;
    }
  }
`;
