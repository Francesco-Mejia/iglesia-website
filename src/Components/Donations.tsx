import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Steps {
  [key: string]: string[];
}

export function Donations() {
  const [donationAmount, setDonationAmount] = useState<string>('0.00');
  const [interacEmail, setInteracEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  // Email Interac de l'église (à remplacer par votre email Interac)
  const CHURCH_INTERAC_EMAIL = "scristosalva@hotmail.fr";

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInteracEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      // Vérification du montant
      const amount = parseFloat(donationAmount);
      if (amount <= 0) {
        throw new Error('Le montant doit être supérieur à 0');
      }

      // Vérification de l'email
      if (!interacEmail.includes('@')) {
        throw new Error('Email invalide');
      }

      // Création du message pour l'utilisateur
      const message = `
        ${t('donations.interac.title')}
        
        ${t('donations.interac.instructions')}:
        1. ${t('donations.interac.steps.0')}
        2. ${t('donations.interac.steps.1')}
        3. ${t('donations.interac.steps.2')}
        4. ${t('donations.interac.steps.3')}
        
        Email Interac de l'église: ${CHURCH_INTERAC_EMAIL}
        Montant à envoyer: ${amount} CAD
        Message de sécurité: "Don ${new Date().toISOString().split('T')[0]}"
        
        ${t('donations.success')} ${interacEmail}
      `;

      // Afficher le message de succès
      setSuccess(true);
      alert(message);

      // Copier les informations dans le presse-papier
      await navigator.clipboard.writeText(`
        Email Interac: ${CHURCH_INTERAC_EMAIL}
        Montant: ${amount} CAD
        Message: Don ${new Date().toISOString().split('T')[0]}
      `);

      // Réinitialiser le formulaire
      setDonationAmount('0.00');
      setInteracEmail('');

    } catch (err) {
      setError(err instanceof Error ? err.message : t('donations.interac.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="donations-container" id="donaciones">
      <h2>{t('donations.title')}</h2>
      <p>{t('donations.description')}</p>
      
      <div className="interac-section">
        <h3>{t('donations.interac.title')}</h3>
        <form onSubmit={handleSubmit} className="interac-form">
          <div className="form-group">
            <label htmlFor="interacEmail">{t('donations.interac.email')}</label>
            <input
              type="email"
              id="interacEmail"
              value={interacEmail}
              onChange={handleEmailChange}
              placeholder={t('donations.interac.emailPlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="donationAmount">{t('donations.amount')}</label>
            <input
              type="number"
              id="donationAmount"
              value={donationAmount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="instructions">
            <h4>{t('donations.interac.instructions')}</h4>
            <ol>
              {(t('donations.interac.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <div className="church-interac-info">
              <p><strong>Email Interac de l'église:</strong> {CHURCH_INTERAC_EMAIL}</p>
              <p className="note">Note: Un message de sécurité unique sera généré pour chaque don.</p>
            </div>
          </div>

          <button 
            type="submit" 
            className="interac-button"
            disabled={isProcessing}
          >
            {isProcessing ? t('donations.interac.processing') : t('donations.interac.send')}
          </button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{t('donations.success')} {interacEmail}</p>}
        </form>
      </div>
    </div>
  );
}