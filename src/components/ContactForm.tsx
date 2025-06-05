import React, { useState } from 'react';
import styles from '../styles/Reservation.module.css';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // バリデーション: 氏名・お問い合わせ内容必須、電話番号またはメールアドレスのいずれか必須
  const isFormValid = () => {
    return (
      form.name.trim() !== '' &&
      form.message.trim() !== '' &&
      (form.phone.trim() !== '' || form.email.trim() !== '')
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでAPI送信などを実装できます
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className={styles.container}>
      <h1>お問い合わせ</h1>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>送信が完了しました。</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.required}>お名前</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">電話番号 <span style={{color:'#ff4d4f'}}>(メールアドレスとどちらか必須)</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="090-1234-5678"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">メールアドレス <span style={{color:'#ff4d4f'}}>(電話番号とどちらか必須)</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.required}>お問い合わせ内容</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="ご質問やご要望などご記入ください"
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton} disabled={!isFormValid()}>送信する</button>
        </form>
      )}
    </div>
  );
} 