import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FinancialInsightsProps {
  setShowRightSidebar: (show: boolean) => void;
  isMobile: boolean;
}

export default function FinancialInsights({
  setShowRightSidebar,
  isMobile,
}: FinancialInsightsProps) {
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.aside
      initial="closed"
      animate="open"
      exit="closed"
      variants={sidebarVariants}
      className={`${
        isMobile ? "fixed inset-y-0 right-0 z-50" : "relative"
      } w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Financial Insights</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRightSidebar(false)}
        >
          <X size={20} />
        </Button>
      </div>
      <div className="space-y-4">
        <TotalBalance />
        <RecentTransactions />
        <FinancialTip />
      </div>
    </motion.aside>
  );
}

const TotalBalance = () => (
  <div className="bg-[#F5F5F5] p-4 rounded-lg">
    <h4 className="font-semibold mb-2">Total Balance</h4>
    <p className="text-sm text-gray-500">As of today</p>
    <p className="text-2xl font-bold text-[#002F62]">$1,221.33</p>
  </div>
);

const RecentTransactions = () => (
  <div>
    <h4 className="font-semibold mb-2">Recent Transactions</h4>
    <ul className="space-y-2">
      <TransactionItem description="Grocery Store" amount={-85.43} />
      <TransactionItem description="Salary Deposit" amount={3500.0} />
      <TransactionItem description="Electric Bill" amount={-124.76} />
    </ul>
  </div>
);

interface TransactionItemProps {
  description: string;
  amount: number;
}

const TransactionItem = ({ description, amount }: TransactionItemProps) => (
  <li className="flex justify-between items-center">
    <span>{description}</span>
    <span className={amount > 0 ? "text-green-500" : "text-red-500"}>
      {amount > 0 ? "+" : "-"}${Math.abs(amount).toFixed(2)}
    </span>
  </li>
);

const FinancialTip = () => (
  <div>
    <h4 className="font-semibold mb-2">Financial Tip</h4>
    <p className="text-sm">
      Consider setting up automatic transfers to your savings account to build
      your emergency fund.
    </p>
  </div>
);
