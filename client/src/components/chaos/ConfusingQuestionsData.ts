export interface ConfusingQuestion {
  id: string;
  question: string;
  context: string;
  yesLabel: string; // Will be displayed in RED
  noLabel: string;  // Will be displayed in GREEN
  yesExplanation: string;
  noExplanation: string;
}

export const CONFUSING_QUESTIONS: ConfusingQuestion[] = [
  {
    id: 'q1',
    question: 'Are you sure you do not want to not cancel this non-action?',
    context: 'Standard double-negative verification protocol.',
    yesLabel: 'YES, DO NOT CANCEL',
    noLabel: 'NO, PROCEED TO CANCEL',
    yesExplanation: 'By selecting RED (Yes), you have affirmed that you do not want to not cancel, meaning you intend to cancel... or do you?',
    noExplanation: 'By selecting GREEN (No), you declined the non-cancellation of the cancellation. Reality has been paused.',
  },
  {
    id: 'q2',
    question: 'Would you rather continue not leaving this page or cease staying here?',
    context: 'Navigational dilemma assessment.',
    yesLabel: 'YES, CEASE NOT STAYING',
    noLabel: 'NO, STAY NOT LEAVING',
    yesExplanation: 'You clicked RED to cease not staying. That translates to staying, unless not leaving was already ceased.',
    noExplanation: 'You clicked GREEN to stay not leaving. Enjoy your indefinite residence.',
  },
  {
    id: 'q3',
    question: 'Do you agree to disagree with our total refusal to deny your acceptance?',
    context: 'Terms of Misunderstanding §4.12',
    yesLabel: 'YES, I AGREE TO DISAGREE',
    noLabel: 'NO, I REFUSE TO DENY',
    yesExplanation: 'Agreement in RED recorded. Disagreement filed under category: mutually contradictory.',
    noExplanation: 'GREEN refusal logged. Our refusal to deny your acceptance remains undefeated.',
  },
  {
    id: 'q4',
    question: 'Confirm that this sentence is false.',
    context: 'Epimenides paradox verification.',
    yesLabel: 'YES, IT IS FALSE',
    noLabel: 'NO, IT IS NOT FALSE',
    yesExplanation: 'If it is false, then by calling it false in RED you made it true, which makes it false.',
    noExplanation: 'If it is not false, then it is true, which contradicts its claim of falsity. The green button shakes its head.',
  },
  {
    id: 'q5',
    question: 'Did you intentionally press this button to verify that you shouldn\'t have pressed it?',
    context: 'Impulsive behavior diagnostics.',
    yesLabel: 'YES, I REGRET NOTHING',
    noLabel: 'NO, IT WAS A GLITCH',
    yesExplanation: 'RED confirms deliberate poor judgment. We respect your unyielding dedication.',
    noExplanation: 'GREEN blame shifting detected. The browser accepts your excuse with deep skepticism.',
  },
  {
    id: 'q6',
    question: 'Would you prefer to not pay ₹0.00 for 10,000 zero-value tokens?',
    context: 'Fictional economics evaluation.',
    yesLabel: 'YES, TAKE MY NON-MONEY',
    noLabel: 'NO, KEEP MY FAKE WEALTH',
    yesExplanation: 'RED confirmed. Non-money transferred to the fictional ether.',
    noExplanation: 'GREEN logged. Your imaginary net worth remains securely fictitious.',
  },
];
