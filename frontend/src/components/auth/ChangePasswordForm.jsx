import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearAuthMessages } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation("changePassword");
  const { loading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAuthMessages());
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessages());
    }
  }, [successMessage, error, dispatch]);

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = t("errors.currentRequired");
    if (!form.newPassword || form.newPassword.length < 8)
      errs.newPassword = t("errors.newLength");
    if (form.newPassword !== form.confirmPassword)
      errs.confirmPassword = t("errors.confirmMismatch");
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(
        changePassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        })
      ).unwrap();
    } catch {
      toast.error(t("errors.default"));
    }
  };

  return (
    <Wrapper>
      <h2>{t("title")}</h2>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <input
            type="password"
            name="currentPassword"
            placeholder={t("placeholders.current")}
            value={form.currentPassword}
            onChange={handleChange}
          />
          {errors.currentPassword && <Error>{errors.currentPassword}</Error>}
        </FormGroup>

        <FormGroup>
          <input
            type="password"
            name="newPassword"
            placeholder={t("placeholders.new")}
            value={form.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <Error>{errors.newPassword}</Error>}
        </FormGroup>

        <FormGroup>
          <input
            type="password"
            name="confirmPassword"
            placeholder={t("placeholders.confirm")}
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </SubmitButton>
      </StyledForm>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.text};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-align: center;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.fontSizes.base};
    background: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
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
