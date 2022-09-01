import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import styled from "styled-components";

import { LoadingButton } from "components";

import { useTrackPage } from "hooks/services/Analytics";
import { PAGE_TRACKING_CODES } from "hooks/services/Analytics/pageTrackingCodes";
import { useAuthService } from "packages/cloud/services/auth/AuthService";
import { SettingsCard } from "pages/SettingsPage/pages/SettingsComponents";

import { EmailSection, PasswordSection, NameSection } from "./components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccountSettingsView: React.FC = () => {
  const authService = useAuthService();
  const { mutateAsync: logout, isLoading: isLoggingOut } = useMutation(() => authService.logout());

  useTrackPage(PAGE_TRACKING_CODES.SETTINGS_ACCOUNT);
  return (
    <>
      <NameSection />
      <EmailSection />
      {authService.hasPasswordLogin() && <PasswordSection />}
      <SettingsCard
        title={
          <Header>
            <FormattedMessage id="settings.accountSettings.logoutLabel" />
            <LoadingButton danger onClick={() => logout()} isLoading={isLoggingOut} data-testid="button.signout">
              <FormattedMessage id="settings.accountSettings.logoutText" />
            </LoadingButton>
          </Header>
        }
      />
    </>
  );
};

export { AccountSettingsView };
