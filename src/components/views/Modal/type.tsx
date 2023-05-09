export interface IModal {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
}
