import React, {useState, useEffect} from 'react';

const ExpensesComponent: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const expenseFieldNames: string[] = [
    'date',
    'merchant',
    'amount',
    'category',
    'description',
    'status',
  ];

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function formatDate(dateString: string) {
    const options = {month: 'short', day: '2-digit'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch('https://expenses-backend-mu.vercel.app/expenses', {
      headers: {
        'Content-Type': 'application/json',
        Username: 'omar.abbas',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedData = data.map((expense: Expense) => ({
          ...expense,
          date: formatDate(expense.date),
        }));
        setExpenses(formattedData);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <div className="expenses-container">
          <div style={{borderBottom: '1px solid black'}}>
            {' '}
            <span className="expenses-title">Expenses</span>{' '}
          </div>
          <ul className="expense-list">
            <li style={{paddingBottom: '10px', fontWeight: 'bold'}}>
              {expenseFieldNames.map(fieldName => (
                <span key={fieldName} className="expense-item">
                  {capitalize(fieldName)}
                </span>
              ))}
            </li>

            {expenses.map(expense => (
              <li key={expense.id}>
                {expenseFieldNames.map(fieldName => (
                  <span key={fieldName} className="expense-item">
                    {fieldName === 'amount'
                      ? `£${expense[fieldName as keyof Expense]}`
                      : expense[fieldName as keyof Expense]}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpensesComponent;
