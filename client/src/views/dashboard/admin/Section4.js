import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Eye,
  Clock,
  Ban,
  FuelPump,
  AlertCircle,
} from "lucide-react";
import dayjs from "dayjs";
import Section9 from "./section9";
import { FaGasPump } from "react-icons/fa";

const MetricCard = ({ title, value, change, icon: Icon, additionalInfo }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>{title}</span>
        <Icon size={20} style={styles.icon} />
      </div>
      <div style={styles.cardBody}>
        <span style={styles.value}>{value}</span>
        <span
          style={{
            ...styles.change,
            color: change.isIncrease ? "#ff4d4f" : "#52c41a", // Red for increase, green for decrease
          }}
        >
          {change.isIncrease ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {`${Math.abs(change.percentage || 0)}%`}
        </span>
      </div>
      {additionalInfo && (
        <div style={styles.additionalInfo}>{additionalInfo}</div>
      )}
      <div style={styles.cardFooter}>vs Previous ({change.days} days)</div>
    </div>
  );
};

const Section4 = ({
  Voilation,
  fuel,
  vichels = { total: 0 },
  trailer = { total: 0 },
}) => {
  const [seriesData, setSeriesData] = useState([
    Voilation?.payload?.total || 0,
  ]);

  useEffect(() => {
    setSeriesData([Voilation?.payload?.total || 0, fuel?.payload?.total || 0]);
  }, [Voilation]);

  // Get the current date and calculate the start of the week (Monday) for violation data
  const today = dayjs();
  const startOfWeek = today.startOf("week").add(1, "day"); // Monday

  // Extract violations array from the payload and total violations count
  const totalViolations = Voilation?.payload?.total || 0;
  const previousTotalViolations = Voilation?.previousPayload?.total || 0;

  // Filter violations to include only the last 7 days (Monday to Sunday)
  const violations = Voilation?.payload?.violations || [];
  const weeklyViolations = violations.filter((violation) =>
    dayjs(violation.createdAt).isBetween(startOfWeek, today, null, "[]")
  );

  // Calculate the percentage change between current and previous weeks using total violations
  const calculateChange = (current, previous) => {
    if (previous === 0) {
      return { percentage: 100, isIncrease: true }; // Edge case: No violations last week
    }
    const percentage = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(percentage.toFixed(2)),
      isIncrease: current > previous,
    };
  };

  const violationChange = calculateChange(
    totalViolations,
    previousTotalViolations
  );

  // Find the most repeated violation type in the past 7 days
  const violationTypesCount = weeklyViolations.reduce((acc, violation) => {
    const type = violation.voilationtype;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const mostRepeatedViolation = Object.keys(violationTypesCount).reduce(
    (a, b) => (violationTypesCount[a] > violationTypesCount[b] ? a : b),
    "None"
  );
  // Count drivers involved in the last 7 days
  const driversInvolved = new Set(weeklyViolations.map((v) => v.driverId)).size;

  // Calculate the current period's fuel usage details Fuel Data
  const fuelEntries = fuel?.payload?.fuels || [];
  const totalFuelQuantity =
    fuelEntries.reduce((total, entry) => total + entry.fuelQuantity, 0) || 0;

  const previousFuelEntries = fuel?.previousPayload?.fuels || [];
  const previousFuelQuantity =
    previousFuelEntries.reduce(
      (total, entry) => total + entry.fuelQuantity,
      0
    ) || 0;

  const daysBetween =
    fuelEntries.length > 0
      ? dayjs(fuelEntries[fuelEntries.length - 1].date).diff(
          dayjs(fuelEntries[0].date),
          "day"
        ) + 1
      : 1;

  const fuelChange = calculateChange(totalFuelQuantity, previousFuelQuantity);

  const metrics = [
    {
      title: "Violations",
      value: totalViolations || 0,
      change: violationChange,
      icon: AlertCircle,
      additionalInfo: `Repeated: ${mostRepeatedViolation} (${driversInvolved} drivers)`,
    },
    {
      title: "Fuel Consumed",
      value: ` ${totalFuelQuantity}L `,
      change: {
        percentage: fuelChange.percentage,
        isIncrease: fuelChange.isIncrease,
        days: daysBetween,
      },
      icon: FaGasPump,
    },
    { title: "Avg. Duration", value: "46s", change: "22%", icon: Clock },
    { title: "Bounce Rate", value: "46%", change: "-30%", icon: Ban },
  ];

  return (
    <div style={styles.container}>
      {metrics.map((metric, index) =>
        React.isValidElement(metric) ? (
          metric
        ) : (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            additionalInfo={metric.additionalInfo}
          />
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  card: {
    flex: "1 1 calc(50% - 10px)",
    minWidth: "200px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    height: "180px",
    borderLeft :"3px solid #8b5cf6"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#8c8c8c",
  },
  icon: {
    color: "#1890ff",
  },
  cardBody: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  },
  value: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  change: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  additionalInfo: {
    fontSize: "12px",
    color: "#8c8c8c",
    marginTop: "10px",
  },
  cardFooter: {
    fontSize: "12px",
    color: "#8c8c8c",
    marginTop: "10px",
  },
};

export default Section4;
