'use client';

import { useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceSection from "../components/ServiceSection";
import InstructorSection from "../components/InstructorSection";
import CTASection from "../components/CTASection";
import Modal from "../components/Modal";
import Reservation from "../components/Reservation";
import ContactForm from "../components/ContactForm";
import HeroSlideshow from '../components/HeroSlideshow';

export default function Home() {
  const [modalType, setModalType] = useState<null | 'reservation' | 'contact'>(null);

  const openModal = () => setModalType('reservation');
  const openContactModal = () => setModalType('contact');
  const closeModal = () => setModalType(null);

  const images = [
    '/kimono-hero.jpg',
    // 将来的に追加する画像のパス
    // '/images/hero2.jpg',
    // '/images/hero3.jpg',
  ];

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroSlideshow images={images} interval={5} />

          <div className={styles.heroContent}>
            <h2>大切な日の着付けをお任せください</h2>
            <p>成人式、七五三、結婚式など、特別な日の着付けをプロが丁寧にサポートいたします</p>
            <button onClick={openModal} className={styles.primary}>
              予約する
            </button>
          </div>
        </section>

        <ServiceSection />
        <InstructorSection />
        <CTASection onReserveClick={openModal} onContactClick={openContactModal} />
      </main>
      <Footer />

      {modalType === 'reservation' && (
        <Modal onClose={closeModal}>
          <Reservation onClose={closeModal} />
        </Modal>
      )}
      {modalType === 'contact' && (
        <Modal onClose={closeModal}>
          <ContactForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
} 