import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        toast.success("You have been logged out successfully.");
      } catch (err) {
        toast.error("An error occurred during logout.",err);
      } finally {
        navigate("/login");
      }
    };

    doLogout();
  }, [dispatch, navigate]);

  return (
    <Wrapper>
      <h1>Logging out...</h1>
      <p>Please wait while we log you out.</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
