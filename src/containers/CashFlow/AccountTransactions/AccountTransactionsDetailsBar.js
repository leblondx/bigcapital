import React from 'react';
import styled from 'styled-components';
import {
  Popover,
  Menu,
  Position,
  Button,
  MenuItem,
  Classes,
} from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { curry } from 'lodash/fp';

import { Icon } from '../../../components';
import { useAccountTransactionsContext } from './AccountTransactionsProvider';

function AccountSwitchButton() {
  const { currentAccount } = useAccountTransactionsContext();

  return (
    <AccountSwitchButtonBase
      minimal={true}
      rightIcon={<Icon icon={'arrow-drop-down'} iconSize={24} />}
    >
      <AccountSwitchText>{currentAccount.name}</AccountSwitchText>
    </AccountSwitchButtonBase>
  );
}

function AccountSwitchItem() {
  const { push } = useHistory();
  const { cashflowAccounts } = useAccountTransactionsContext();

  // Handle item click.
  const handleItemClick = curry((account, event) => {
    push(`/cashflow-accounts/${account.id}/transactions`);
  });

  const items = cashflowAccounts.map((account) => (
    <AccountSwitchMenuItem
      name={account.name}
      onClick={handleItemClick(account)}
    />
  ));

  return (
    <Popover
      content={<Menu>{items}</Menu>}
      position={Position.BOTTOM_LEFT}
      minimal={true}
    >
      <AccountSwitchButton />
    </Popover>
  );
}

function AccountBalanceItem() {
  const { currentAccount } = useAccountTransactionsContext();

  return (
    <AccountBalanceItemWrap>
      Balance in Bigcapital{' '}
      <AccountBalanceAmount>
        {currentAccount.formatted_amount}
      </AccountBalanceAmount>
    </AccountBalanceItemWrap>
  );
}

function AccountTransactionsDetailsBarSkeleton() {
  return (
    <React.Fragment>
      <DetailsBarSkeletonBase className={Classes.SKELETON}>
        X
      </DetailsBarSkeletonBase>
      <DetailsBarSkeletonBase className={Classes.SKELETON}>
        X
      </DetailsBarSkeletonBase>
    </React.Fragment>
  );
}

function AccountTransactionsDetailsContent() {
  return (
    <React.Fragment>
      <AccountSwitchItem />
      <AccountBalanceItem />
    </React.Fragment>
  );
}

export function AccountTransactionsDetailsBar() {
  const { isCurrentAccountLoading } = useAccountTransactionsContext();

  return (
    <AccountTransactionDetailsWrap>
      {isCurrentAccountLoading ? (
        <AccountTransactionsDetailsBarSkeleton />
      ) : (
        <AccountTransactionsDetailsContent />
      )}
    </AccountTransactionDetailsWrap>
  );
}

function AccountSwitchMenuItem({
  name,
  balance,
  transactionsNumber,
  ...restProps
}) {
  return (
    <MenuItem
      label={'LYD100,000'}
      text={
        <React.Fragment>
          <AccountSwitchItemName>{name}</AccountSwitchItemName>
          <AccountSwitchItemTranscations>
            25 Transactions
          </AccountSwitchItemTranscations>

          <AccountSwitchItemUpdatedAt>
            Updated before 2 days
          </AccountSwitchItemUpdatedAt>
        </React.Fragment>
      }
      {...restProps}
    />
  );
}

const DetailsBarSkeletonBase = styled.div`
  letter-spacing: 10px;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 8px;
  width: 140px;
`;

const AccountBalanceItemWrap = styled.div`
  margin-left: 18px;
  color: #5f6d86;
`;

const AccountTransactionDetailsWrap = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid #d2dce2;
  padding: 0 22px;
  height: 42px;
  align-items: center;
`;
const AccountSwitchText = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const AccountBalanceAmount = styled.span`
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
  color: rgb(31, 50, 85);
`;

const AccountSwitchItemName = styled.div`
  font-weight: 600;
`;
const AccountSwitchItemTranscations = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

const AccountSwitchItemUpdatedAt = styled.div`
  font-size: 12px;
  opacity: 0.5;
`;

const AccountSwitchButtonBase = styled(Button)`
  .bp3-button-text {
    margin-right: 5px;
  }
`;