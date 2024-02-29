interface Expense {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string; // Date-formatted string, could also use Date type but would require conversion
  category: 'training' | 'travel' | 'meal';
  status: 'draft' | 'submitted' | 'approved' | 'rejected'; // Assuming possible statuses
}
