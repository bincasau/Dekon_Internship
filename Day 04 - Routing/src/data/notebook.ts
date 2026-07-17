export type NotebookNote = {
  id: string;
  title: string;
  topic: string;
  favorite: boolean;
  content: string;
};

export const notebookNotes: NotebookNote[] = [
  { id: "blockchain-basics", title: "Blockchain cơ bản", topic: "Blockchain", favorite: true, content: "Blockchain là một sổ cái phân tán, lưu dữ liệu theo từng khối được liên kết bằng mật mã." },
  { id: "solidity-functions", title: "Hàm trong Solidity", topic: "Solidity", favorite: false, content: "Function trong Solidity có thể khai báo visibility, state mutability và giá trị trả về." },
  { id: "web3-wallet", title: "Kết nối ví Web3", topic: "DApp", favorite: true, content: "Ví Web3 giúp người dùng ký giao dịch và tương tác với ứng dụng phi tập trung." },
];
