export type Books = {
    id: string;
    name: string;
    date_added: string; 
    category: string;
    status: 'Available' | 'Not available';
    quantity: number;
}

export type BookForm = {
    id: string;
    name: string;
    category: string;
    quantity: number;
}

export type Customers = {
    id: string;
    name: string;
    email: string;
    address: string;
    contact: string;
}

export type Transactions = {
    id: string;
    book_name: string;
    book_id: string;
    book_category: string;
    date_borrowed: string;
    date_returned: string;
}

export type TransactionCardProps = {
    id: string
    name: string;
    email?: string;
    bookName: string;
    bookCategory: string;
    dateBorrowed: string;
    dateReturned: string;
}

export type ConfirmationModalProps = {
    isModalOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
    title: string;
    message: string;
}