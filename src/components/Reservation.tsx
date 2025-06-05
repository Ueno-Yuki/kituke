'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Reservation.module.css';
import React from 'react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  service: string;
  notes: string;
}

interface ReservationProps {
  onClose: () => void;
}

export default function Reservation({ onClose }: ReservationProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    service: '',
    notes: '',
  });

  // 利用可能な時間枠
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '10:00', available: true },
    { id: '2', time: '11:00', available: true },
    { id: '3', time: '12:00', available: false },
    { id: '4', time: '13:00', available: true },
    { id: '5', time: '14:00', available: true },
    { id: '6', time: '15:00', available: true },
    { id: '7', time: '16:00', available: true },
    { id: '8', time: '17:00', available: true },
  ];

  // サービス一覧
  const services = [
    { id: '1', name: '成人式の着付け', price: '¥15,000〜' },
    { id: '2', name: '七五三の着付け', price: '¥10,000〜' },
    { id: '3', name: '結婚式の着付け', price: '¥25,000〜' },
  ];

  // 選択できない日付を判定する関数
  const isDateDisabled = (date: Date) => {
    // 過去の日付を選択不可に
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return false;
    }

    // 水曜日（定休日）を選択不可に
    if (date.getDay() === 3) { // 3 = 水曜日
      return false;
    }

    // 年末年始の休業日を判定
    const month = date.getMonth();
    const day = date.getDate();
    
    // 12月30日、31日
    if (month === 11 && (day === 30 || day === 31)) {
      return false;
    }
    
    // 1月1日、2日、3日
    if (month === 0 && (day === 1 || day === 2 || day === 3)) {
      return false;
    }

    return true;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setFormData({ ...formData, date: format(date, 'yyyy-MM-dd') });
    }
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setFormData({ ...formData, timeSlot });
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormData({ ...formData, service });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('予約が完了しました。確認メールをお送りします。');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          timeSlot: '',
          service: '',
          notes: '',
        });
        onClose();
      } else {
        alert('予約に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('予約エラー:', error);
      alert('予約処理中にエラーが発生しました。');
    }
  };

  // 必須項目の入力チェック
  const isFormValid = () => {
    return (
      selectedService &&
      selectedDate &&
      selectedTimeSlot &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };

  return (
    <div className={styles.container}>
      <h1>着付けのご予約</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>1. サービスを選択</h2>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <div
                key={service.id}
                className={`${styles.serviceCard} ${
                  selectedService === service.name ? styles.selected : ''
                }`}
                onClick={() => handleServiceSelect(service.name)}
              >
                <h3>{service.name}</h3>
                <p>{service.price}</p>
              </div>
            ))}
          </div>
          {!selectedService && (
            <div className={`${styles.requiredMessage} ${styles.show}`}>
              サービスを選択してください
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2>2. 日付を選択</h2>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={addDays(new Date(), 90)}
              filterDate={isDateDisabled}
              dateFormat="yyyy年MM月dd日"
              locale={ja}
              placeholderText="日付を選択してください"
              className={styles.dateInput}
              required
              customInput={
                <input
                  className={styles.dateInput}
                  readOnly
                  placeholder="日付を選択してください"
                />
              }
            />
          </div>
          <p className={styles.dateNote}>
            ※水曜日は定休日です。<br/>年末年始（12/30-1/3）は休業となります。
          </p>
          {!selectedDate && (
            <div className={`${styles.requiredMessage} ${styles.show}`}>
              日付を選択してください
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2>3. 時間を選択</h2>
          <div className={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                className={`${styles.timeSlot} ${
                  selectedTimeSlot === slot.time ? styles.selected : ''
                } ${!slot.available ? styles.unavailable : ''}`}
                onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {!selectedTimeSlot && (
            <div className={`${styles.requiredMessage} ${styles.show}`}>
              時間を選択してください
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2>4. お客様情報</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.required}>お名前</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {!formData.name.trim() && (
              <div className={`${styles.requiredMessage} ${styles.show}`}>
                お名前を入力してください
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.required}>メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {!formData.email.trim() && (
              <div className={`${styles.requiredMessage} ${styles.show}`}>
                メールアドレスを入力してください
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.required}>電話番号</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            {!formData.phone.trim() && (
              <div className={`${styles.requiredMessage} ${styles.show}`}>
                電話番号を入力してください
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="notes">ご要望・ご質問</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={!isFormValid()}
        >
          予約を確定する
        </button>
      </form>
    </div>
  );
}