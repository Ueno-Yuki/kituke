import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>営業時間</h3>
          <p>平日: 10:00 - 19:00</p>
          <p>土日祝: 9:00 - 18:00</p>
          <p>定休日: 水曜日</p>
        </div>
        <div className={styles.footerSection}>
          <h3>アクセス</h3>
          <p>東京都渋谷区〇〇1-2-3</p>
          <p>渋谷駅から徒歩5分</p>
        </div>
        <div className={styles.footerSection}>
          <h3>お問い合わせ</h3>
          <p>電話: 03-XXXX-XXXX</p>
          <p>メール: info@example.com</p>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2024 着付けサロン All rights reserved.
      </div>
    </footer>
  );
} 