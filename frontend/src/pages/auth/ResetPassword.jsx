import { useParams } from "react-router-dom";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import styled from "styled-components";

export default function ResetPasswordPage() {
  const { token } = useParams(); // ✅ React Router

  return (
    <Wrapper>
      <ResetPasswordForm token={token} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 480px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.text};
`;
