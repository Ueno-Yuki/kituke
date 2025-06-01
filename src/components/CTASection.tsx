'use client';

// useState, Modal, Reservation のインポートは不要になるため削除
// import { useState } from 'react';
import styles from '../styles/CTASection.module.css';
// import Modal from './Modal';
// import Reservation from './Reservation';

interface CTASectionProps {
  onReserveClick: () => void; // 親から渡されるクリックハンドラ
}

// CTASection コンポーネントが props を受け取るように変更
export default function CTASection({ onReserveClick }: CTASectionProps) {
  // useState, openModal, closeModal は削除
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.cta}>
      <h2>ご予約・お問い合わせ</h2>
      <p>着付けのご予約やご質問は、お気軽にお問い合わせください</p>
      <div className={styles.ctaButtons}>
        {/* onClick ハンドラを親から渡される onReserveClick に変更 */}
        <button onClick={onReserveClick} className={styles.primary}>
          予約する
        </button>
        <a href="/contact" className={styles.secondary}>
          お問い合わせ
        </a>
      </div>

      {/* モーダルのレンダリング部分は削除 */}
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}> */}
      {/*   <Reservation onClose={closeModal} /> */}
      {/* </Modal> */}
    </section>
  );
} 