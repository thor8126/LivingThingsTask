import React from "react";
import { motion } from "framer-motion";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Loader2 } from "lucide-react";

export const AccessLogForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = React.useState({
    accessTime: "",
    accessDate: "",
    employeeName: "",
    algoStatus: "0",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const algoStatusOptions = [
    { value: "0", label: "Energy Saving Mode OFF" },
    { value: "1", label: "Energy Saving Mode ON" },
  ];

  return (
    <Card title="Access Log Form">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="time"
            label="Access Time"
            value={formData.accessTime}
            onChange={(e) =>
              setFormData({ ...formData, accessTime: e.target.value })
            }
            required
          />
          <Input
            type="date"
            label="Access Date"
            value={formData.accessDate}
            onChange={(e) =>
              setFormData({ ...formData, accessDate: e.target.value })
            }
            required
          />
          <Input
            type="text"
            label="Employee Name"
            value={formData.employeeName}
            onChange={(e) =>
              setFormData({ ...formData, employeeName: e.target.value })
            }
            required
          />
          <Select
            label="Algorithm Status"
            options={algoStatusOptions}
            value={formData.algoStatus}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                algoStatus: e.target.value,
              }));
            }}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          Submit
        </Button>
      </form>
    </Card>
  );
};
