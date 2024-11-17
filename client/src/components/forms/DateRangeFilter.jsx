import React from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export const DateRangeFilter = ({ onFilter, loading }) => {
  const [dateRange, setDateRange] = React.useState({
    startDate: "",
    endDate: "",
  });

  const handleFilter = () => {
    onFilter(dateRange);
  };

  return (
    <Card title="Date Range Filter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="date"
          label="Start Date"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
        />
        <Input
          type="date"
          label="End Date"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
        />
        <div className="flex items-end">
          <Button onClick={handleFilter} disabled={loading}>
            Apply Filter
          </Button>
        </div>
      </div>
    </Card>
  );
};
