import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import mangoStore from '@store/mangoStore'
import {
  ACCOUNT_ACTION_MODAL_INNER_HEIGHT,
  // INPUT_TOKEN_DEFAULT,
} from '../utils/constants'
import { notify } from '../utils/notifications'
import { TokenAccount } from '../utils/tokens'
// import ActionTokenList from './account/ActionTokenList'
import Label from './forms/Label'
import Button, { IconButton } from './shared/Button'
import Loading from './shared/Loading'
import { EnterBottomExitBottom, FadeInFadeOut } from './shared/Transitions'
import MaxAmountButton from '@components/shared/MaxAmountButton'
import Tooltip from '@components/shared/Tooltip'
import SolBalanceWarnings from '@components/shared/SolBalanceWarnings'
import useSolBalance from 'hooks/useSolBalance'
import { floorToDecimal, withValueLimit } from 'utils/numbers'
import BankAmountWithValue from './shared/BankAmountWithValue'
// import useBanksWithBalances from 'hooks/useBanksWithBalances'
import { isMangoError } from 'types'
import TokenListButton from './shared/TokenListButton'
import TokenLogo from './shared/TokenLogo'
import SecondaryConnectButton from './shared/SecondaryConnectButton'
import useMangoAccountAccounts from 'hooks/useMangoAccountAccounts'
import InlineNotification from './shared/InlineNotification'
import Link from 'next/link'
import BackButton from './swap/BackButton'
import useMangoGroup from 'hooks/useMangoGroup'
import FormatNumericValue from './shared/FormatNumericValue'
import useMangoAccount from 'hooks/useMangoAccount'
import { unstakeAndClose } from 'utils/transactions'

const set = mangoStore.getState().set

interface UnstakeFormProps {
  onSuccess: () => void
  token: string
}

export const walletBalanceForToken = (
  walletTokens: TokenAccount[],
  token: string,
): { maxAmount: number; maxDecimals: number } => {
  const group = mangoStore.getState().group
  const bank = group?.banksMapByName.get(token)?.[0]

  let walletToken
  if (bank) {
    const tokenMint = bank?.mint
    walletToken = tokenMint
      ? walletTokens.find((t) => t.mint.toString() === tokenMint.toString())
      : null
  }

  return {
    maxAmount: walletToken ? walletToken.uiAmount : 0,
    maxDecimals: bank?.mintDecimals || 6,
  }
}

function UnstakeForm({ onSuccess, token: selectedToken }: UnstakeFormProps) {
  const { t } = useTranslation(['common', 'account'])
  const [inputAmount, setInputAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  // const [selectedToken, setSelectedToken] = useState(
  //   token || INPUT_TOKEN_DEFAULT,
  // )
  const [showTokenList, setShowTokenList] = useState(false)
  const [refreshingWalletTokens, setRefreshingWalletTokens] = useState(false)
  const { maxSolDeposit } = useSolBalance()
  // const banks = useBanksWithBalances('walletBalance')
  const { usedTokens, totalTokens } = useMangoAccountAccounts()
  const { group } = useMangoGroup()
  const { mangoAccount } = useMangoAccount()

  const stakeBank = useMemo(() => {
    return group?.banksMapByName.get(selectedToken)?.[0]
  }, [selectedToken, group])

  const solBank = useMemo(() => {
    return group?.banksMapByName.get('SOL')?.[0]
  }, [group])

  const tokenPositionsFull = useMemo(() => {
    if (!stakeBank || !usedTokens.length || !totalTokens.length) return false
    const hasTokenPosition = usedTokens.find(
      (token) => token.tokenIndex === stakeBank.tokenIndex,
    )
    return hasTokenPosition ? false : usedTokens.length >= totalTokens.length
  }, [stakeBank, usedTokens, totalTokens])

  const { connected, publicKey } = useWallet()

  const tokenMax = useMemo(() => {
    if (!stakeBank || !mangoAccount) return { maxAmount: 0.0, maxDecimals: 6 }
    return {
      maxAmount: mangoAccount.getTokenBalanceUi(stakeBank),
      maxDecimals: stakeBank.mintDecimals,
    }
  }, [stakeBank, mangoAccount])

  const setMax = useCallback(() => {
    const max = floorToDecimal(tokenMax.maxAmount, tokenMax.maxDecimals)
    setInputAmount(max.toFixed())
  }, [tokenMax])

  // const handleSelectToken = (token: string) => {
  //   setSelectedToken(token)
  //   setShowTokenList(false)
  // }

  const handleRefreshWalletBalances = useCallback(async () => {
    if (!publicKey) return
    const actions = mangoStore.getState().actions
    setRefreshingWalletTokens(true)
    await actions.fetchMangoAccounts(publicKey)
    setRefreshingWalletTokens(false)
  }, [publicKey])

  const solBorrowed = useMemo(() => {
    if (!solBank || !mangoAccount) return 0.0
    return mangoAccount.getTokenBalanceUi(solBank)
  }, [solBank, mangoAccount])

  const handleWithdraw = useCallback(async () => {
    const client = mangoStore.getState().client
    const group = mangoStore.getState().group
    const actions = mangoStore.getState().actions
    const mangoAccount = mangoStore.getState().mangoAccount.current

    if (!group || !stakeBank || !publicKey || !mangoAccount) return

    setSubmitting(true)
    try {
      console.log('starting deposit')
      const { signature: tx } = await unstakeAndClose(
        client,
        group,
        mangoAccount,
        stakeBank.mint,
        Number(inputAmount),
      )
      notify({
        title: 'Transaction confirmed',
        type: 'success',
        txid: tx,
      })

      await actions.fetchMangoAccounts(mangoAccount.owner)
      await actions.fetchWalletTokens(publicKey)
      setSubmitting(false)
      onSuccess()
    } catch (e) {
      console.error('Error depositing:', e)
      setSubmitting(false)
      if (!isMangoError(e)) return
      notify({
        title: 'Transaction failed',
        description: e.message,
        txid: e?.txid,
        type: 'error',
      })
    }
  }, [stakeBank, publicKey, inputAmount, onSuccess])

  const showInsufficientBalance =
    tokenMax.maxAmount < Number(inputAmount) ||
    (selectedToken === 'SOL' && maxSolDeposit <= 0)

  useEffect(() => {
    const group = mangoStore.getState().group
    set((state) => {
      state.swap.outputBank = group?.banksMapByName.get(selectedToken)?.[0]
    })
  }, [selectedToken])

  return (
    <>
      <EnterBottomExitBottom
        className={`absolute bottom-0 left-0 z-20 h-[${ACCOUNT_ACTION_MODAL_INNER_HEIGHT}] w-full overflow-auto rounded-lg bg-th-bkg-1 p-6`}
        show={showTokenList}
      >
        <BackButton onClick={() => setShowTokenList(false)} />
        <h2 className="mb-4 text-center text-lg">Select token to unstake</h2>
        <div className="flex items-center px-4 pb-2">
          <div className="w-1/2 text-left">
            <p className="text-xs">{t('token')}</p>
          </div>
          <div className="w-1/2 text-right">
            <p className="whitespace-nowrap text-xs">{t('wallet-balance')}</p>
          </div>
        </div>
        {/* <ActionTokenList
          banks={banks}
          onSelect={handleSelectToken}
          showDepositRates
          valueKey="walletBalance"
        /> */}
      </EnterBottomExitBottom>
      <FadeInFadeOut show={!showTokenList}>
        <div className="m-6 flex flex-col justify-between">
          <div>
            <SolBalanceWarnings
              amount={inputAmount}
              className="mb-4"
              setAmount={setInputAmount}
              selectedToken={selectedToken}
            />
            <div className="grid grid-cols-2">
              <div className="col-span-2 flex justify-between">
                <Label text={`Stake Token`} />
                <div className="mb-2 flex items-center space-x-2">
                  <MaxAmountButton
                    decimals={tokenMax.maxDecimals}
                    label={t('balance')}
                    onClick={setMax}
                    value={tokenMax.maxAmount}
                  />
                  <Tooltip content={t('account:refresh-balance')}>
                    <IconButton
                      className={refreshingWalletTokens ? 'animate-spin' : ''}
                      onClick={handleRefreshWalletBalances}
                      hideBg
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="col-span-1">
                <TokenListButton
                  token={selectedToken}
                  logo={<TokenLogo bank={stakeBank} />}
                  setShowList={setShowTokenList}
                />
              </div>
              <div className="col-span-1">
                <NumberFormat
                  name="amountIn"
                  id="amountIn"
                  inputMode="decimal"
                  thousandSeparator=","
                  allowNegative={false}
                  isNumericString={true}
                  decimalScale={stakeBank?.mintDecimals || 6}
                  className={
                    'w-full rounded-lg rounded-l-none border border-th-input-border bg-th-input-bkg p-3 text-right font-mono text-xl text-th-fgd-1 focus:outline-none focus-visible:border-th-fgd-4 md:hover:border-th-input-border-hover md:hover:focus-visible:border-th-fgd-4'
                  }
                  placeholder="0.00"
                  value={inputAmount}
                  onValueChange={(e: NumberFormatValues) => {
                    setInputAmount(
                      !Number.isNaN(Number(e.value)) ? e.value : '',
                    )
                  }}
                  isAllowed={withValueLimit}
                />
              </div>
            </div>
            {stakeBank && solBank ? (
              <>
                <div className="mt-2 space-y-1.5 px-2 py-4 text-sm">
                  <div className="flex justify-between">
                    <p>Staked amount</p>
                    <BankAmountWithValue
                      amount={tokenMax.maxAmount}
                      bank={stakeBank}
                    />
                  </div>
                  <div className="flex justify-between">
                    <p>SOL borrowed</p>
                    {solBank ? (
                      <FormatNumericValue value={solBorrowed} decimals={3} />
                    ) : null}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          {connected ? (
            <Button
              onClick={handleWithdraw}
              className="flex w-full items-center justify-center"
              disabled={connected && (!inputAmount || showInsufficientBalance)}
              size="large"
            >
              {submitting ? (
                <Loading className="mr-2 h-5 w-5" />
              ) : showInsufficientBalance ? (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-2 h-5 w-5 flex-shrink-0" />
                  {t('swap:insufficient-balance', {
                    symbol: selectedToken,
                  })}
                </div>
              ) : (
                <div className="flex items-center">
                  Unstake {inputAmount} {selectedToken}
                </div>
              )}
            </Button>
          ) : (
            <SecondaryConnectButton
              className="flex w-full items-center justify-center"
              isLarge
            />
          )}
          {tokenPositionsFull ? (
            <InlineNotification
              type="error"
              desc={
                <>
                  {t('error-token-positions-full')}{' '}
                  <Link href="/settings" onClick={() => onSuccess()} shallow>
                    {t('manage')}
                  </Link>
                </>
              }
            />
          ) : null}
        </div>
      </FadeInFadeOut>
    </>
  )
}

export default UnstakeForm
