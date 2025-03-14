import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useTranslation } from 'react-i18next';

export function Donations() 
{
  const [donationAmount, setDonationAmount] = useState<string>('0.00');
  const { t } = useTranslation();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(event.target.value);
  };

  return (
    <div className="donations-container" id="donaciones">
      <h2>{t('donations.title')}</h2>
      <p>{t('donations.description')}</p>
      <div className="donation-amount">
        <label htmlFor="donationAmount">{t('donations.amount')}</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleAmountChange}
        />
      </div>
      <PayPalScriptProvider options={{ clientId: "AdKvB-0qEevsvqyPKtXije1ute0zHcTc4fNtnI2qqp4nlY6of7tWPPo6KkWSP_LftFXes9sFFphR1E5M" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order?.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: 'CAD',
                    value: donationAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions): Promise<void> => {
            if (!actions.order) {
              return Promise.resolve();
            }
            return actions.order.capture().then((details) => {
              alert(t('donations.success') + " " + details?.payer?.name?.given_name);
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};