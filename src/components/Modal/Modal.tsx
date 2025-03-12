import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`${styles.modalBackdrop} ${isOpen && styles.open}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modalContent} ${isOpen && styles.open}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
